var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var net = require('net');

var app = express();


var ip = '';
var port = 56987;
var client = new net.Socket();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Routes :

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/remote', function(req, res) {
    res.render('remote.ejs');
});

app.post("/", function (req, res) {     // Envoi du formulaire (ip du robot)
    console.log('IP du robot : '+req.body.ip);

    if(req.body.ip !== "debug")
    {
        client.connect(port, ip, function() {
            console.log('Connected to '+ip);
        });
    }

    res.redirect('/remote');
});


// Events :

app.post('/remote', function (req, res) {
    if(req.body.orderstr === "go"){
        console.log('Le robot avance !');
    }
    else if(req.body.orderstr === "gor"){
        console.log('Le robot recule !');
    }
    else if(req.body.orderstr === "stop"){
        console.log("Le robot s'arrete !");
    }
    else if(req.body.orderstr === "sweepL"){
        console.log('Le robot tourne a gauche !');
    }
    else if(req.body.orderstr === "sweepR"){
        console.log('Le robot tourne a droite !');
    }
    else if(req.body.orderstr ==="sweepstop"){
        console.log('Le robot arrete de tourner !');
    }
    else {
        console.log('Ordre inconnu '+req.body.orderstr );
    }

})





app.on('close', function(req, res){
    console.log('Fermeture du client.');
});

app.listen(8080);
