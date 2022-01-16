const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const fs = require ("fs")
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmute someone.",
          timeout: 1000,
      usage:"o?unmute <user>",
    run: async (client, message, args) => {
  
    let tomute = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!")
          
        }
         if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to Manage Roles.")
  
        }
          if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
    
        
        }

    if(!tomute) return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.");
    if(message.author.id === message.mentions.users.first()) return message.reply("<a:reject:729686557434314864> | You can't unmute yourself.");
    let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");
    
   
   

    try{ message.guild.member(tomute).roles.remove(muteRole)
        
      delete client.mutes[`${tomute.id}_${message.guild.id}`]
      fs.writeFile("./mutes.json", JSON.stringify(client.mutes), err => {
if(err) throw err;
        console.log(`${tomute.user.tag} a luat unmute.`)
})
      const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${client.users.cache.get(tomute.id).tag} got unmuted.**`); 
            message.channel.send(embed);
       }catch(e) { 
message.channel.send("<a:reject:729686557434314864> | There seem to be an error, be sure that my role is higher than \"Muted\".")


}
}
};
