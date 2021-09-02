const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views' , './views');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayouts);

app.use('/' , require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on Port: ${port}`);
})
