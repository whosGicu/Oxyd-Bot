const { MessageEmbed } = require("discord.js");
const Canvacord = require("canvacord");
const Discord = require("discord.js");
const client = new Discord.Client();
const canvacord = require("canvacord")
module.exports = {
    name: "trigger",
    category: "fun",
    description: "Get an triggered gif.",
   timeout: 5000,
       usage:"o?trigger\no?trigger <user>",
    run: async (client, message, args) => {
      
        let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
      
        let target = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.member; 
     

      
      let avatar = target.user.displayAvatarURL({ dynamic: false, format: 'png' });
      
      let image = await canvacord.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
}