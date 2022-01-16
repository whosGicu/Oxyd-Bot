const db = require("quick.db");
module.exports = {
  name: "settag",
  category: "config",
  timeout: 2500,
  description: "Set server's tag.",
    usage:"o?settag <tag>",
  run: async (client, message, args) => {
    let permission = message.member.hasPermission("ADMINISTRATOR");

    if (!permission) {
      return message.channel.send(
        "<a:reject:729686557434314864> | You need administrator permission to use this command!"
      );
    }
    let tag = db.get(`tag_${message.guild.id}`);

    if (tag && !args[0]) {
      db.delete(`tag_${message.guild.id}`);
      return await message.channel.send(
        "<a:succes:729686524437856287> | The tag has been resetted."
      );
    }

    db.set(`tag_${message.guild.id}`, args.join(" "));
    if (!tag && !args[0]) {
      db.delete(`tag_${message.guild.id}`);
      return await message.channel.send(
        "<a:reject:729686557434314864> | You must specify a tag."
      );
    }

    message.channel.send(
      `<a:succes:729686524437856287> | From now on the server tag is ${args.join()}.`
    );
  }
};
