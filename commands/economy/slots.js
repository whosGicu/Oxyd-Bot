const db = require("quick.db")
const slotItems = ["🍇", "🍉", "🍊", "🍏", "🥝", "🍓", "🍒","🍍","🥑"];
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "slots",
    aliases: ["slot"],
    category: "economy",
      timeout: 2000,
    description: "Play slots and win/lose money.",
     usage:"o?slots <amount>",
    run: async (client, message, args) => {
     let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]) || 1
    let win = false;


  if (message.content.includes('-') || message.content.includes('.') || message.content.includes(',')|| args[0] == "0" || isNaN(args[0])) { 
        return message.channel.send('<a:loading:729757246116069476> | Insert a valid amount.')
    }
          if (money > 750) return message.channel.send("<a:reject:729686557434314864> | You cannot use more than 750 💷.");

      if(args[0] > 750) return message.channel.send 
    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
  
        message.channel.send(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins.`)
        db.add(`money_${user.id}`, money)
    } else {
   
        message.channel.send(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins.`)
        db.subtract(`money_${user.id}`, money)
      
    }
    }
}