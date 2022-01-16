const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.json");


module.exports = {
  name: "resume", 
    category: "music",
   aliases:["r"],
  description: "Resume the Cureent Playing Song",
    timeout: 2500,
    run: async (client, message, args) => {

    let embed = new MessageEmbed()
.setColor(COLOR);

      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send("You need to be in a voice channel to use this command.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  embed.setAuthor("✅ | Resumed the Paused Song")
   embed.setThumbnail(client.user.displayAvatarURL())
  return message.channel.send(embed)
 }
    message.channel.send("The queue is empty.")
    
  }
}