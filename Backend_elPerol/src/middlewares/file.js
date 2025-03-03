const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = (folder) =>
  new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `elperol/${folder}`,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      transformation: [
        {
          format: 'webp',
          quality: 'auto',
          width: 800,
          crop: 'limit'
        }
      ]
    }
  })

const upload = (folder) => multer({ storage: storage(folder) })

module.exports = { upload }
