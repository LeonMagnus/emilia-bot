'use strict';
//importe discord +fs(file system)
const Discord = require("Discord.js");
var bot = new Discord.Client();
//importe les information
const dis = require("./discution.json");


//on utilise user.json
var data = {
	badge:[
	]
	};
const fs = require("fs");
var datas = fs.readFileSync("user.json");
data = JSON.parse(datas);



//config
const prefix = dis.pre;
const token = process.env.Discord_token ||  process.argv[2];

//les message 

bot.on('message', mes => {
	var resu = mes.content.toLowerCase();

	if (resu.startsWith(prefix + "badge")) {
		var i;
		if (resu === prefix + "badge")
			for (i = 0; i < data.badge.length; i++) {
				if (data.badge[i].userid === mes.author.id) {
					affuser(mes);
					break;
				}
				if (i == (data.badge.length - 1)) {
					adduser(mes);
					break;
				}
			}
		else if (mes.mentions.users.first()) 
		for (i = 0; i < data.badge.length; i++) {
			if (data.badge[i].userid === mes.mentions.users.first().id) {
				affusermen(mes)
				break;
			}
			if ((i == data.badge.length - 1)){
				addusermen(mes); 
				break;
			}
			}
		else mes.channel.send("pk menvoyer un message");
		mes.channel.send("et i="+i);
	};


	if (resu === prefix + "affiche") {
		for (var l in data.badge) {
			mes.channel.send(data.badge[l].userid);
		}
	};

	if (resu.startsWith("id")) {
		mes.channel.send(mes.mentions.users.first().id);
	};

	if (resu === "chance") { mes.channel.send(dis.amusment[asard()]); }

	if (resu === prefix + "user") {
		mes.channel.send("sa charge");
		console.log(data);
		mes.channel.send("sais ok");
	}
	if (resu.startsWith(prefix+"new user")) {
		if (resu === prefix + "new user")
			adduser(mes);
		else if (mes.mentions.users.first())
			addusermen(mes);
		else
			mes.channel.send("hm erreur de merdre conard");
	}
	if (resu === "avatar") { mes.reply(mes.author.avatar); }


	if (resu === prefix + "help") { mes.reply(dis.Help); }
	if (resu === prefix + "buf") { binaire(mes); }

});






//fonction pour amusment
//fonction qui ajoute un utilisateur sur le fichier json
//moi
function adduser(mes) {
	data.badge.push({ userid: mes.author.id, badpos: [] });
	var data2 = JSON.stringify(data, null, 2);
	fs.writeFile("user.json", data2, resultatuser(mes));
}
//autre (mentionne)
function addusermen(mes) {
	data.badge.push({ userid: mes.mentions.users.first().id, badpos: [] });
	var data2 = JSON.stringify(data, null, 2);
	fs.writeFile("user.json", data2, resultatuser(mes));
}
//affiche badge(indisponible pour le moment)
//moi(celui qui a aple le bot)
function affuser(mes)
{
	mes.channel.send("j'ai des badge");
}
//autre (mentionne)
function affusermen(mes)
{
	mes.channel.send(mes.mentions.users.first().id +" a des badge");
}
//pour confirme loperation
function resultatuser(mes,err) {
	mes.channel.send("user add avec succes!");
}


//hors sujet

function asard() {
	var a;
	a = Math.floor((Math.random() * 7));
	return a;
}




//bufeur
function binaire(mot) {
	const buf1 = new Buffer("leon");
	const buf2 = new Buffer(buf1);

	mot.channel.send(buf1 + "   je go change la premiere letre ");
	buf2[0] = 0x61;
	mot.channel.send(buf2.toString());



}

