const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const { token, prefix } = require("./config.json");
const fs = require("fs");

client.commands = new Discord.Collection();

global.admin = '';
global.mod = '';
global.fun = '';
global.other = '';
global.util = '';
global.dev = '';

let tickets = [];

client.on("ready", () => {
    console.log("Ready!")
})

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err);
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (!jsfile || jsfile.length <= 0) throw new error(`\n Cannot find files \n`)
    let filesloaded = "\nCommands that were loaded: \n| ";

    jsfile.forEach((f, i) => {
        let file = require(`./commands/${f}`)
        filesloaded += f + " | ";
        switch (file.help.group) {
            case 'admin':
                admin += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            case 'mod':
                mod += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            case 'fun':
                fun += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            case 'other':
                other += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            case 'util':
                util += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            case 'dev':
                dev += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                break;

            default:
                console.log(`${f} does not have any help info`);
                break;
        }
        client.commands.set(file.help.name, file);
    });

    if (admin === '') admin = 'None';
    if (mod === '') mod = 'None';
    if (other === '') other = 'None';
    if (fun === '') fun = 'None';
    if (util === '') util = 'None';
    if (dev === '') dev = 'None';
    console.log(`${filesloaded} \n`);
});

//Some stupid shit lmao
client.on('message', message => {
    if(message.content.toLowerCase().includes("hoes mad")){
        message.react("a:wilin:595013204841857055")
    }

    if(message.content.toLowerCase().includes("flex seal")){
        message.react("a:secsi:595013191189135410")
    }
})

//Command handler
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let command = message.content.split(" ")[0].toLowerCase();
    let args = message.content.split(" ").slice(1);


    let commandfile = client.commands.get(message.content.toLowerCase().split(' ')[0].slice(prefix.length));

    if (commandfile) {
        commandfile.run(client, message, args);
    }
})

client.login(token)