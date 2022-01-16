const warns = require("../../models/warns");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "warns",
  aliases:["warnings"],
  description: "Get a user warns in the guild.",
  category: "moderation",
        timeout: 2500,
       usage:"o?warns <user>",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`<a:reject:729686557434314864> | I couldn't find that member.`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `<a:succes:729686524437856287> | ${client.users.cache.get(user.id).tag} has never been warned.`
          );
        let Embed = new MessageEmbed()
          .setTitle(`Warns of ${client.users.cache.get(user.id).tag}`)
          .setDescription(
            data.map((d) => { 
              return d.Warns.map(
                (w, i) =>
                  `${i} - Moderator: ${
                    message.guild.members.cache.get(w.Moderator).user.tag
                  } Reason: ${w.Reason}`
              ).join("\n");
            })
          )
          .setColor("#00FFFF")
        message.channel.send(Embed);
      }
    );
  },
};