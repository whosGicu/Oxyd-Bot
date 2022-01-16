const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db")
module.exports = {
    name: "role",
      aliases: ["role"],
    category: "moderation",
    description: "Role management.",
          timeout: 1750,
    usage:"prefixrole <user>\no?role add <user>\no?role remove <user>",
    run: async (client, message, args) => {
      
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.name === args[2])
        
          if(!role){
return message.channel.send("<a:reject:729686557434314864> | I couldn't find that role.")
}

       let rolePosition = role.position;
      
    let userRolePossition = message.member.roles.highest.position;
      
                    let botRolePosition = message.guild.member(client.user).roles.highest.position;
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[1]);

      
          if (userRolePossition <= rolePosition && !message.author.id == message.guild.id){
          return message.channel.send("<a:reject:729686557434314864> | That role is higher than your role.")
          }
      if (botRolePosition <= rolePosition) {
return message.channel.send("<a:reject:729686557434314864> | That role is higher than my role.");

      }
        let roleembed = new MessageEmbed()
        
        if (!args[0]) {
            return message.channel.send(roleembed)
          
        }
          if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("<a:reject:729686557434314864> | You don't have permission to use this command.")
    
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("<a:loading:729757246116069476> | I need access to Manage Roles.")
  
        }


        // No member found
        if (!user) {
            return message.channel.send("<a:reject:729686557434314864> | I couldn't find that member.")
  
        }
	

     if(args[0] == user) {


 message.guild.member(user).roles.add(role);
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setDescription(`<a:succes:729686524437856287> | **I've added the role ${role} to ${client.users.cache.get(user.id).tag}.**`); 
            message.channel.send(embed);

} else if(args[0] == "add" && args[1] == user) {

       message.guild.member(user).roles.add(role);
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setDescription(`<a:succes:729686524437856287> | **I've added the role ${role} to ${client.users.cache.get(user.id).tag}.**`); 
            message.channel.send(embed);


} else if(args[0] == "remove" && args[1] == user) { 

       message.guild.member(user).roles.remove(role);
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setDescription(`<a:succes:729686524437856287> | **I've removed the role ${role} from ${client.users.cache.get(user.id).tag}.**`); 
            message.channel.send(embed);



}



    
    }
};
