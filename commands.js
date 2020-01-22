var fs = require("fs");
var requestP5 = require("request");
module.exports = {
  pwd: function(fileName, done) { //el directorio en donde estoy ejecutando node
    //esto lo hace en un solo paso sin la variable output
    done(process.cwd());
  },
  date: function(fileName, done) {
    var today = new Date();
    done(today.toUTCString() + " -0300 (EDT)";);
  },
  ls: function(fileName, done) {
    var output = "";
    //es asíncrono - por eso pongo el throwerr
    fs.readdir(".", function(err, files) {
      if (err) throw err;
      //files es un array, para cada uno le concateno el fileName con saltos de línea
      files.forEach(function(file) {
        output += file.toString() + "\n";
      });
      //imprimo la response
      done(output);
    });
  },
  echo: function(fileName, done) {
    var output = "";
    fileName.forEach(arguments => {
      output += arguments + " ";
    });
    done(output);
  },
  cat: function(fileName, done) {
    var output = "";
    fileName.forEach(files => {
      fs.readFile("./" + files, (err, data) => {
        if (err) throw err;
        output += data + "\n";
        done(output);
      });
    });
  },
  head: function(fileName, done) {
    var output = "";
    fs.readFile("./" + fileName, (err, data) => {
      if (err) throw err;
      var lines = data.toString().split("\n");
      var head = lines.slice(0, 5).join("\n");
      output += head;
      done(output);
    });
  },
  tail: function(fileName, done) {
    var output = "";
    fs.readFile("./" + fileName, (err, data) => {
      if (err) throw err;
      var lines = data.toString().split("\n");
      var head = lines.slice(lines.length - 6).join("\n");
      output += head;
      done(output);
    });
  },
  wc: function(fileName, done) {
    var output = "";
    fs.readFile("./" + fileName, (err, data) => {
      if (err) throw err;
      var lines = data.toString().split("\n");
      output += lines.length;
      done(output);
    });
  },
  curl: function(url, done) {
    var output = "";
    requestP5("http://" + url, function(error, response, body) {
      output += body + "\n";
      done(output);
    });
  }
};
