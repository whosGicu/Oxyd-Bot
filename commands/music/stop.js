const { MessageEmbed } = require("discord.js")



const discord = require("discord.js");

module.exports = {
  name: "stop",
    category: "music",
  description: "Stop the music and take rest ;)",
    timeout: 2500,
    run: async (client, message, args) => {
 
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
      return message.channel.send("The queue is empty.");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};
