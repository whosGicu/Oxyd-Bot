const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "ban",
      aliases: ["b"],
    category: "moderation",
    description: "Ban someone.",
          timeout: 2500,
       usage:"o?ban <user>\no?ban <user> <reason>",
    run: async (client, message, args) => {

             let reason = args.slice(1).join(" ");


        // No args
        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!")
          
        }



        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command.")
    
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to ban!")
  
        }

    let toban = message.mentions.users.first() || client.users.cache.get(args[0])

        // No member found
        if (!toban) {
            return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.")
  
        }

        // Can't ban urself
        if (toban.id === message.author.id) {
            return message.channel.send("<a:reject:729686557434314864> | You can't ban yourself.")
       
        }
      try{
if (!message.guild.member(toban).bannable) {
            return message.channel.send("<a:reject:729686557434314864> | That member has a higher role than me.")
   
        }

   
       let rolePosition = message.guild.member(toban).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition && !message.author.id == message.guild.id) return message.channel.send("<a:reject:729686557434314864> | You can't ban anyone that has a higher or the same role as you.")
            const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
        toban.send(`${message.guild.name}: You got banned for: ${reason}`)
                          await sleep(200);
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${client.users.cache.get(toban.id).tag} has been banned.**`); 
     
message.guild.members.ban(toban, {reason: reason})


     message.channel.send(embed)
      } catch(e){
 const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`<a:succes:729686524437856287> | **${client.users.cache.get(toban.id).tag} has been banned.**`); 
message.guild.members.ban(toban, {reason: reason})
        message.channel.send(embed)




}
    }
};