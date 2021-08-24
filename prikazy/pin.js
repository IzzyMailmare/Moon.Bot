const AllowedIdsSave = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];
let CheckForNumbers;
module.exports.run = async (client,message, args) => {
  if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
  if (!message.member.hasPermission('MANAGE_MESSAGES') || !AllowedIdsSave.includes(message.member.id)) return message.channel.send("**PIN**: You don't have access to this command.");
  if (!args.length) {
    message.delete();
    client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {
      let lastMessage = messages.last();
      if (!lastMessage.content.length && !lastMessage.attachments.size > 0) return message.channel.send("**PIN**: Last message was empty.");
      lastMessage.pin();
    })
  } else {
    CheckForNumbers = args[0];
    if (!hasNumber(CheckForNumbers)) return message.channel.send("**PIN**: ID can contains only numbers.");
      message.channel.messages.fetch(args[0])
        .then(msg => {msg.pin()})
        .catch(error => {if (error.code == '10008') return message.channel.send("**PIN**: This message is not located in this channel.")});
  }
}
module.exports.help = {
  name: 'pin',
  aliases: ['p'],
  description: 'Pinne poslednú/podľa ID správu.',
  usage: '=pin'
};
function hasNumber(CheckForNumbers) {
  return /^[0-9]+$/.test(CheckForNumbers);
}