import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------
   FUTURE PRODUCTION CONFIG (COMMENTED OUT)

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

const MODELS = {
  classifier: "claude-haiku-4-5-20251001",
  responder: "claude-sonnet-4-20250514",
} as const;

------------------------------------------------------------------- */

export const runtime = "edge";

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ApiMessage[];
}

const LIMITS = {
  maxMessageLength: 2000,
  maxMessages: 40,
} as const;

function validateRequest(body: unknown): {
  ok: true;
  data: RequestBody;
} | {
  ok: false;
  status: number;
  error: string;
} {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      status: 400,
      error: "Invalid request body.",
    };
  }

  const { messages } = body as Record<string, unknown>;

  if (!Array.isArray(messages)) {
    return {
      ok: false,
      status: 400,
      error: "messages must be an array.",
    };
  }

  if (messages.length === 0) {
    return {
      ok: false,
      status: 400,
      error: "messages array is empty.",
    };
  }

  for (const msg of messages) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !["user", "assistant"].includes(
        (msg as ApiMessage).role
      ) ||
      typeof (msg as ApiMessage).content !== "string"
    ) {
      return {
        ok: false,
        status: 400,
        error: "Invalid message format.",
      };
    }
  }

  const lastMessage =
    messages[messages.length - 1] as ApiMessage;

  if (lastMessage.role !== "user") {
    return {
      ok: false,
      status: 400,
      error: "Last message must be from user.",
    };
  }

  const content = lastMessage.content.trim();

  if (!content) {
    return {
      ok: false,
      status: 400,
      error: "Message cannot be empty.",
    };
  }

  if (content.length > LIMITS.maxMessageLength) {
    return {
      ok: false,
      status: 400,
      error: `Message exceeds ${LIMITS.maxMessageLength} characters.`,
    };
  }

  return {
    ok: true,
    data: {
      messages: messages as ApiMessage[],
    },
  };
}

function sanitizeMessages(
  messages: ApiMessage[]
): ApiMessage[] {
  const cleaned = messages.map((message) => ({
    role: message.role,
    content: message.content
      .trim()
      .slice(0, LIMITS.maxMessageLength),
  }));

  return cleaned.slice(-LIMITS.maxMessages);
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body.",
      },
      {
        status: 400,
      }
    );
  }

  const validation = validateRequest(body);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: validation.error,
      },
      {
        status: validation.status,
      }
    );
  }

  const messages = sanitizeMessages(
    validation.data.messages
  );

  const latestUserMessage =
    messages[messages.length - 1]?.content ?? "";

  return NextResponse.json({
    success: true,
    provider: "puter",
    demoMode: true,
    message:
      "Frontend should send this prompt directly to Puter AI.",
    prompt: latestUserMessage,
  });
}

/* ------------------------------------------------------------------
   FUTURE PRODUCTION IMPLEMENTATION

async function anthropicProvider(messages: ApiMessage[]) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const response = await fetch(
    ANTHROPIC_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey!,
        "anthropic-version":
          ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODELS.responder,
        max_tokens: 1500,
        messages,
      }),
    }
  );

  return response.json();
}

------------------------------------------------------------------- */