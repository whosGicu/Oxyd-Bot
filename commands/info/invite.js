const Discord = require("discord.js")
module.exports = {
    name: "invite",
      aliases: ["botinvite"],
      category: "info",
    description: "Get an invite link for the bot.",
        timeout: 2500,
       usage:"o?invite",
    run: async (client, message, args) => {
    
 let inviteEmbed = new Discord.MessageEmbed()
 .setDescription("[Bot Invite](https://discord.com/oauth2/authorize?client_id=729605837424689172&scope=bot&permissions=2146958847)")
 .setColor("#00FFFF")
.setThumbnail(client.user.displayAvatarURL())

 message.channel.send(inviteEmbed);

    }
}
