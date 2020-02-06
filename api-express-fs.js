const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

app.get('/koders', (req, response) => {
  fs.readFile('./koders.json', (err, data) => {
    if (err) throw new Error('Error to read json file')
    try {
      var kodersList = JSON.parse(data)
      var {
        name: nameKoder
      } = req.query
      if (nameKoder === undefined) {
        response.json({
          success: true,
          data: {
            koders: kodersList
          }
        })
      } else {
        var dataKoders = kodersList
        var koder = dataKoders.filter(koder => koder.name.toLowerCase().includes(nameKoder.toLowerCase()))
        if (koder.length === 0) throw new Error(`Can't find koder with name ${nameKoder}`)
        response.json({
          success: true,
          data: {
            koder
          }
        })
      }
    } catch (error) {
      response.status(404)
      response.send({
        success: false,
        error: error.message
      })
    }
  })
})

app.get('/koders/:id', (request, response) => {
  fs.readFile('./koders.json', (err, data) => {
    if (err) throw new Error(`Can't find koder with id ${idKoder}`)
    try {
      var kodersList = JSON.parse(data)
      var {
        id: idKoder
      } = request.params
      var dataKoders = kodersList
      var koder = dataKoders.find(koder => koder.id === parseInt(idKoder))
      console.log(koder)
      if (koder === undefined) throw new Error(`Can't find koder with id ${idKoder}`)
      response.json({
        success: true,
        data: {
          koder
        }
      })
    } catch (error) {
      response.status(404)
      response.send({
        success: false,
        error: error.message
      })
    }
  })
})

app.get('/koders/name/:name', (request, response) => {
  fs.readFile('./koders.json', (err, data) => {
    if (err) throw new Error(`Can't find koder with id ${idKoder}`)
    try {
      var kodersList = JSON.parse(data)
      var nameKoder = request.params.name
      var dataKoders = kodersList
      var koder = dataKoders.filter(koder => koder.name === nameKoder)
      if (koder.length <= 0) throw new Error(`Can't find koder with name ${nameKoder}`)
      response.json({
        success: true,
        data: {
          koder
        }
      })
    } catch (error) {
      response.status(404)
      response.send({
        success: false,
        error: error.message
      })
    }
  })
})

app.listen(8080, () => {
  console.log('app listenting')
})