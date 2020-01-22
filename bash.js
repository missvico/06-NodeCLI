var commands = require("./commands");
process.stdout.write("prompt > ");

//genero esta variable para simplificar el process
var done = function(output) {
  //muestra output
  process.stdout.write(output);
  //muestra el prompt
  process.stdout.write("\nprompt > ");
}

//cuando la persona escribe y da enter se ejecuta la siguiente funcion
process.stdin.on("data", function(data) {
  
  var fullCmd = data.toString().trim(); // Lo pasa de buffer a string y remueve la nueva línea

  var parametros = fullCmd.split(" "); 

  var cmd = parametros[0]; //comando 

  //Lo hace con un shift y guardando parametros como los argumentos 
  var args = parametros.slice(1);

  if (commands[cmd] === undefined) {
    process.stdout.write("ERROR\n");
    process.stdout.write("prompt > ");
  } else {
    //le paso los argumentos y el done, para que commands internamente me ejecute esa funcion cuando sea el momento.
    commands[cmd](args, done);
  }
});