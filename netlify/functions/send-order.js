exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const data = JSON.parse(event.body);
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return { statusCode: 500, headers, body: JSON.stringify({ ok: false, description: 'Server env vars missing' }) };
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

    return { statusCode: 200, headers, body: JSON.stringify(tgData) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, description: err.message }) };
  }
};
