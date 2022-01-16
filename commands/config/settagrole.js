  const db = require('quick.db')
module.exports = {
    name: "settagrole",
    category: "config",
    timeout: 2500,
    description: "Set server's tag role.",
   usage:"o?settagrole <role>",
    run: async (client, message, args) => {
    
    let permission = message.member.hasPermission("ADMINISTRATOR");

if(!permission) {
return message.channel.send("<a:reject:729686557434314864> | You need administrator permission to use this command!")
}
let roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
         let role = db.get(`tagrole_${message.guild.id}`)

  if(role && !args[0]) {
      db.delete(`tagrole_${message.guild.id}`)
     return await message.channel.send("<a:succes:729686524437856287> | The tag role has been resetted.")
                                       
                                       
    }
 if(!roles) {
return message.channel.send("<a:reject:729686557434314864>  | You must specify a role.")
 }
       let botRolePosition = message.guild.member(client.user).roles.highest.position;

       let rolePosition = roles.position;
    let userRolePossition = message.member.roles.highest.position;
          if (userRolePossition <= rolePosition && !message.author.id == message.guild.id) return message.channel.send("<a:reject:729686557434314864> | That role is higher than your role.")
      if (botRolePosition <= rolePosition) return message.channel.send("<a:reject:729686557434314864> | That role is higher than my role.");

 db.set(`tagrole_${message.guild.id}`, roles.id)
 
 message.channel.send(`<a:succes:729686524437856287> | From now on the tag role is ${roles}.`);  
 
    }
}
