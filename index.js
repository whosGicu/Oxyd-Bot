const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs')
const db = require ("quick.db")
const Discord = require("discord.js")
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION"],
})
const { TOKEN }= require("./config.json")

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
client.on('guildMemberUpdate', async (oldMember, newMember) => {
           let role = db.get(`tagrole_${oldMember.guild.id}`)
         let tag = db.get(`tag_${oldMember.guild.id}`)
         if(!tag || !role) return;
 let roleadd = oldMember.guild.roles.cache.get(role);
  if(!roleadd) return;

  
if(newMember.user.username.includes(tag)) try {
   
   oldMember.guild.member(oldMember).roles.add(roleadd)
   
    } catch(e) {
      console.log(e)
    }
  if(!newMember.user.username.includes(tag)) try {
   
   oldMember.guild.member(oldMember).roles.remove(roleadd)
   
    } catch(e) {
      console.log(e)
    }
})

client.on('guildMemberAdd', async member  => {
     let mutedRole = member.guild.roles.cache.find(role => role.name === "Muted");
     if (!mutedRole) {
        try {
            mutedRole = await member.guild.roles.create({data:{
                name:"Muted",
                color: "#000000",
                permissions:[]
            }});
    
            member.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(mutedRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                     CONNECT: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

try {if (client.mutes[`${member.id}_${member.guild.id}`].guild == member.guild.id){
            member.guild.member(member).roles.add(mutedRole)
}
    }catch(e){
return;
}
})
client.queue = new Map();
client.vote = new Map();
client.commands = new Collection();
client.aliases = new Collection();
client.mutes = require("./mutes.json");


client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});


["command", "event"].forEach(handler => {

    require(`./handlers/${handler}`)(client);
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/guild/messageUpdate")(oldMessage, newMessage);
});
client.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message);
});
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://spanac:spanacel@cluster0.q2je6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


client.login(TOKEN);