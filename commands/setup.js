const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(":x: Error: Insufficient Permission. \nPlease contact an administrator to run this command.")
    }

    let loadingEmbed = new Discord.RichEmbed()
        .setColor("0x36393E")
        .setTitle("⏱ | Setting up occult Moderation....")
        .setDescription("This shouldn't take long")
        .setThumbnail("https://cdn.discordapp.com/attachments/594288389465833483/595634616531156992/loading.gif")
        .setFooter("Support Server: ", client.user.displayAvatarURL)
        .setTimestamp()

    let successEmbed = new Discord.RichEmbed()
        .setColor("0x36393E")
        .setTitle("✅ | Setup was successful")
        .setDescription("I have set up everything for myself. \nThank you for adding me into your server! :)")
        .setFooter("Occult Moderation", client.user.displayAvatarURL)
        .setTimestamp()

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(`❌ Error: Could not begin setup because I am missing permission to do this. \nPermissions needed: MANAGE_CHANNELS, MANAGE_ROLES, MANAGE_MESSAGES`)
    } else
        if (message.guild.channels.find(x => x.name.includes("occult-logs"))) {
            return message.channel.send(`:x: Error: I have already ran setup on this server!`)
        } else

            if (message.guild.roles.find(x => x.name.toLowerCase() === "occult moderation")) {
                return message.channel.send(`:x: Error: I have already ran setup on this server!`)
            }

    if (message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.channels.find(x => x.name.includes("occult-logs"))) {
        message.channel.send(loadingEmbed)
        message.guild.createChannel('occult-category', {
            type: "category",
            permissions: [{
                id: message.guild.id,
                deny: ["READ_MESSAGES", "SEND_MESSAGES"],
                allow: []
            }]
        }).then(cat => {
            message.guild.createChannel("occult-logs", {
                type: "text",
                parent: cat.id,
                permissions: [{
                    id: message.guild.id,
                    deny: ["READ_MESSAGES", "SEND_MESSAGES"],
                    allow: []
                }]
            }).then(chn => {
                message.guild.createRole({
                    name: "Occult Moderation",
                    color: "0x00f5ff",
                    permissions: ["BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_MESSAGES", "CREATE_INSTANT_INVITE", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "SEND_MESSAGES", "READ_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "ADD_REACTIONS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "MUTE_MEMBERS"]
                }).then(role => {
                    message.guild.me.addRole(role.id)
                message.guild.channels.find(x => x.name.toLowerCase() === "occult tickets") ?   message.guild.createChannel("occult tickets", {
                        type: "category",
                        permissions: [{
                            id: message.guild.id,
                            deny: ["READ_MESSAGES", "SEND_MESSAGES"],
                            allow: []
                        }]
                    }) : console.log("Already have this category!")
                        message.channel.send(successEmbed)
                })
            })
        })
    }

}

module.exports.help = {
    "name": "setup",
    "dName": "setup",
    "desc": "Sets up the bot's settings into your guild.",
    "usage": ",setup",
    "group": "util"
}
