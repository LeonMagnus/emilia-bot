//on utilise user.json
var data = {
	badge:[
	]
	};
const fs = require("fs");
var datas = fs.readFileSync("user.json");
data = JSON.parse(datas);


this.action=function(res,mes){
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


this.aff=function(res,mes) {
		for (var l in data.badge) {
			mes.channel.send(data.badge[l].userid);
		}
	};




//fonction qui ajoute un utilisateur sur le fichier json
//moi
this.adduser=function(mes) {
	data.badge.push({ userid: mes.author.id, badpos: [] });
	var data2 = JSON.stringify(data, null, 2);
	fs.writeFile("user.json", data2, resultatuser(mes));
}
//autre (mentionne)
this.addusermen=function(mes) {
	data.badge.push({ userid: mes.mentions.users.first().id, badpos: [] });
	var data2 = JSON.stringify(data, null, 2);
	fs.writeFile("user.json", data2, resultatuser(mes));
}
//affiche badge(indisponible pour le moment)
//moi(celui qui a aple le bot)
this.affuser=function(mes)
{
	mes.channel.send("j'ai des badge");
}
//autre (mentionne)
 this.affusermen=function(mes)
{
	mes.channel.send(mes.mentions.users.first().id +" a des badge");
}
//pour confirme loperation
this.resultatuser=function(mes,err) {
	mes.channel.send("user add avec succes!");
}
