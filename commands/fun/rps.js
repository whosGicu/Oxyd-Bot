const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Play Rock, Paper, Scissors with someone.",
          timeout: 2500,
       usage:"o?rps",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("<a:loading:729757246116069476> | React down!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll()

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "Draw.";
            } else {
                return "You lose!";
            }
        }
    }
}