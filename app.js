const express = require('express')
const app = express()
const port = 8080

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine' , 'ejs')



app.get('/' , (req,res)=>{
    
    res.render('index')
})



app.listen(port,()=>{
    console.log(`listening on ${port}`)
})