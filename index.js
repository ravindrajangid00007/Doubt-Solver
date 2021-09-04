const express = require('express');
const port = 8000;
const sassMiddleware = require('node-sass-middleware');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('./config/passport-local-strategy');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');


app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(express.urlencoded());
app.use(cookieParser());
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.static('assets'));
app.use(expressLayouts);
app.use(session({
    name: 'cookie',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost:27017/Social_media',
            autoRemove: 'disabled'
        },function(err){
            if(err) {console.log(err || "stored seccurfully") ;}
        }
    ),
    cookie: { 
        maxAge: 1000*60*60,
        // secure: true,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on Port: ${port}`);
})
