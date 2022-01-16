  const db = require("quick.db");
const{ MessageEmbed } = require("discord.js")
const custom = require("../../models/custom");
const Timeout = new Set();
const ms = require("ms");
const Discord = require ("discord.js")
module.exports = async (client, message) => {

    if (!message.guild) return;
  message.channel.messages.fetch();
  if (message.author.bot) return;
  let default_prefix = "a!"
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (message.content.toLowerCase().startsWith(prefix)) {
  if (cmd.length === 0) return;

   let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if (command.timeout) {
      if (Timeout.has(`${message.author.id}${command.name}`)) {
        return message.reply(
          `A little too quick there.`
        );
      } else {
        command.run(client, message, args);
        Timeout.add(`${message.author.id}${command.name}`);
        setTimeout(() => {
          Timeout.delete(`${message.author.id}${command.name}`);
        }, command.timeout);
      }
    } else {
      command.run(client, message, args);
    }
  } else {
    custom.findOne(
      { Guild: message.guild.id, Command: cmd },
      async (err, data) => {
        if (err) throw err;
        if (data) return message.channel.send(data.Content);
        else return;
      }
    );
  } }
      let amounts = [
     0,
     1    
  ];
  let amount = amounts[Math.floor(Math.random()*amounts.length)];
      db.add(`money_${message.author.id}`, amount)

}
