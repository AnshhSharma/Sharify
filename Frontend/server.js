const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 4000;
const User = require('./config/model')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const urlParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')

// app.use(express.static('public'))
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/visuals'))

connectDB();

app.get('/', (req, res) => {
    res.render('login')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', urlParser, (req, res) => {

    const { email, password } = req.body

    User.findOne({ email: email }, (err, data) => {
        if (err) throw err
        console.log(data);

        if (!data) {
            res.redirect('/login?error=' + encodeURIComponent('Incorrect_Credential'));
        }
        else if (data) {
            const db_pass = data['pass']
            bcrypt.compare(password, db_pass, (err, result) => {
                if (err) throw err

                if (result) {
                    res.redirect(`/file`)
                }
                else {
                    // Add flash message
                    console.log('Invalid');
                    res.redirect('/login?error=' + encodeURIComponent('Incorrect_Credential'))
                }
            })
        }

    })
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', urlParser, (req, res) => {

    const { fname, lname, email, password } = req.body

    User.findOne({ email: email }, (err, data) => {
        if (err) throw err
        if (data) {
            //Add flash message
            res.redirect('/register?error=' + encodeURIComponent('Incorrect_Credential'))
        }
        else {
            var newUser = new User({
                name: fname + " " + lname,
                email: email,
                pass: password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.pass, salt, (err, hash) => {
                    if (err) throw err
                    newUser.pass = hash
                    newUser.save().then((value) => {
                        res.redirect('/login');
                    })
                })
            })

        }
    })
})

app.get('/file', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})