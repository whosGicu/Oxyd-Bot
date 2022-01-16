  const db = require('quick.db')
module.exports = {
    name: "prefix",
   aliases: ["setprefix"],
    category: "config",
   timeout: 3000,
   description: "Change the bot prefix on your server.",
   usage:"o?prefix <newprefix>",
    
    run: async (client, message, args) => {
       if(!message.member.hasPermission("ADMINISTRATOR")) {
         return message.channel.send('<a:reject:729686557434314864> | You need administrator to use this command');
       }
  if(!args[0]) {
return message.channel.send("<a:loading:729757246116069476> | Give me an argument.")
  }
   if(args[1]) {
return message.channel.send("<a:reject:729686557434314864> | One argument only.");
   }
   if(args[0].length > 3)  {
     return message.channel.send("<a:reject:729686557434314864> | 3 characters only.");
   }
       if(args.join("") === "o?") {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("<a:succes:729686524437856287> | Prefix resetted")
        
    }
    db.set(`prefix_${message.guild.id}`, args[0])
   message.channel.send(`<a:succes:729686524437856287> | The new prefix is: \`${args[0]}\`.`)
    }
}
