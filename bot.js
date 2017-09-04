var Discord = require("discord.js");
var bot = new Discord.Client();

var token = process.env.Discord_token ||  process.argv[2];
bot.login(token);
//les message 

bot.on('message', mes => {
	var resu = mes.content.toLowerCase();

	if (resu.startsWith("id")) {
		mes.channel.send(mes.mentions.users.first().id);
	};
	if (resu === "avatar") { mes.reply(mes.author.avatar); };
});
