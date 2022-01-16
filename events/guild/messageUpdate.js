const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = async (oldMessage, newMessage) => {
  try {
    if(!oldMessage.guild) return;
    if(oldMessage.content == newMessage.content) return;

    let chx = db.get(`msglog_${oldMessage.guild.id}`); 
       let logch = oldMessage.guild.channels.cache.get(chx);
  
    console.log(chx, logch)

    if (!logch || !chx) return;

    if(chx === null) { 
      return;
    }
   let embed = new MessageEmbed()
     .setColor("#00FFFF")
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
    .setDescription(`${oldMessage.author} has edited a message on ${oldMessage.channel}\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`)

  logch.send(embed);

  } catch (e) {}

 
};