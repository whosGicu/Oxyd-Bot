const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const fs = module.require("fs")
module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mute someone.",
          timeout: 1000,
    usage:"o?mute <user> <time>",
    run: async (client, message, args) => {
               let reason = args.slice(2).join(" ");
       let default_prefix = "o?"
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;

    let tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!")
          
        }
              if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to Manage Roles!")
  
        }
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
        }
          if (message.content.includes('-') || args[1] == "0" ) { 
        return message.channel.send('<a:loading:729757246116069476> | You need to insert a valid time.')
    }
    if (message.content.includes('-') || message.content.includes('.') || message.content.includes(',')|| args[1] == "0") { 
        return message.channel.send('<a:loading:729757246116069476> | Insert a valid time.')
    }


  

    if(!tomute) return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.");
      if (client.mutes[`${tomute.id}_${message.guild.id}`]){
return message.channel.send(`**<a:reject:729686557434314864> | ${client.users.cache.get(tomute.id).tag} has already been muted.\nUse the command \`${prefix}unmute\` to unmute the member.**`)

}
    if(message.author.id === tomute.id) return message.channel.send("<a:reject:729686557434314864> | You can't mute yourself.");
    let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");


    if (!muteRole) {
        try {
            muteRole = await message.guild.roles.create({data:{
                name:"Muted",
                color: "#000000",
                permissions:[]
            }});
    
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                     CONNECT: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }


  if (tomute.id === message.author.id) {
            return message.channel.send("<a:reject:729686557434314864> | You can't mute yourself!")
       
        }
       if (message.guild.member(tomute).hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:reject:729686557434314864> | I can't mute that member!")
  
        }
    let mutetime = args[1];
    if(!mutetime) return message.channel.send("<a:reject:729686557434314864> | You didn't specify the time.");
    let time =   ms(mutetime)
     if(isNaN(time)) {
return message.channel.send("<a:reject:729686557434314864> | That doesn't seem a valid time.")

}
 if(time > 2592000000){
return message.channel.send("<a:reject:729686557434314864> | You can mute only 30 days!")
}
         let rolePosition = message.guild.member(tomute).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
 if (userRolePossition <= rolePosition && !message.author.id == message.guild.id) return message.channel.send("<a:reject:729686557434314864> | You can't mute anyone that has a higher or same role as you.")
    try{ await     message.guild.member(tomute).roles.add(muteRole);
    client.mutes[`${tomute.id}_${message.guild.id}`] = {
          guild: message.guild.id,
          time: Date.now() +  ms(mutetime),
          user: tomute.id

}
      fs.writeFile("./mutes.json", JSON.stringify(client.mutes, null, 4), err =>{
if(err) throw err;
         const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${client.users.cache.get(tomute.id).tag} has been muted for ${mutetime}.**`); 
            message.channel.send(embed);

})
       }catch(e) { 
message.channel.send("<a:reject:729686557434314864> | There seem to be an error, be sure that my role is higher than \"Muted\".")


}




}
}