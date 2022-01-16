	const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { formatDate } = require("../../functions.js");
const db = require("quick.db")
module.exports = {
    name: "serverinfo",
    aliases: ["server"],
    category: "info",
    description: "Get informations about the server.",
       timeout: 2500,
       usage:"o?serverinfo",
    run: async (client, message, args) => {


			const verlvl = {
				NONE: 'None ',
				LOW: 'Low ',
				MEDIUM: 'Medium ',
				HIGH: 'High ',
				VERY_HIGH: 'Very High '
			};

			const region = {
				brazil: ':flag_br: Brazil ',
				europe: ':flag_eu: Europe ',
				hongkong: ':flag_hk:Hong Kong ',
				india: ':flag_in: India ',
				japan: ':flag_jp: Japan ',
				russia:':flag_ru: Russia ',
				singapore: ':flag_sg: Singapore ',
				southafrica: ':flag_za: South Africa',
				sydney: 'Sydney',
				'us-central': ':flag_us: US Central ',
				'us-east': ':flag_us: US East ',
				'us-west': ':flag_us: US West ',
				'us-south': ':flag_us: US South ',
			};
    let inline = true
    let sicon = message.guild.iconURL;
    let serverembed = new MessageEmbed()
    .setColor("#00FFFF")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, inline)
    .addField("ID", message.guild.id, inline)
    .addField("Owner", message.guild.owner, inline)
    .addField("Region", region[message.guild.region], inline)
    .addField("Verify Level", verlvl[message.guild.verificationLevel],inline)
    .addField("All Members", `${message.guild.memberCount}`, inline)
    .addField("Humans", `${message.guild.members.cache.filter((m) => !m.user.bot).size}`, inline)
    .addField("Roles", message.guild.roles.cache.size, inline)
    .addField("Channels", message.guild.channels.cache.size, inline)
    .addField("You Joined At", message.member.joinedAt)
    .setFooter(`Server Creation Date ${message.guild.createdAt}`);

    message.channel.send(serverembed);

    
	}
}
