const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var answers = ["it is certain", "as i see it, yes", "reply hazy, try again", "dont count on it"];


// Redirect to ask
app.get('/', (req, res) => {
   res.redirect('/ask')
})

// Show the ask form
app.get('/ask', (req, res) => {
   res.render('ask.ejs', { product: '' })
})


// Find a question
app.post('/ask', (req, res) => {
 var query = req.body.question
 console.log(query);



if (localStorage.getItem(query) == null) {
  var random = getRandomInt(3);
  console.log(random);
  console.log("data uit array:");
  var store = answers[random];
  console.log(store);
  localStorage.setItem(query,store);
  res.render('answer.ejs',{answer: store} )
}
else {
  var store = localStorage.getItem(query);
  res.render('answer.ejs',{answer: store});
}
})


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
