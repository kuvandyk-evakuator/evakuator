exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  
  var data = JSON.parse(event.body);
  var BOT_TOKEN = process.env.BOT_TOKEN;
  var CHAT_ID = process.env.CHAT_ID;
  
  var msg = '🚛 *НОВЫЙ ЗАКАЗ #'+data.orderId+'*\n\n👤 *Клиент:* '+data.formData.name+'\n📞 *Телефон:* '+data.formData.phone+'\n🚨 *Ситуация:* '+data.formData.situation+'\n📍 *Перевозка:* '+data.formData.transportType+'\n🚗 *Тип ТС:* '+data.formData.vehicleType+'\n🚙 *Положение:* '+data.formData.position+'\n🔧 *Неисправность:* '+data.formData.damage+'\n📍 *Откуда:* '+data.formData.addressFrom+'\n📌 *Куда:* '+data.formData.addressTo+'\n🗺️ *Расстояние:* '+data.formData.distance+' км\n\n💰 *ИТОГО: '+data.priceData.totalPrice+'₽*';
  
  var ik = {inline_keyboard:[[{text:'✅ Подтвердить заказ',callback_data:'confirm_'+data.orderId},{text:'💸 Изменить сумму',callback_data:'editprice_'+data.orderId}],[{text:'❌ Отменить заказ',callback_data:'cancel_'+data.orderId}]]};
  
  var r = await fetch('https://api.telegram.org/bot'+BOT_TOKEN+'/sendMessage',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chat_id:CHAT_ID,text:msg,parse_mode:'Markdown',reply_markup:ik})
  });
  var d = await r.json();
  
  return {statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify({ok:d.ok,messageId:d.result?d.result.message_id:null})};
};
