const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "userinfo",
    aliases: ["who", "user", "info","whois"],
    description: "Information about someone",
        category: "info",
          timeout: 2500,
       usage:"o?userinfo\no?userinfo <user>",
    run: (client, message, args) => {

    let inline = true
    let resence = true
    const status = {
        online: "🟢 Online",
        idle: "🌙 Idle",
        dnd: "⛔ Do Not Disturb",
        offline: "⚫ Offline"
      }
        
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
    client = "🟢";
  } else {
    client = "🔴";
  }

            let embed = new MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00FFFF")
                .addField("Username", `${member.user.username}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Bot", `${client}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Nothing"}`,inline, true)
                .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(" **|** ") || "No Roles"}`, true)
                .addField("Member Since", member.joinedAt)
                .addField("Joined Discord At", member.user.createdAt)
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);
    }
}