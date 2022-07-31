const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const axios = require('axios');
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('search')
})

app.get('/results', (req, res)=>{

    let query = req.query.search;

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=50054e46934f322ed0ae3ac91570adec&query=${query}`)
  .then(response => {
   
  let apiData =  response.data
    res.render('movies', {data: apiData, searchQuery: query})
  })
  .catch(error => {
    res.render('404')
  });

  
})

app.get('*', (req, res)=>{
    res.render('404')
})

app.listen(3000)