const { Permissions } = require("discord.js");
let C_Sprava = [];
let C_Emoji, Allowed, EmojiResult;
module.exports.say = async(message, args) => {
  message.delete();
  args.shift();
  if (args[0] == "-i") {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) || message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      args.shift();
      Allowed = '';
    } else {
      return message.channel.send({
        content: "**Say**: Error 2 (For more info => /say)"
      });
    }
  } else {
    Allowed = '**'+message.author.username+'**:';
  }
  for (let i = 0; i < args.length; i++) {
    if ((String(args[i]).charAt(0) && args[i].slice(args[i].length-1) == ':')) {
      EmojiResult = args[i].substring(1, args[i].length-1);
      EmojiResult = message.client.emojis.cache.find(emoji => emoji.name === EmojiResult);
      if (EmojiResult.animated === false) {
        C_Emoji = "<:" +EmojiResult.name+":"+EmojiResult.id+">";
      } else {
        C_Emoji = "<a:"+EmojiResult.name+":"+EmojiResult.id+">";
      }
      C_Sprava[i] =  C_Emoji;
    } else {
      C_Sprava[i] = args[i];
    }
  }
  C_Sprava.unshift(Allowed);
  let C_Sprava_Full = C_Sprava.slice().join(" ");
  message.channel.send(C_Sprava_Full);
  C_Sprava = [];
}