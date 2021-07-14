const Discord = require("discord.js");
let dovod, SuccBan, oznacenytypek;

module.exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('**BAN**: I do not have a `BAN_MEMBERS` permission to ban someone.');
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**BAN**: You do not have a permission `BAN_MEMBERS` to ban someone, '+message.author.username);
  if (!message.mentions.members.first()) return message.channel.send('**BAN**: You did not mentioned anybody to ban, '+message.author.username);
  oznacenytypek = message.mentions.members.first();
  if (oznacenytypek.id == message.author.id) return message.channel.send("**BAN**: Why you would like to ban yourself? "+message.author.username);
  if (oznacenytypek.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**BAN**: Mentioned member has higher role than you, '+message.author.username);  
  if (!message.guild.member(oznacenytypek).bannable) return message.channel.send('**BAN**: Mentioned member ('+message.mentions.users.first().username+') cannot be banned.');
  args.shift();
  if (!args.length) {
    dovod = 'Reason was not provided.'
  } else {
    dovod = args.slice().join(" ");
  }
  try {   
    message.guild.member(oznacenytypek).ban();
    SuccBan = new Discord.MessageEmbed()
      .setColor("#F9A3BB")
      .setTitle('BAN')
      .setDescription('Member '+message.guild.member(oznacenytypek).user.username+" was banned by "+message.author.username+" from this server:\n"+dovod);
    message.channel.send(SuccBan);
  } catch {
    return message.channel.send("Member "+message.guild.member(oznacenytypek).user.username+" couldn't been banned.");
  }
}
module.exports.help = {
  name: 'ban',
  aliases: ['b'],
  description: 'Zabanuje člena zo servera.',
  usage: '=ban <mention> (reason)',
};