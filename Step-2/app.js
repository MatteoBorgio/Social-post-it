const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
})

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post.html'))
})

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'))
})

app.get('/api/postGallery', (req, res) => {
    const data = fs.readFileSync('./images.json', 'utf-8')
    const images = JSON.parse(data)
    res.status(200).json(images)
})

app.post('/api/register', (req, res) => {
    const user = req.body

    let users = []

    if (fs.existsSync('./users.json')) {
        const data = fs.readFileSync('./users.json', null, 2)
        users = JSON.parse(data)
    }
    if(!Array.isArray(users)) {
        users = []
    }

    users.push(user)

    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))

    res.redirect('/post')
})

app.post('/api/post', (req, res) => {
    const newImage = req.body

    let images = []

    if (fs.existsSync('./images.json')) {
        const data = fs.readFileSync('./images.json', 'utf-8');
        images = JSON.parse(data)
    }
    if (!Array.isArray(images)) {
        images = []
    }
    images.push(newImage)

    fs.writeFileSync('./images.json', JSON.stringify(images, null, 2))

    res.redirect('/gallery')
});

app.use((req, res) => {
    res.redirect('/register')
})

app.listen(PORT, () => {
    console.log("Server attivo sulla porta " + PORT)
})