const Discord = require("discord.js")
module.exports = {
    name: "poll",
      category: "general",
    description: "Make a poll.",
        timeout: 2500,
       usage:"o?poll <idea>",
    run: async (client, message, args) => {
          const sayMessage = args.join(" "); 
  if (!sayMessage) return message.channel.send("<a:loading:729757246116069476> | What do I vote for?")
       if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command.")
    
        
        }
   let poll = new Discord.MessageEmbed()
   .setColor(`#00FFFF`)
   .setTitle(`Voting`)
   .setDescription(sayMessage)
   .setFooter(`Vote created by ${message.author.tag}`)
    const pollTopic = await message.channel.send(poll);
    pollTopic.react(`✅`);
    pollTopic.react(`⛔`);
      message.delete()



    }
}