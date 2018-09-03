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

var answers = ["it is certain","it is decidedly so","without a doubt", "yes - definitely","you may rely on it", "as i see it, yes", "most likely", "outlook good", "yes", "signs point to yes", "ask again later", "better not tell you now", "cannot predict now", "concentrate and ask again", "my reply is no", "my sources say no", "outlook not so good", "very doubtful", "reply hazy, try again", "dont count on it"];


// Redirect to ask
app.get('/', (req, res) => {
   res.redirect('/ask')
})

// Show the ask form
app.get('/ask', (req, res) => {
   res.render('ask.ejs', { product: '' })
})

app.get('/delete', (req, res) => {
  localStorage.clear();
   res.redirect('/ask')
})



// Find a question
app.post('/ask', (req, res) => {
 var query = req.body.question



if (localStorage.getItem(query) == null) {
  var random = getRandomInt(20);
  var store = answers[random];
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
