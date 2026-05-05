type AttemptData = {
  count: number;
  firstAttempt: number;
};

const attempts = new Map<string, AttemptData>();

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