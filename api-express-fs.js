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
    if (err) throw err
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
    if (err) throw err
    try {
      var kodersList = JSON.parse(data)
      var nameKoder = request.params.name.toLowerCase()
      var dataKoders = kodersList
      var koder = dataKoders.filter(koder => koder.name.toLowerCase() === nameKoder)
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

app.post('/koders', (request, response) => {
  fs.readFile('./koders.json', 'utf8', function (error, data) {
    if (error) throw error
    try {
      var obj = []
      obj = JSON.parse(data)
      console.log(obj)
      obj.push(request.query)
      console.log(obj)
      fs.writeFile('./koders.json', JSON.stringify(obj), 'utf8', (error, data) => {
        if (error) throw error
        response.json({
          success: true,
          data: {
            koder: data
          }
        })
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
app.delete('/koders/:id', (request, response) => {
  fs.readFile('./koders.json', 'utf8', function (error, data) {
    if (error) throw error

    try {
      var obj = []
      if (JSON.parse(data).length > 0) {
        var newData = JSON.parse(data).filter(element => element.id !== request.params.id)
        console.log(data)
        obj = newData
      } else {
        obj = ''
      }
      var json = JSON.stringify(obj)
      fs.writeFile('./koders.json', json, 'utf8', (error, data) => {
        if (error) throw error
        response.json({
          success: true,
          data: {
            koder: data
          }
        })
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
