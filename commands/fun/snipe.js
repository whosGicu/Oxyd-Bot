const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "fun",
  description: "See the last deleted message.",
 timeout: 2500,
  usage:"o?snipe",
  run:async (client, message, args) => {
  let prefix = await db.get(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  "o?"
  }
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("<a:reject:729686557434314864> | There are no deleted messages in this channel.")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    .setColor("#00FFFF")
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
   
    
  }
}