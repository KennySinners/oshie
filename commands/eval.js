const Discord = require("discord.js");
const { inspect } = require("util");

module.exports.run = async (client, message, args) => {

    if(message.author.id !== "575108662457139201") return;

    const arg = message.content.split(" ")
    const command = arg.shift().toLowerCase();

    let evaled;
    try {
        evaled = await eval(arg.join(' '));
        message.channel.send("done")
        message.channel.send(inspect(evaled))
        console.log(inspect(evaled))
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error during evaluation.');
    }

}

module.exports.help = {
    name: "eval",
    dName: "eval",
    desc: "Evaluates code",
    usage: ",eval [code]",
    group: "dev"
}