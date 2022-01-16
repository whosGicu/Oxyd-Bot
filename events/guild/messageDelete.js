const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = async (message) => {
  try {
  if(!message.guild) return;

    let chx = db.get(`msglog_${message.guild.id}`); 
       let logch = message.guild.channels.cache.get(chx);
  
    console.log(chx, logch)

    if (!logch || !chx) return;

    if(chx === null) { 
      return;
    }   const p = new MessageEmbed()
     .setColor("#00FFFF")
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
   .setDescription(`${message.author} has deleted a message on ${message.channel}\n**Content:**\n${message.content}`)
  
  logch.send(p);
  } catch (e) {}
};