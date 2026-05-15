export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: "Signup webhook not configured" });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      timestamp: new Date().toISOString(),
      source: "SmartFix early-access",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(502).json({ error: `Webhook error: ${text.slice(0, 200)}` });
  }

  return res.status(200).json({ success: true });
}
