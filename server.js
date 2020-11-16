const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require("./controllers/register");
const signIn = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db=knex({
    client: 'pg',
    connection: {
      connectString:process.env.DATABASE_URL,
      ssl:true
    }
  });

const app = express()

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('working')})

app.post('/signin', (req, res) => signIn.signInHandler(req,res,db,bcrypt)) 

app.post('/register',(req,res)=>{register.registerHandler(req,res,db,bcrypt)})

app.get('/profile/:id', (req, res) => profile.profileHandler(req,res,db))
 
app.put('/image',(req,res)=>image.imageHandler(req,res,db))

app.post('/imageurl',(req,res)=>image.handleAPICall(req,res))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app running on port 3000 ${process.env.PORT}`)
});
