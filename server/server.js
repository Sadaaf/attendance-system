const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    const obj = {
        name: 'ayan',
        email: 'Shyan@mon.om'
    }
    res.json(obj)
})

app.listen(4000, ()=>{
    console.log("Server started on port 4000")
})