const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
      aliases: ["question"],
    category: "fun",
    description: "I answer you a question.",
      timeout: 1500,
       usage:"o?8ball <question>",

    run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("The question?")
  let answers = [
    '100%',
    'It has already been decided',
    'Without a doubt',
    'Yes, of course',
    'You can count on that', 
    'Apparently, yes',
    'Probably',
    'Looks good',
    'Nah',
    'Yes',
    'Probably, yes',
    'I am sure',
    'I better not tell you',
    'No',
    'Don\'t count on this',
    'My answer is no',
    'My sources say no',
    'Doesn\'t look so good',
    'Big lies',
    'No chance',
    'How not'
  ];
  let answer = answers[Math.floor(Math.random()*answers.length)];
  message.channel.send(answer);
    }
}