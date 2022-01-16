const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("parse-ms")
const db = require("quick.db")
module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Get a list with the bot commands.",
        timeout: 2500,
    run: async (client, message, args) => {
      let default_prefix = "o?"
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
         if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Command can't be found: " + args[0]);
      }

       const embed = new MessageEmbed()
               .setColor("#00FFFF")
    let info = `No information found for command **${args[0].toLowerCase()}**`;

    if (command.name) info = `**Name:** ${command.name}`;
    if (command.aliases) info += `\n\n**Aliases:** ${command.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (command.timeout) info += `\n\n**Cooldown:** ${command.timeout/1000} seconds`;
    if (command.description) info += `\n\n**Description**: ${command.description}`;
    if (command.usage) info += `\n\n**Usage:** \n${command.usage}`;
  
                       


                  embed.setDescription(info)
      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setTitle(`> Prefix: ${prefix}`)
        .setDescription("**[INVITE](https://discord.com/oauth2/authorize?client_id=729605837424689172&scope=bot&permissions=2146958847) · | · [SUPPORT SERVER](https://discord.gg/QRjXmrN)**\n > **Do you need help ? Type: " + prefix +"help <command>**")
        .setColor("#00FFFF")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`> <a:blue_star:735945517133070337> ${category.toUpperCase()}[${value.length}]`, desc);
        
      }

      return message.channel.send(emx);
    }
}
}