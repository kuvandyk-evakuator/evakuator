exports.handler = async function(event) {
  var BOT_TOKEN = process.env.BOT_TOKEN;
  var messageId = parseInt(event.queryStringParameters.messageId);
  var r = await fetch('https://api.telegram.org/bot'+BOT_TOKEN+'/getUpdates?offset=-1&timeout=2');
  var d = await r.json();
  var status = 'pending';
  if(d.ok&&d.result&&d.result.length>0) {
    var lu = d.result[d.result.length-1];
    if(lu.callback_query&&lu.callback_query.message.message_id===messageId) {
      var cb = lu.callback_query;
      if(cb.data.startsWith('confirm_')) status = 'confirmed';
      else if(cb.data.startsWith('cancel_')) status = 'cancelled';
      await fetch('https://api.telegram.org/bot'+BOT_TOKEN+'/answerCallbackQuery',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({callback_query_id:cb.id,text:status==='confirmed'?'✅ Подтверждён!':'❌ Отменён'})});
    }
  }
  return {statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify({status:status})};
};