exports.handler = async function(event, context) {
  // Проверяем, что запрос пришёл с нашего сайта
  const referer = event.headers.referer || event.headers.origin || '';
  if (!referer.includes('kuvandyk-evakuator.netlify.app') && !referer.includes('localhost')) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Access denied' })
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      BOT_TOKEN: process.env.BOT_TOKEN,
      CHAT_ID: process.env.CHAT_ID,
      MY_PHONE: process.env.MY_PHONE,
      DADATA_KEY: process.env.DADATA_KEY
    })
  };
};
