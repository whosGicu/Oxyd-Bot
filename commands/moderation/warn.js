const warns = require("../../models/warns");
module.exports = {
  name: "warn",
  description: "Warn a user",
  category: "moderation",
        timeout: 1000,
       usage:"o?warn <user> <reason>",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`<a:reject:729686557434314864> | I couldn't find that member.`);
           if(!message.member.hasPermission("MANAGE_MESSAGES")) {
         return message.channel.send('<a:reject:729686557434314864> | You need manage messages permission to use this command');
       }
            if (user.id === message.author.id) {
            return message.channel.send("<a:reject:729686557434314864> | You can't warn yourself.")
       
        }
    if (!args.slice(1).join(" "))
      return message.channel.send(`<a:loading:729757246116069476> | You need to specify a reason.`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.channel.send(
            `${client.users.cache.get(user.id).tag} got warned for ${args
              .slice(1)
              .join(" ")}. Reached to 1 warn.`
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.channel.send(
            `${client.users.cache.get(user.id).tag} got warned for ${args
              .slice(1)
              .join(" ")}. Reached to ${data.Warns.length} warns.`
          );
        }
      }
    );
  },
};