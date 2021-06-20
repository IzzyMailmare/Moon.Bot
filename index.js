const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config/config.json");
const fs = require("fs");
const request = require(`request`);
const path = require('path');
const Integer = require('integer');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
let filename;

fs.readdir("./prikazy/", (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f => f.endsWith('.js'))
    if(jsfile.length <= 0){ 
      console.log("Nenašol som žiaden príkazy.");
      return;
    }
    jsfile.forEach((f) =>{
      let prikaz = require(`./prikazy/${f}`);
      console.log(`${f} -> načítaný`);
      client.commands.set(prikaz.help.name, prikaz);
      if (prikaz.help.aliases) {
        prikaz.help.aliases.forEach(alias => {
            client.aliases.set(alias, prikaz.help.aliases)
        });
    }
    });
});

client.on("ready", () => {
    client.user.setActivity(config.prefix+config.afterPrefix);
    //client.channels.cache.get("833625728310444042").send("= = = \nBot je Online!\nÚčet: " + client.user.tag + "\n= = =");
    console.log("A až teraz som sa donačítal, ty kok.");
});

client.on("message", async message => {
	if (message.author.bot) return;
    if (message.channel.id == '836534868892581919') {
        if(message.attachments.first()){
            filename = message.attachments.first().name;
            download(message.attachments.first().url);
            message.react("\👍");
        }
    }
    if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(" ");
	const commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName);
    if (!command) command = client.commands.find(prikaz => prikaz.aliases && prikaz.aliases.includes(commandName));
    command.run(client, message, args);
});

function download(url){
    if (fs.existsSync('./memes/' + filename)) {
        fs.readFile('./config/number.txt', 'utf8', function readFileCallback(err, data){
            if (err) return console.log(err);
                var cnumberINt = Integer(data);
		        cnumberINt = cnumberINt + 1
                filenameext = path.parse(filename).ext;
                filename = 'downloaded_meme_' + cnumberINt + filenameext;
		        fs.writeFile('./config/number.txt', cnumberINt.toString(), (err) => {
			        if (err) throw err;
		        });
                request.get(url)
                    .on('error', console.error)
                    .pipe(fs.createWriteStream('./memes/' + filename));
        });
    } else {
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('./memes/' + filename));
    }
}
client.login(config.token);