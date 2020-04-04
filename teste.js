var figlet = require('figlet');
var colors = require('colors');
colors.enable () ;

const chalk = require('chalk');
 
console.log(chalk.bgYellow('Hello world!'));
 
figlet('#Volanty', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

const CFonts = require('cfonts');
 
CFonts.say('Seja Bem Vindo ao nosso Chat !!!', {
    font: 'block',              // define the font face
    align: 'center',              // define text alignment
    //colors: ['red','blue'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '35',             // define how many character can be on one line
    gradient: ['red','yellow','blue','magenta','cyan','green','white'],            // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment CFonts is being executed in
});


