const path = require('path')
const validator = require('express-validator');
const express = require('express')
const layout = require('express-layout')
const routes = require('./router') //auth
const app = express()
//qii = 449123bb4ff70280ce76cc6f7035f94d;
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')


const middleware = [
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded(),
 //validator(),
cookieParser(),
  session({
 secret: 'super-secret-key',
 key: 'super-secret-cookie',
 resave: false,
 saveUninitialized: false,
 cookie: { maxAge: 6000000000 }
  }),
  flash()
]
app.use(middleware)

app.use('/', routes)



app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`)
})
