const Discord = require("discord.js")
module.exports = {
    name: "support",
      aliases: ["supportserver"],
      category: "info",
    description: "Join the Bot's Support Server",
        timeout: 4000,
       usage:"o?support",
    run: async (client, message, args) => {
    


 message.channel.send(`:wrench: | **Do you need help? This is my support server:**\nhttps://discord.gg/QRjXmrN`)

    }
}
