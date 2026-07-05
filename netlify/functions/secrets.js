exports.handler = async function(event, context) {
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
