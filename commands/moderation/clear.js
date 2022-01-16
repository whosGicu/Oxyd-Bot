const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clear the chat.",
    usage:"o?clear <amount>",

    run: async (client, message, args) => {

    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command!")
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("<a:loading:729757246116069476> | Give me a number.")
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to Manage Messages.")
        }
        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
            message.delete();
            const embed = new MessageEmbed()
            .setColor("#00FFFF")
        message.channel.bulkDelete(deleteAmount, true)


    }
}
