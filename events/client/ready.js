let prefix = "o?";
const fs = require("fs");
const db = require("quick.db")
module.exports = (client) => {
  console.log(`${client.user.username} is Online!`);
  client.user.setStatus("online");
  console.log(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)


  function randomStatus() {
  var statuses = [
    `${client.guilds.cache.size} servers`,
    `o?help`,
    `MUSIC UPDATE`,
    ` ${client.users.cache.size} users`
  ];
  
  return client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)])
  } setInterval(randomStatus, 45000);
  
  // COMANDA DE MUTE 
  setInterval(function() {
for(let i in client.mutes) {
  try { let time = client.mutes[i].time
  let guildID = client.mutes[i].guild
 let user = client.mutes[i].user
  let guild = client.guilds.cache.get(guildID)
  let member = guild.members.cache.get(user)
   let mutedRole = guild.roles.cache.find(role => role.name === "Muted");
  if(!mutedRole) continue;
   if(Date.now() > time) {
            guild.member(member).roles.remove(mutedRole)
 
            delete client.mutes[i]
    fs.writeFile("./mutes.json", JSON.stringify(client.mutes), err => {
if(err) throw err;
      console.log(`${member.user.tag} a luat unmute.`)})
  }    } catch(e) {
             delete client.mutes[i]
       fs.writeFile("./mutes.json", JSON.stringify(client.mutes), err => {
if(err) throw err;
               console.log(`.`)

       })
  
  
  }  

}}, 2000)



}
