import { recordSecurityAudit } from "./security-engine";

type AttemptData = {
  count: number;
  firstAttempt: number;
  blocked?: boolean;
};

type RequestLog = {
  count: number;
  firstRequest: number;
  endpoints: Set<string>;
};

const attempts = new Map<string, AttemptData>();
const apiRequests = new Map<string, RequestLog>();
const ddosDetection = new Map<string, { count: number; timestamp: number }>();

const BOT_USER_AGENTS = [
  /bot/i, /crawler/i, /spider/i, /headless/i, /curl/i, /wget/i,
  /python/i, /httpclient/i, /scrapy/i, /requests/i, /urllib/i,
  /aiohttp/i, /httpx/i, /node-fetch/i, /axios/i, /fetch/i,
  /chrome-headless/i, /firefox-headless/i, /phantomjs/i, /selenium/i,
  /puppeteer/i, /playwright/i, /(apache|httpclient|http-kit)/i,
  /^(python|go|ruby|java|php|node)\//i, /postman/i, /insomnia/i,
  /googlebot/i, /bingbot/i, /yandex/i, /duckduckbot/i, /slurp/i,
  /facebookbot/i, /twitterbot/i, /linkedinbot/i, /discordbot/i,
  /semrush/i, /ahrefs/i, /mj12bot/i, /dotbot/i, /screaming frog/i,
];

const parseIp = (value?: string | null) =>
  (value || "unknown").split(",")[0]?.trim() || "unknown";

export const isBotUserAgent = (userAgent: string): boolean => {
  return BOT_USER_AGENTS.some((pattern) => pattern.test(userAgent));
};

export const analyzeBotRequest = (userAgent: string, headers: Headers): {
  isBot: boolean;
  severity: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
} => {
  const reasons: string[] = [];
  let severity: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  const isBrowser = /Mozilla|Chrome|Firefox|Safari|Edge|Opera/i.test(userAgent);
  const isKnownBot = isBotUserAgent(userAgent);

  if (isKnownBot && !isBrowser) {
    reasons.push("Known bot user-agent detected");
    severity = "MEDIUM";
  }

  if (isKnownBot && isBrowser) {
    reasons.push("Bot-like browser detected");
    severity = "LOW";
  }

  if (userAgent.length > 0 && userAgent.length < 15) {
    reasons.push("Suspiciously short user-agent");
    severity = severity === "LOW" ? "MEDIUM" : severity;
  }

  if (!isBrowser && userAgent.length > 0 && !isKnownBot) {
    reasons.push("Non-browser user-agent");
    severity = "MEDIUM";
  }

  const accept = headers.get("accept") || "";
  const acceptLang = headers.get("accept-language") || "";
  const acceptEnc = headers.get("accept-encoding") || "";
  const hasAnyHeaders = accept.length > 0 || acceptLang.length > 0 || acceptEnc.length > 0;

  if (!hasAnyHeaders && userAgent.length > 0) {
    reasons.push("Missing common HTTP headers");
    severity = "HIGH";
  }

  const isHighSeverityBot = /curl|wget|python|scrapy|requests|urllib|httpx|axios|postman/i.test(userAgent);
  if (isHighSeverityBot) {
    severity = "HIGH";
    if (!reasons.includes("Known bot user-agent detected")) {
      reasons.push("Automated tool detected");
    }
  }

  const isBlockedBot = isHighSeverityBot && !isBrowser;
  return { 
    isBot: isBlockedBot || reasons.some(r => r.includes("Automated")), 
    severity: isBlockedBot ? "HIGH" : severity, 
    reasons 
  };
};

export const ddosProtection = ({
  ipAddress,
  path,
}: {
  ipAddress: string;
  path: string;
}): {
  allowed: boolean;
  reason?: string;
  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
} => {
  const now = Date.now();

  const perSecond = ddosDetection.get(ipAddress) || { count: 0, timestamp: now };
  
  if (now - perSecond.timestamp > 1000) {
    perSecond.count = 0;
    perSecond.timestamp = now;
  }
  
  perSecond.count += 1;
  ddosDetection.set(ipAddress, perSecond);

  if (perSecond.count > 100) {
    return { 
      allowed: false, 
      reason: "DDoS attack detected - too many requests per second",
      severity: "CRITICAL"
    };
  }

  const existing = apiRequests.get(ipAddress);
  
  if (!existing) {
    apiRequests.set(ipAddress, {
      count: 1,
      firstRequest: now,
      endpoints: new Set([path]),
    });
    return { allowed: true };
  }

  if (now - existing.firstRequest > 60000) {
    apiRequests.set(ipAddress, {
      count: 1,
      firstRequest: now,
      endpoints: new Set([path]),
    });
    return { allowed: true };
  }

  existing.count += 1;
  existing.endpoints.add(path);

  if (existing.count > 200) {
    return {
      allowed: false,
      reason: "Rate limit exceeded - too many requests per minute",
      severity: "HIGH"
    };
  }

  if (existing.endpoints.size > 50) {
    return {
      allowed: false,
      reason: "Suspicious traffic pattern - too many different endpoints",
      severity: "MEDIUM"
    };
  }

  return { allowed: true };
};

export const rateLimit = ({
  key,
  limit = 5,
  windowMs = 15 * 60 * 1000,
}: {
  key: string;
  limit?: number;
  windowMs?: number;
}) => {
  const now = Date.now();

  const existing = attempts.get(key);

  if (!existing) {
    attempts.set(key, {
      count: 1,
      firstAttempt: now,
    });

    return {
      success: true,
      remaining: limit - 1,
    };
  }

  if (now - existing.firstAttempt > windowMs) {
    attempts.set(key, {
      count: 1,
      firstAttempt: now,
    });

    return {
      success: true,
      remaining: limit - 1,
    };
  }

  existing.count += 1;

  attempts.set(key, existing);

  if (existing.count > limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  return {
    success: true,
    remaining: limit - existing.count,
  };
};

export const createApiRateLimit = (options: {
  limit?: number;
  windowMs?: number;
} = {}) => {
  const limit = options.limit || 100;
  const windowMs = options.windowMs || 60000;

  return async (request: Request): Promise<{
    allowed: boolean;
    error?: string;
  }> => {
    const ipAddress = parseIp(request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip"));

    const url = new URL(request.url);
    const ddosCheck = ddosProtection({ ipAddress, path: url.pathname });

    if (!ddosCheck.allowed) {
      await recordSecurityAudit({
        action: "DDOS_BLOCKED",
        description: ddosCheck.reason || "DDoS protection triggered",
        severity: ddosCheck.severity || "HIGH",
        entityType: "Security",
        entityId: ipAddress,
        entityLabel: "DDOS",
        ipAddress,
        userAgent: request.headers.get("user-agent") || "unknown",
        metadata: { path: url.pathname },
      });

      return {
        allowed: false,
        error: ddosCheck.reason,
      };
    }

    const limiter = rateLimit({
      key: `api:${ipAddress}`,
      limit,
      windowMs,
    });

    if (!limiter.success) {
      await recordSecurityAudit({
        action: "RATE_LIMIT_EXCEEDED",
        description: `API rate limit exceeded for ${ipAddress}`,
        severity: "MEDIUM",
        entityType: "Security",
        entityId: ipAddress,
        entityLabel: "RATE_LIMIT",
        ipAddress,
        userAgent: request.headers.get("user-agent") || "unknown",
        metadata: { path: url.pathname },
      });

      return {
        allowed: false,
        error: "Too many requests",
      };
    }

    return { allowed: true };
  };
};