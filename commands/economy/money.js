  
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "money",
    aliases: ["bal", "balance"],
    category: "economy",
    description: "Check the balance for someone / Transfer money.",
        timeout: 4000,
    usage:"o?money\no?money <user>\no?money <user> <amount>",
    run: async (client, message, args) => {
  
     if(!args[0])  {

      let bal = db.get(`money_${message.author.id}`)

    if (bal === null) bal = 0;

   return message.channel.send(`**💷 | ${message.author.username}, you have a balance of ${bal }.**`)
     }
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(user.user.bot){
return message.channel.send('<a:reject:729686557434314864> | Bots cannot have a balance.')

}
         if(!args[1])  {

      let bal = db.get(`money_${user.id}`)

    if (bal === null) bal = 0;

   return message.channel.send(`**💷 | ${message.author.username}, ${user.user.username} are o balanta de ${bal}.**`)
     }
 
          let member = db.get(`money_${message.author.id}`)
  if (!user) {
        return message.channel.send('<a:reject:729686557434314864> | I couldn\'t find that user.')
    }
    if (!args[1]) {
        return message.channel.send('<a:loading:729757246116069476> | You need to specify an amount.')
    }
    if (message.content.includes('-') || message.content.includes('.') || message.content.includes(',')|| args[1] == "0" || isNaN(args[1])) { 
        return message.channel.send('<a:loading:729757246116069476> | Insert a valid amount.')
    }

    if (member < args[1]) {
        return message.channel.send('<a:reject:729686557434314864> | You don\'t have enough money.') 
    }

     
      if(user.id == message.author.id) {
return message.channel.send(`<a:reject:729686557434314864> | You can't transfer money to yourself!`)
}
      if(args[1] < 10 ){
return message.channel.send(`<a:reject:729686557434314864> | You can't transfer below 10 coins. <a:bani:736126779181367318>.`)

}
   
    let bal1 =  db.get(`money_${user.id}`)
    let random = await Math.floor(Math.random() * 10000) + 1
let paidMoney = (85 / 100 ) * args[1]
  const filter = m => m.author.id === message.author.id;
      
 message.channel.send(`Are you sure you want to transfer ${args[1]} 💷  to ${client.users.cache.get(user.id).tag} ?\n\nIf yes type \`${random}\` below cancel typing \`cancel\`.`)
  message.channel.awaitMessages(filter, {
    max: 1,
    time: 10000
  }).then(collected => {
    if (collected.first().content === 'cancel') {
      return message.channel.send(`**💷 | ${message.author.username}, I cancelled the transfer.**`)
      
    }
    if (collected.first().content === `${random}`) {
              db.add(`money_${user.id}`, paidMoney)
           db.subtract(`money_${message.author.id}`, args[1])
    let bal2 =  db.get(`money_${user.id}`)
    let gotmoney = bal2 - bal1

message.channel.send(`**💷 | ${message.author.username}, ${args[1]} transfered from your balance.**`)
user.send(`**💷 | You got ${gotmoney} from ${message.author.username} (ID: \`${message.author.id}\`).**`)
    
    } 
       if (collected.first().content !== 'cancel' && collected.first().content !== `${random}` ) {
      return message.channel.send(`**${message.author.username}, wrong answer, transfer was cancelled, retype the command to try again!**`)
    }
  }).catch(err => {
    message.channel.send("**💷 | I cancelled the transfer. Time is up!**")
  });



      
}
}