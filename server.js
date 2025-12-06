let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// URI 
const uri = 'mongodb+srv://chaimaely:adminadmin123%40@new-assignment0.iduo1qc.mongodb.net/assignmentsDB?retryWrites=true&w=majority&appName=new-assignment0';


// Connexion sans options obsolètes
mongoose.connect(uri)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("URI = " + uri);
    console.log("➡ Test via http://localhost:8010/api/assignments");
  })
  .catch(err => {
    console.log('Erreur de connexion: ', err);
  });

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;
const prefix = '/api';

// Routes
app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

// Start server
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;
