const Discord = require("discord.js");
const { tickets } = require("./ticket");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(":x: Error: Insufficient Permission. \nPlease contact an administrator to run this command.")
    }

    let loadingEmbed = new Discord.RichEmbed()
        .setColor("0x36393E")
        .setTitle("⏱ | Reverse setting up Occult Moderation....")
        .setDescription("This shouldn't take long")
        .setThumbnail("https://cdn.discordapp.com/attachments/594288389465833483/595634616531156992/loading.gif")
        .setFooter("Support Server: ", client.user.displayAvatarURL)
        .setTimestamp()

    let successEmbed = new Discord.RichEmbed()
        .setColor("0x36393E")
        .setTitle("✅ | Reverse Setup was successful")
        .setDescription("I have reversed every change I made with **?setup** \nThank you for adding me into your server! :)")
        .setFooter("Occult Moderation", client.user.displayAvatarURL)
        .setTimestamp()

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(`❌ Error: Could not begin reverse setup because I am missing permission to do this. \nPermissions needed: MANAGE_CHANNELS, MANAGE_ROLES, MANAGE_MESSAGES`)
    } else
        if (!message.guild.channels.find(x => x.name.includes("occult-logs"))) {
            return message.channel.send(`:x: Error: I have already ran reverse setup on this server!`)
        } else

            if (!message.guild.roles.find(x => x.name.toLowerCase() === "occult moderation")) {
                return message.channel.send(`:x: Error: I have already ran reverse setup on this server!`)
            }

    if (message.guild.me.hasPermission("MANAGE_CHANNELS") && message.guild.channels.find(x => x.name.includes("occult-logs"))) {
        message.channel.send(loadingEmbed)
        message.guild.channels.find(x => x.name.toLowerCase() === "occult-category").delete().then(() => {
            message.guild.channels.find(x => x.name === "occult-logs").delete().then(() => {
                message.guild.roles.find(x => x.name.toLowerCase() === "occult moderation").delete().then(() => {
                    message.channel.send(successEmbed)
                })
            })
        })
    }

}

module.exports.help = {
    "name": "resetup",
    "dName": "resetup",
    "desc": "Reverses the setup of the bot that was made to the guild.",
    "usage": "?resetup",
    "group": "util"
}
