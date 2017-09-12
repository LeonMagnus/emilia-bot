const Discord = require("discord.js");
const bot = new Discord.Client();
const ytdl = require('ytdl-core');


//fichier ou enrigistre les lvl 
var lvl = require("./lvl.json");
var data = {};
const fs = require("fs");
var datas = fs.readFileSync("./xp.json", "utf8");
data = JSON.parse(datas);

const prefix="/";

//importe les commande de music
const music=require("./music/cmd_music.js");


//recupe le token 
var token = process.env.Discord_token ||  process.argv[2];


bot.login(token);

//les message 
bot.on('message', mes => {
	if (!mes.author.bot) {
		var user = mes.author;
		if (data[user.id]) {
			data[user.id].xp += 1;
			if (data[user.id].xp >= lvl[data[user.id].lvl]) {
				mes.channel.send("gg tu a up un lvl");
				data[user.id].xp = 0;
				data[user.id].lvl += 1;
				mes.channel.send("est tu est lvl " + data[user.id].lvl);
			}
		}
			else {
				data[user.id] = { xp: 0, lvl: 1 };
				mes.channel.send("user add avec succes!");}
			var data2 = JSON.stringify(data, null, 2);
			fs.writeFile("./xp.json", data2);
			}
	
	
	var resu = mes.content.toLowerCase();
	
	if (resu.substring(0, 3) == (prefix + "xp")) {
		var usermen = mes.mentions.users.first();
		var user = mes.author;
		var place = resu.split(" ");
		if(resu == prefix+"xp")
			mes.channel.send(`tu a:\n${data[user.id].xp} xp --> ${lvl[data[user.id].lvl]} xp \n lvl=${data[user.id].lvl}`);
				else if (place[1] == usermen)
			mes.channel.send(`${usermen.username} \n ${data[usermen.id].xp} xp --> ${lvl[data[usermen.id].lvl]} xp \n lvl=${data[usermen.id].lvl}`);
	};
});

//les message 

bot.on('message', mes => {
	var resu = mes.content.toLowerCase();
	
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
for(var i=0;i<entre.length;i++){

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
