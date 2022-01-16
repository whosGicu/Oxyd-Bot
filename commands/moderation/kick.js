const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "kick",
      aliases: ["k"],
    category: "moderation",
    description: "Kick someone.",
          timeout: 2500,
      usage:"o?kick <user>\no?kick <user> <reason>",
    run: async (client, message, args) => {

             let reason = args.slice(1).join(" ");


        // No args
        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!")
          
        }



        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
    
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to kick.")
  
        }

    let toKick = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        // No member found
        if (!toKick) {
            return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.")
  
        }

        // Can't ban urself
        if (toKick.id === message.author.id) {
            return message.channel.send("<a:reject:729686557434314864> | You can't kick yourself.")
       
        }

        // Check if the user's kickable
      if (!message.guild.member(toKick).kickable) {
            return message.channel.send("<a:reject:729686557434314864> | That member has a higher role than me.")
   
        }
       let rolePosition = message.guild.member(toKick).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition && !message.author.id == message.guild.id) return message.channel.send("<a:reject:729686557434314864> | You can't kick anyone that has a higher or the same role as you!")
                                                                  
            const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
        toKick.send(`${message.guild.name}: You got kicked for: ${reason}`)
                          await sleep(200);
         const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${client.users.cache.get(toKick.id).tag} got kicked.**`); 
     
       toKick.kick(reason)
          message.channel.send(embed)
    }
};
