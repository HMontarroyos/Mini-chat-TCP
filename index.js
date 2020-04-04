// Load the TCP Library
net = require('net');
const { exec } = require('child_process');

var colors = require('colors');
colors.enable () ;

var figlet = require('figlet')
const chalk = require('chalk');
const CFonts = require('cfonts');

// Keep track of the chat clients
var clients = [];
var Salas = ['Salas'];

figlet('#Volanty', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});

CFonts.say('Seja Bem Vindo ao nosso Chat !!!', {
  font: 'block',              
  align: 'center',              
  //colors: ['red','blue'],         
  background: 'transparent',  
  letterSpacing: 1,           
  lineHeight: 1,             
  space: true,               
  maxLength: '35',             
  gradient: ['red','yellow','blue','magenta','cyan','green','white'],            
  independentGradient: false, 
  transitionGradient: true,  
  env: 'node'                 
});


// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = null

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (buffer) {
      var data = buffer.toString()
      if(data.startsWith("name:")){
          console.log("kkkkkk", data)
          socket.name = data.split(':')[1].replace('\\r\\n','');
          socket.nomeDaSala = data.split(':')[2].replace('\\r\\n','');
          Salas.push(socket.nomeDaSala)
          socket.write(colors.rainbow("Olá, pode chatear agora ")) + socket.name + "\n" + (colors.rainbow("Você se logou na sala: ")) + (colors.cyan(socket.nomeDaSala))+colors.yellow("\n\n\n LISTA DE COMANDOS\n\n\n")+
          colors.white("salas")+ "= Listara todas as Salas Criadas\n"+colors.white("mudar:'NomeDaSala")+ "= Ira alterar e selecionar a proxima sala em questão ou no caso " +
          "ira criar uma nova Sala caso não exista a sala digitada\n\n"+ colors.white("sair")+ colors.red("VOCÊ SERA DESCONECTADO DO CHAT\n");
      
            // Send a nice welcome message and announce
          broadcast((colors.green(socket.name) + "Entrou na Sala Principal\n", socket.name, socket.nomeDaSala));









      }else if(data.startsWith('exec:')){
        var code = data.split(':')[1]
        exec(`node -e "console.log(${code})"`,{},(e,out,err)=>{
            broadcast(`${code} ->   ${out.toString()}`)
        })
      }
      else if(socket.name === null ){
          socket.write(chalk.bgYellow("Me diga seu nome. Digite 'name: SEUNOME:FIM'\n"));
      }else{
        broadcast(socket.name + "> " + data, socket);
      }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    /*
    broadcast(socket.name + figlet('\nFoi Desconectado do Chat !!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  }));

  */
  broadcast(socket.name + " parou de chatear.\n");
  });
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log(colors.green("Chat server na porta 5000\n"));