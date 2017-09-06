const ytdl = require("ytdl-core");

//variable
var arret = false;


var voice_connection = null;
var text_channel = null;
var voice_handler = null;

//stock les obj +tablaux
var now_playing_data = {};//titre et ect
var queue=[];//la queue


//les cmd
var commands = [

//1er cmd

{   command: "stop",
		description: "arret la playlist et il sort de la music qui est entrein de joue)",
		parameters: [],
		execute:function(mes,parm){
    mes.channel.send("en cour cmd 1");
    }    
},

//2er cmd

{
		command: "resume",
		description: "Resumes playlist",
		parameters: [],
		execute: function(mes,parm){
		    if(arret) {
				arret = false;
				if(!queue_vide()) 
					play_next_song();
			} else
				mes.reply("Playback marche deja");
			}
},

//3er cmd

{
        command: "add",
        description: "ajoute la video demande a la queue de la playlist",
        parameters: ["video URL, video ID, playlist URL"],
        execute:function(mes,parm){
		
            var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
            var match = parm[1].match(regExp);

            if (match && match[2])
                queue_playlist(match[2], mes);
             else 
                add_to_queue(parm[1], mes);
        }
},

//4er cmd

{
		command: "np",
		description: "affiche la music qui est en cour",
		parameters: [],
		execute: function(mes,parm){
    		var response = "il joue: ";
			if(is_bot_playing()) 
				response += " " + now_playing_data["titre"] + "-->" (demande par " + now_playing_data["user"] + ")";
			else
				response += "rien";

			mes.reply(response);
		}
},

//5er cmd

{
		command: "skip",
		description: "sort de la music en cours",
		parameters: [],
		execute: function(mes,parm){
   		 if(voice_handler !== null) {
				mes.reply("sort...");
				voice_handler.end();
			} else 
				mes.reply("ya rien qui joue");
	},

//6eme cmd

{
		command: "queue",
		description: "affiche laqueue",
		parameters: [],
		execute: function(mes,parm){
			var response = "";
			if(queue_vide())
				response = "queue vide";
			else {
				var long_queue = queue.length > 30;
				for(var i = 0; i < (long_queue ? 30 : queue.length); i++) {
					response += "*"" + queue[i]["titre"] + "->" (demande par " + queue[i]["user"] + ")\n";
				}

				if(long_queue) response += "\n**...et " + (queue.length - 30) + " plus(alors stoppppp).**";
			}
			
			mes.reply(response);
		}}
	},

//7eme cmd

	{
		command: "clearqueue",
		description: "enleve toute les music de la que",
		parameters: [],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 7");}
	},

//8eme cmd

	{
		command: "remove",
		description: "suprime une music de la queue avec un index ou le dernier(last)",
		parameters: ["Request index or 'last'"],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 8");}
	},
  
//9eme cmd  

{
		command: "commands",
		description: "affiche la description de la commande",
		parameters: [],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 9");}
},

//10eme cmd  

{
		command: "help",
		description: "affiche toute les cmd avec leur discription",
		parameters: [],
		execute: function(mes,parm){
   for(var i=0;i<commands.length;i++)
	mes.channel.send(`${commands[i].command} --> ${commands[i].description}`);}
}
]
//les fonction qui sont assosier avec les cmd
//avoir lip de la video
function get_video_id(entre) {
	var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
	var matches = entre.match(regex);
	if(matches) {
		return matches[1];
	} else {
		return entre;
	}
}
//ajoute a la playlist
function add_queue(video, message, mute = false) {

	var video_id = get_video_id(video);

	ytdl.getInfo("https://www.youtube.com/watch?v=" + video_id, (error, info) => {
		if(error) {
			message.reply(`la video demande ${video_id} newisite pas ou ne peux pas etre joue.`);
			console.log("Error (" + video_id + "): " + error);
		} else {
			queue.push({titre: info["title"], id: video_id, user: message.author.username});
			if (!mute) {
				message.reply('"' + info["title"] + '" a ete ajoue a la queue.');
			}
			if(!arret && !is_bot_playing() && queue.length === 1) {
				play_next_song();
			}
		}
	});

//le bot joue encore ?
function is_bot_playing() {
	return voice_handler !== null;
}
//si la queue est vide
function queue_vide() {
	return queue.length === 0;
}

//pour joue la music suivante si il ya
function play_next_song() {
	if(queue_vide()) {
		text_channel.sendMessage("la queue est vide");
	}

	var video_id = queue[0]["id"];
	var titre = queue[0]["titre"];
	var user = queue[0]["user"];

	now_playing_data["titre"] = titre;
	now_playing_data["user"] = user;

	if(inform_np) {
		text_channel.sendMessage('joue pour le moment: ' + title + ' (demande par ' + user + ')');
		bot.user.setGame(title);
	}

	var audio_stream = ytdl("https://www.youtube.com/watch?v=" + video_id);
	voice_handler = voice_connection.playStream(audio_stream);

	voice_handler.once("end", reason => {
		voice_handler = null;
		bot.user.setGame();
		if(!stopped && !is_queue_empty()) {
			play_next_song();
		}
	});

	queue.splice(0,1);
}





//cette fonction cherche si la cmd exisiste
function recherche_cmd(mes,cmd){
for(var i=0 ; i<commands.length ; i++){
if(cmd==commands[i].command){
return commands[i];}}
return false;
}

//pour lire les cmd 
this.cmd=function(mes,text){
var parm=text.split(" ");
var cmd=recherche_cmd(mes,parm[0]);
if(cmd){
if(parm.length - 1 < cmd.parameters.length)
mes.reply("je manque de parametre !!!");
else
cmd.execute(mes,parm);
}
}
	
