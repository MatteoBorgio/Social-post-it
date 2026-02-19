const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

app.post('/api/save', (req, res) => {
    const data = req.body

    fs.writeFileSync('./post.json', JSON.stringify(data, null, 2))

    return res.status(200).json({
        success: true,
        message: "Utente memorizzato su file json"
    })
})

app.use((req, res) => {
    res.status(404).send(`<h1>404 - Pagina non trovata</h1>`)
})

app.listen(PORT, () => {
    console.log("Server attivo sulla porta " + PORT)
})