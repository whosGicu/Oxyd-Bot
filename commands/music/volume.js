const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../../config.json");
module.exports = {
  name: "volume",
    category: "music",
   aliases: ["v","level"],
  description: "Manage the volume of the song",
    timeout: 2500,
    run: async (client, message, args) => {
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send("You need mute members permission to do this.")
    }
    

    
    let embed = new MessageEmbed().setColor(COLOR);

    
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("Tou need to be in a voice channel to use this command.");
    }
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("The queue is empty.");
    }
                if (channel !== message.guild.me.voice.channel){
return message.channel.send("You need to be in the same voice channel to use this.")


}
    
    if(!args[0]) {
      return message.channel.send(`The Current Volume is ${serverQueue.volume}`)
    }
    
    if(isNaN(args[0])) {
      return message.channel.send("You can only use numbers.")
    }
    
    if(args[0] > 200) {
      embed.setAuthor("You will die if you reach the limit of 200 :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`Seted Volume to ${args[0]}`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
  }
};
