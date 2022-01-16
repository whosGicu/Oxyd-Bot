const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");

module.exports = {
  name: "np",
    category: "music",
    timeout: 2500,
  description: "Get the name of current playing song",
    run: async (client, message, args) => {
  
    let embed = new MessageEmbed()
     .setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("You need to be in a voice channel to use this command.");
    }
             if (channel !== message.guild.me.voice.channel){
return message.channel.send("You need to be in the same voice channel to use this.")
}

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
        return message.channel.send("Bot isn't playing any song right now.")
    }

    
    
    embed.setDescription(`**NOW PLAYING** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)

    
    
    
  }
}