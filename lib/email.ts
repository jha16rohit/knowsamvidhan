type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

const RESEND_TEST_RECIPIENT_ERROR =
  "You can only send testing emails to your own email address";

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "KnowSamvidhan <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Email skipped for ${to}: ${subject}`);
      return;
    }

    throw new Error("RESEND_API_KEY is not defined");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    const details = await response.text();

    if (
      process.env.NODE_ENV !== "production" &&
      details.includes(RESEND_TEST_RECIPIENT_ERROR)
    ) {
      console.warn(
        `Email skipped for ${to}: Resend test mode only allows sending to the account owner.`
      );
      return;
    }

    throw new Error(`Email delivery failed: ${details}`);
  }
}
