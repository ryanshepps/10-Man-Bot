const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '>'

client.on('ready', () => {
    console.log("I am ready :)")
    client.user.setGame(">help for help");
    client.user.setAvatar("http://kolatinformant.com/wp-content/uploads/2013/07/countdown10.png")
});

var table = (`
\`			  --------| Team 1 | Team 2 |--------			  \`
\`			  --------|Captain1|Captain2|--------			  \`
\`			  Player01|--------|--------|Player02			  \`
\`			  Player03|--------|--------|Player04			  \`
\`			  Player05|--------|--------|Player06			  \`
\`			  Player07|--------|--------|Player08			  \``);
var captains = ''; 
var playersdefault = "-------- -------- -------- -------- -------- -------- -------- --------"
var players = playersdefault.split(' ');
var picksdefault = "-------- -------- -------- -------- -------- -------- -------- --------"
var pick = picksdefault.split(' ');
var pickNum = 0;

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;
    
    if (message.content.startsWith(prefix + 'whytho')) {
        message.channel.sendMessage("https://gist.github.com/FireKiN/aaa60e3dd83d4b8a7876c6187f9d6589");   
    } else

    if (message.content.startsWith(prefix + 'ping')) {
    	message.channel.sendMessage(`\`${Date.now() - message.createdTimestamp} ms\``);
    } else

    if (message.content.startsWith(prefix + "10man") || message.content.startsWith(prefix + 'tenman')) {
    	message.channel.sendCode("text", table);
    };

    if (message.content.startsWith(prefix + 'captains') || message.content.startsWith(prefix + 'Captains')) {
    	captains = message.content.slice(10).split(' ');
    	for (var o = 0; o < 2; o++) {
    		if (captains[o].length < 8) {
    			for (var i = 0; i < 15 - captains[o].length; i++) {
    				captains[o] = captains[o] + '-';
    			};
    		}; 
    		if (captains[o].length > 8) {
    			captains[o] = captains[o].slice(0, 8);
    		};
    	};
    	table = (`
\`			  --------| Team 1 | Team 2 |--------			  \`
\`			  --------|${captains[0]}|${captains[1]}|--------			  \`
\`			  --------|--------|--------|--------			  \`
\`			  --------|--------|--------|--------			  \`
\`			  --------|--------|--------|--------			  \`
\`			  --------|--------|--------|--------			  \``);
    	message.channel.sendCode("text", table);
    }

    if (message.content.startsWith(prefix + "players") || message.content.startsWith(prefix + "Players")) {
    	players = message.content.slice(9).split(' ');
    	for (var i = 0; i < players.length; i++) {
    		if (players[i].length < 8) {
    			for (var o = 0; o < 15 - players[i].length; o++) {
    				players[i] = players[i] + '-';
    			};
    		};
    		if (players[i].length > 8) {
    			players[i] = players[i].slice(0, 8);
    		};
    	};
    	table = (`
\`			  --------| Team 1 | Team 2 |--------			  \`
\`			  --------|${captains[0]}|${captains[1]}|--------			  \`
\`			  ${players[0]}|--------|--------|${players[1]}			  \`
\`			  ${players[2]}|--------|--------|${players[3]}			  \`
\`			  ${players[4]}|--------|--------|${players[5]}			  \`
\`			  ${players[6]}|--------|--------|${players[7]}			  \``);
    	message.channel.sendCode("text", table);
    };

    if (message.content.startsWith(prefix + "pick") || message.content.startsWith(prefix + "Pick")) {
    	var replacepref = message.content.slice(6);
    	for (var i = 0; i < 9; i++) {
    		if (replacepref == players[i]) {
    			pick[pickNum] = pick[pickNum].concat(players[i]);
    			pick[pickNum] = pick[pickNum].slice(8, 16);
    			players[i] = players[i].concat("--------");
    			players[i] = players[i].slice(8, 16);
    			table = (`
\`			  --------| Team 1 | Team 2 |--------			  \`
\`			  --------|${captains[0]}|${captains[1]}|--------			  \`
\`			  ${players[0]}|${pick[0]}|${pick[1]}|${players[1]}			  \`
\`			  ${players[2]}|${pick[2]}|${pick[3]}|${players[3]}			  \`
\`			  ${players[4]}|${pick[4]}|${pick[5]}|${players[5]}			  \`
\`			  ${players[6]}|${pick[6]}|${pick[7]}|${players[7]}			  \``);
    			message.channel.sendCode("text", table);
    			pickNum += 1;
    		};
    	};
    };

    if (message.content.startsWith(prefix + "redo") || message.content.startsWith(prefix + "restart") 
    	|| message.content.startsWith(prefix + "Redo") || message.content.startsWith(prefix + "Restart")) {
    	table = (`
\`			  --------| Team 1 | Team 2 |--------			  \`
\`			  --------|Captain1|Captain2|--------			  \`
\`			  Player01|--------|--------|Player02			  \`
\`			  Player03|--------|--------|Player04			  \`
\`			  Player05|--------|--------|Player06			  \`
\`			  Player07|--------|--------|Player08			  \``);
    	message.channel.sendCode("text", table);
    }; 

    if (message.content.startsWith(prefix + "help") || message.content.startsWith(prefix + "Help")) {
    	message.channel.sendCode("text", 
`.o0 FireKiN's 10 Man Bot 0o.
Commands:
>help     - Displays all the Commands
>10man    - Posts the current 10man table
>redo     - Completely blanksheets the table 
>captains - enters in two captains
		  - eg: >captains Lunar Aichoudry
>players  - enters in eight players, each seperated by a space
		  - eg: >players Janowski Auriel Nick ...
>pick 	  - picks a player and adds it to the table
		  - eg: >pick Janowski
		  - Picks should be in chronological order meaning the first captain picks their first player, then the
		  	second captain, and so on and so on. 
>ping	 - Displays the ping you have to the bot.`)
    }
});

client.login('token');