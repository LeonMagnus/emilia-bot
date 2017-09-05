const Discord = require("discord.js");
const bot = new Discord.Client();
const fs=require("fs");
var date = new Date(Date.UTC(2013, 1, 1, 14, 0, 0));

var test=require("./test.js")


var token = process.env.Discord_token ||  process.argv[2];
bot.login(token);
//les message 

bot.on('message', mes => {
	var resu = mes.content.toLowerCase();
	if(resu=== "salut"||resu==="hello"||resu==="hi"){
	mes.reply("salut a toi!");
	}
	if (resu.startsWith("id")) {
		if(resu==="id")
			mes.channel.send(mes.author.id);
		else if(mes.mentions.users.first())
		mes.channel.send(mes.mentions.users.first().id);
	};
	if (resu === "avatar") { mes.reply(mes.author.avatar); };
	if(resu==="/loli"){test.loli(mes);}
	if(resu==="/datejp"){mes.channel.send(date.toLocaleDateString("ja-JP"));}
});
