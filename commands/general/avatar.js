const Discord = require("discord.js")
module.exports = {
    name: "avatar",
    aliases: ["av"],
        category: "general",
    description: "Check someone's avatar",
        timeout: 2500,
       usage:"o?avatar\no?avatar <user>",
     run: (client, message, args) => {
  let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let target = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.member;     
      let embed = new Discord.MessageEmbed()
        
        .setColor("#00FFFF")
        .setTitle(target.user.tag)
        .setImage(target.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`**[Avatar URL](${target.user.displayAvatarURL({ dynamic: true, size: 512 })})**`)
        message.channel.send(embed);

}}