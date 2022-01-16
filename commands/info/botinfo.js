const { utc } = require('moment');
const os = require('os');
const ms = require('ms');
const { MessageEmbed, version: djsversion } = require('discord.js');

module.exports = {
    name: "botinfo",
    description: "See the bot information",
    category: "info",
    aliases: ["bi", "bot"],
        timeout: 2500,
       usage:"o?botinfo",
    run: async (client, message, args) => {
       let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);
        const core = os.cpus()[0];
                   let inline = true


    let embed = new MessageEmbed()
    .setColor("#00FFFF")
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Name", `${client.user.username}`, inline)
    .addField("Bot Developers", "Oxyd Team", inline )
    .addField("Servers", `${client.guilds.cache.size}`, inline)
    .addField("Channels", `${client.channels.cache.size}`, inline)
    .addField("Users", `${client.users.cache.size}`, inline) 
    .addField("Oxyd's Uptime", `${days} days ${hours} hours ${mins} minutes`, inline)
    .setDescription("**[INVITE](https://discord.com/oauth2/authorize?client_id=729605837424689172&scope=bot&permissions=2146958847) · | · [SUPPORT SERVER](https://discord.gg/QRjXmrN)**")
    .addField("Created On", client.user.createdAt)
   
   message.channel.send(embed);
    
    }
}