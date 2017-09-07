const Discord = require("discord.js");
const bot = new Discord.Client();
const fs=require("fs");


var test=require("./test.js")

//importe les commande de music
const music=require("./music/cmd_music.js");
const badge=require("/badge/badge.js");


//recupe le token 
var token = process.env.Discord_token ||  process.argv[2];


bot.login(token);
//les message 

bot.on('message', mes => {
	var resu = mes.content.toLowerCase();
	
	if (resu === prefix + "affiche"){
	badge.aff(res,mes);
	}
	
	if(resu.startsWith(prefix + "badge")) {
	badge.action(res,mes)
}
	if(resu.startsWith("/music")){
		music.cmd(mes,resu.substring(7));
	}
	
	if(resu=== "salut"||resu==="hello"||resu==="hi"){
	mes.reply("salut a toi!");
	}
	if (resu.startsWith("id")) {
		if(resu==="id")
			mes.channel.send(mes.author.id);
		else if(decoupe(resu,mes.mentions.users.first().id))
		mes.channel.send(mes.mentions.users.first().id);
	};
	
	if (resu === "avatar") { mes.reply(mes.author.avatar); };
	
	if(resu==="/man"){
		mes.reply("<@210357283253780480>");
	}
});

bot.on('guildMemberAdd', guilds => {guilds.guild.defaultChannel.send(`${guilds.user.username} vien de rejoind le salon`);});
//function par me
function decoupe(entre,personne){
var phrase=[];
var depart=0;
{for(var i=0;i<entre.length;i++){

if(entre[i]==" "){

phrase.push(entre.substring(depart,i));
depart=i+1; }

if( i == (entre.length-1))
phrase.push(entre.substring(depart,(i+1)));
}
if(phrase[1]==='<@' + personne +'>' && phrase.length===2)
return true;
else 
return false;
}
}
