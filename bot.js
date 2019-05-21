//jshint esversion:6

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity("with JavaScript");
  client.guilds.forEach((guild) => {
    console.log(guild.name);
    guild.channels.forEach((channel) => {
      console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    });

  });
  let generalChannel = client.channels.get("XXXXXX");
  const attachment = new Discord.Attachment("https://dl1.cbsistatic.com/i/r/2018/09/07/9b0dde0c-d502-477e-a33f-50775b7b5c5f/resize/620xauto/86fa15ea6be7c38b94adb1954472a604/runescape22.jpg");
  generalChannel.send(attachment);
});


client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return;
  }
  receivedMessage.channel.send("Message recieved, " + receivedMessage.author.toString() + ": " + receivedMessage.content);
  receivedMessage.react("🤙");

  if(receivedMessage.content.startsWith("!")) {
    processCommand(receivedMessage);
  }

});

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(" ");
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage);
  } else if (primaryCommand =="multiply"){
    multiplyCommand(arguments, receivedMessage);
  } else {
    receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`");
  }
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`");
    return;
  }
  let product = 1;
  arguments.forEach((value) => {
    product = product * parseFloat(value);
  });
  receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}


function helpCommand(arguments, receivedMessage) {
  if (arguments.length == 0) {
    receivedMessage.channel.send("I am not sure what you need help with. Try `!help [topic]`");
  } else  {
    receivedMessage.channel.send("It appears you need help with " + arguments);
  }
}





client.login("XXXXXXXXXXX");
