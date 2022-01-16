  const db = require('quick.db')
module.exports = {
    name: "setlogs",
      aliases: ["setmsglogchannel"],
      category: "config",
     timeout: 3000,
    description: "This is where the logs will be shown.",
    usage:"o?setlogs <logchannel>",
    run: async (client, message, args) => {
    
    let permission = message.member.hasPermission("ADMINISTRATOR");

if(!permission) {
return message.channel.send("<a:reject:729686557434314864> | You need administrator to use this command!")
}
let cArgs = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
         let logs = db.get(`msglog_${message.guild.id}`)

  if(logs && !args[0]) {
      db.delete(`msglog_${message.guild.id}`)
     return await message.channel.send("<a:succes:729686524437856287> | Logs channel has been resetted.")
                                       
                                       
    }
 if(!cArgs) {
return message.channel.send("<a:reject:729686557434314864>  | That channel doesn't exist or I don't have permission to view it.")
 }
 db.set(`msglog_${message.guild.id}`, cArgs.id)
 
 message.channel.send(`<a:succes:729686524437856287> | From now the logs will appear on ${cArgs}.`);  
 
    }
}
