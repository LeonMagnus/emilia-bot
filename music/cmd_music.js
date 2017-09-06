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
    mes.channel.send("en cour cmd 2");}
},

//3er cmd

{
        command: "request",
        description: "ajoute la video demande a la queue de la playlist",
        parameters: [],
        execute:function(mes,parm){
        mes.channel.send("en cour cmd 3");}
},

//4er cmd

{
		command: "np",
		description: "affiche la music qui est en cour",
		parameters: [],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 4");}
},

//5er cmd

{
		command: "skip",
		description: "sort de la music en cours",
		parameters: [],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 5");}
	},

//6eme cmd

{
		command: "queue",
		description: "affiche laqueue",
		parameters: [],
		execute: function(mes,parm){
    mes.channel.send("en cour cmd 6");}
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
	
