const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
      category: "fun",
    description: "Make the bot say something for you.",
      timeout: 2500,
       usage:"o?say <message>",
    run: (client, message, args) => {
  if (message.content.includes("http://")) return  message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("www.")) return message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("www.")) return message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("invite.gg")) return message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("discord.gg")) return message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("discord.io")) return message.reply('<a:reject:729686557434314864> | No links!');
  if (message.content.includes("discordapp.com")) return message.reply('<a:reject:729686557434314864> | No links!');
if (!args[0]) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a phrase!")
}

      if(args.join(" ").length > 500) return message.channel.send("<a:reject:729686557434314864> | There's a limit of 500 characters.")

            message.channel.send(args.join(" "));

    }
}