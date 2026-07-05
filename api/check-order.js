export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ ok: false, description: 'Server env vars missing' });
    }

    const body = {
      chat_id: CHAT_ID,
      text: data.text,
      parse_mode: data.parse_mode || 'Markdown'
    };
    if (data.reply_markup) body.reply_markup = data.reply_markup;

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const tgData = await tgResponse.json();

    return res.status(200).json(tgData);
  } catch (err) {
    return res.status(500).json({ ok: false, description: err.message });
  }
}
