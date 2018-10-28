const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	client:'pg',
	connection: {
		host: 'postgresql-rugged-36055',
		user: 'postgres',
		password: '',
		database: 'smart-brain'
	}
});



const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('It is working!');
});

app.post('/signin' ,(req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.post('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)});

app.listen(process.env.PORT ? process.env.PORT : 3000 , () => {
	console.log(`app is running on port ${process.env.PORT ? process.env.PORT : 3000 }`);
});