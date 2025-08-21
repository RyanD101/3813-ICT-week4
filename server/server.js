var express = require('express')
var cors = require('cors')
var app = express();
var http = require('http').Server(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

let server = http.listen(3000, function(){  
    let host = server.address().address;
    let port = server.address().port;
    console.log("WORKING");
    console.log("Server listening on: " + host + "port: " + port)
});

class User{
    constructor(email, password, username, birthdate, age){
        this.email = email;
        this.password = password;
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.valid = false;
    }
}

const users = [
  new User ("john@example.com", "123",  "John21",  "10/01/2004",  "21"),
  new User ("sarah@example.com", "345",  "Sarah5012",  "02/04/1997",  "28"),
  new User ("paul@example.com", "678",  "Paul3",  "06/09/1999",  "25"),
];

app.post('/api/auth', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (validUser) {
    res.json({ 
        email: validUser.email,
        username: validUser.username, 
        birthdate: validUser.birthdate,
        age: validUser.age, 
        valid: true 
    });
  } else {
    res.json({ valid: false });
  }
});