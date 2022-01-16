const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const moment = require ("moment")
module.exports = {
  name: "oldest",
  category: "fun",
  description: "See the oldest account on the server.",
  usage:"o?oldest",
  timeout: 2500,
  run: async (bot, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle(`${mem.user.tag}`)
      .setColor(`#00FFFF`)
      .setDescription(`**${moment.utc(mem.user.createdAt).format("dddd, MMMM Do YYYY")}**`);
    message.channel.send(Embed);
  },
};