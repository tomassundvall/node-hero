// index.js

const fs = require('fs')

console.log('start reading a file... (package.json)')

fs.readFile('package.json', 'utf-8', function (err, content) {
    if (err) {
        console.log('error happend during reading the file...')
        return console.log(err)
    }

    console.log(content)
})

console.log('end of file...')

function stats (file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => {
            if (err) {
                return reject (err)
            }
            resolve (data)
        })
    })
}

Promise.all([
    stats ('docker-compose.yml')
])
.then((data) => console.log(data))
.catch((err) => console.log(err))
