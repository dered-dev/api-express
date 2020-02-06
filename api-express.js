const express = require('express')
const app = express()
var koders = require('./koders')

app.use(express.json())

app.post('/koders', (req, response) => {
  response.json(req.body)
})
app.get('/koders', (req, response) => {
  try {
    var {
      name: nameKoder
    } = req.query

    if (!nameKoder) {
      response.json({
        success: true,
        data: {
          koders: koders
        }
      })
    } else {
      var dataKoders = koders
      var koder = dataKoders.filter(koder => koder.name.includes(nameKoder))
      if (koder.length <= 0) throw new Error(`Can't find koder with name ${nameKoder}`)
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

app.get('/koders/:id', (request, response) => {
  try {
    var {
      id: idKoder
    } = request.params
    var dataKoders = koders
    var koder = dataKoders.find(koder => koder.id === parseInt(idKoder))
    if (!koder) throw new Error(`Can't find koder with id ${idKoder}`)
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

app.get('/koders/name/:name', (request, response) => {
  try {
    var nameKoder = request.params.name
    var dataKoders = koders
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

app.listen(8080, () => {
  console.log('app listenting')
})