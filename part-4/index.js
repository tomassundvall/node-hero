// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {
    console.log(request.headers)
    next()
})

app.use((request, response, next) => {
    console.log('content:')
    console.log(request.content)
    request.chance = Math.random()
    next()
})

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    })
})

app.get('/json', (request, response) => {
    console.log('DONE...')
    response.json({
        chance: request.chance
    })
})

app.get('/error', (request, response) => {
    throw new Error('oops')
})

app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Something broke!')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend', err)
    }

    console.log(`server is listening on ${port}`)
})