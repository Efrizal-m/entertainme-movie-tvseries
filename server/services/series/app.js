const express = require('express')
const app = express()
const PORT = 4002
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(PORT, () => {
    console.log('app listen on port', PORT);
})