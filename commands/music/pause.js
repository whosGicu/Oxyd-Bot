const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");

module.exports = {
  name: "pause",
    category: "music",
    timeout: 2500,
  description: "Pause the cureent playing Song",
    run: async (client, message, args) => {
  
  const { channel } = message.member.voice;
   let embed = new MessageEmbed()
.setColor(COLOR);

    
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("You need to be in a voice channel to use this command.");
    }
     if (channel !== message.guild.me.voice.channel){
return message.channel.send("You need to be in the same voice channel to use this.")
}
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could pause.");
    }

    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      embed.setDescription("✅ | Paused The Current Playing Song")
      embed.setThumbnail(client.user.displayAvatarURL())
      return message.channel.send(embed)
  }  
  }
}