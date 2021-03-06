const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "unban",
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban user by ID")
        .addIntegerOption(option => option.setName("id").setDescription("ID of user").setRequired(true)),
    async execute(interaction, DB) {
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: '**Unban**: I do not have a `BAN_MEMBERS` permission to ban someone.'
        });
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: '**Unban**: You do not have a permission `BAN_MEMBERS` to ban someone'
        });
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: "**Unban**: You don't have `BAN_MEMBERS` permission"
        });
        if (interaction.options.getInteger("id") == interaction.author.id) return interaction.reply("**Unban**: You can't unban yourself ...");

        SuccUnBan = new MessageEmbed()
            .setColor("#F9A3BB")
            .setTitle('UNBAN')
            .setDescription('User <@'+interaction.options.getInteger("id")+"> was unbanned from this server by "+interaction.author.username);

        interaction.guild.members.unban(interaction.options.getInteger("id"));

        return interaction.reply({
            embeds: [SuccUnBan]
        });
    }
}