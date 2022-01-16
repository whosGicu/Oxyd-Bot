const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "softban",
      aliases: ["sb"],
    category: "moderation",
    description: "Ban someone and then immediately unban.",
          timeout: 2500,
      usage:"o?softban <user>\no?softban <user> <reason>",
    run: async (client, message, args) => {

             let reason = args.slice(1).join(" ");


        // No args
        if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!")
          
        }



        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
    
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to ban.")
  
        }

    let toBan = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        // No member found
        if (!toBan) {
            return message.channel.send("<a:reject:729686557434314864> | I couldn't find tha member.")
  
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.channel.send("<a:reject:729686557434314864> | You can't ban yourself.")
       
        }

        // Check if the user's banable
       if (!message.guild.member(toBan).bannable) {
            return message.channel.send("<a:reject:729686557434314864>| That user has a higher role than me.")
   
        }
 let rolePosition = message.guild.member(toBan).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.channel.send("<a:reject:729686557434314864> | You can't ban anyone that has a higher or same role as you.") 
            const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
        toBan.send(`${message.guild.name}: You have been softbanned for: ${reason}`)
                          await sleep(200);
                const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle(`**<a:succes:729686524437856287> | ${client.users.cache.get(toBan.id).tag} got softbanned.**`); 
     
        message.guild.members.ban(toBan, {days:7, reason: reason});
        message.guild.members.unban(toBan, reason);
          message.channel.send(embed)
    }
};
