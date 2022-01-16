const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const moment = require("moment")
module.exports = {
  name: "youngest",
  category: "fun",
  description: "See the newest account on the server.",
        timeout: 2500,
       usage:"o?youngest",
  run: async (bot, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle(`${mem.user.tag}`)
      .setColor(`#00FFFF`)
      .setDescription(`**${moment.utc(mem.user.createdAt).format("dddd, MMMM Do YYYY")}**`);
    message.channel.send(Embed);
  },
};