const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "votekick",
      aliases: ["kickvote",],
    category: "moderation",
    description: "Votekick someone to kick.",
          timeout: 2500,
       usage:"o?votekick <user>",
    run: async (client, message, args) => {
      if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("<a:reject:729686557434314864> | You need access to kick to use this command!")
        }
  if (!args[0]){
    return message.channel.send("<a:loading:729757246116069476> | Give me a mention or an ID!");
  }

  let kickmember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  
  if(!kickmember){
    message.channel.send("<a:reject:729686557434314864> | That member is not an valid one.");
  }
  let rolePosition = message.guild.member(kickmember).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) {
return message.channel.send("<a:reject:729686557434314864> | You can't kick a higher or same role as you.")
  }
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
    return message.channel.send("<a:loading:729757246116069476> | I need access to kick.").catch(console.error);
  }
      message.delete()
       if (!message.guild.member(kickmember).kickable) {
            return message.channel.send("<a:reject:729686557434314864> | I can't kick that member.")
   
        }
       let poll = new MessageEmbed()
   .setColor(`#00FFFF`)
   .setTitle(`Votekick`)
   .setDescription(`${client.users.cache.get(kickmember.id).tag}`)
   .setFooter(`Vote created by ${message.author.tag}`)

  let msg = await message.channel.send(poll);
  await msg.react(`✅`);
  await msg.react(`⛔`);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === "✅" || reaction.emoji.name === "⛔", {time: 60000});
  msg.delete();

  var NO_Count = reactions.get("⛔").count 
  var YES_Count = reactions.get("✅") 

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get("✅").count;
  }

  var sumsum = new MessageEmbed()
            .setTitle("Vote Finished")
            .setDescription("✅: " + `${YES_Count-1}\n` +
                            "⛔: " + `${NO_Count-1}\n` +
                            "Note: There need to be atleast 3 votes to yes.")

            .setColor("#00FFFF")

  await msg.edit({embed: sumsum});

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick()
    message.channel.send(`<a:succes:729686524437856287> | ${client.users.cache.get(kickmember.id).tag} got kicked.`)
  }else{

    message.channel.send(`<a:reject:729686557434314864> | Insufficient votes to yes.`);
  }
    }
};
