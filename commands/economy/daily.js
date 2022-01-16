const db = require("quick.db")
const ms = require("parse-ms")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "daily",
    aliases: ["dailies"],
    category: "economy",
    description: "Collect your daily money!",
    timeout: 4000,
    usage:"o?daily\no?daily <user>",
    run: async (client, message, args) => {


    let timeout = 46800000

 
    let amount = Math.floor(Math.random() * (350 - 200) + 200)
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;


    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`**<a:reject:729686557434314864> | You've collected your daily, come back in ${time.hours}h ${time.minutes}m ${time.seconds}s.**`)
    } else {

    message.channel.send(`**💷 | ${amount} collected.**`)
    db.add(`money_${user.id}`, amount)
    db.set(`daily_${user.id}`, Date.now())
    }
      
}
}
