const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Route handlers
const register = require('./routes/register');
const signin = require('./routes/signin');
const profile = require('./routes/profile');
const image = require('./routes/image');

const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'nottebianca2',
        password: 'laki1232',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


// Root 
app.get('/', (req, res) => res.send(database.select('*').from('users')));

//Signin route
app.post('/signin', (req, res) => signin.handleSignin(req, res, database, bcrypt));

//Register route
app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt));

//Profile route
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, database));

//Image route
app.put('/image', (req, res) => image.handleImage(req, res, database));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(3000, () => console.log(`Server listening on port ${3000}`));