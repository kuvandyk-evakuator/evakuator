exports.handler = async function(event) {
  var BOT_TOKEN = process.env.BOT_TOKEN;
  var CHAT_ID = process.env.CHAT_ID;
  var orderId = event.queryStringParameters.orderId;
  await fetch('https://api.telegram.org/bot'+BOT_TOKEN+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:CHAT_ID,text:'❌ *Клиент отказался от заказа #'+orderId+'*',parse_mode:'Markdown'})});
  return {statusCode:200,body:'ok'};
};