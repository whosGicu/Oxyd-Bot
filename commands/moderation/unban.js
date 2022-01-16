const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "unban",
    category: "moderation",
    description: "Unban someone.",
          timeout: 2500,
    usage:"o?unban <user ID>",
    run: async (client, message, args) => {



        // No args
        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me an ID!")
          
        }



        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
    
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to ban.")
  
        }

        const unban = args[0]
        // No member found
  
      if (!unban) {
            return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.")
  
        }


 
        
     
    message.guild.members.unban(unban, `From ${message.author.tag}`);
const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${unban} got unbanned.**`); 
            message.channel.send(embed);    }
};