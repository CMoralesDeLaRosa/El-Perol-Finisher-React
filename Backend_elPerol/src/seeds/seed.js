const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const Recipe = require('../api/models/recipe')

const DB_URL = process.env.DB_URL

;(async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conectado a MongoDB')
    await seedDatabase()
    console.log('Datos insertados correctamente')
  } catch (err) {
    console.error('Error en la conexión a MongoDB:', err)
  } finally {
    mongoose.connection.close()
  }
})()

async function seedDatabase() {
  return new Promise((resolve, reject) => {
    const results = []

    fs.createReadStream(`${__dirname}/data/recipes.csv`)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        console.log('Row:', row)

        const time = parseFloat(row.time)
        const portions = parseInt(row.portions)
        const img = row.img || ''
        const name = row.name || ''
        const region = row.region || ''
        const difficulty = row.difficulty.trim()
        const ingredients = row.ingredients || ''
        const elaboration = row.elaboration || ''

        const ingredientsArray = ingredients
          .split(',')
          .map((ingredient) => ingredient.trim())

        if (
          !isNaN(time) &&
          !isNaN(portions) &&
          img &&
          name &&
          region &&
          difficulty &&
          ingredientsArray.length > 0 &&
          elaboration
        ) {
          results.push({
            time,
            portions,
            img,
            name,
            region,
            difficulty,
            ingredients: ingredientsArray,
            elaboration
          })
        } else {
          console.warn(`Error en la fila: ${JSON.stringify(row)}`)
        }
      })
      .on('end', async () => {
        try {
          await Recipe.deleteMany({})
          console.log('Colección limpia')
          console.log('Datos a insertar:', results)
          await Recipe.insertMany(results)
          resolve()
        } catch (error) {
          console.error('Error al insertar recetas:', error)
          reject(error)
        }
      })
      .on('error', (error) => {
        console.error('Error al leer el archivo CSV:', error)
        reject(error)
      })
  })
}
