const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/bookCtrl.js')
const authorCtrl = require('../controllers/authorCtrl.js')

router.get('/books', bookCtrl.getBooks)
router.get('/books/:id', bookCtrl.getBook)
router.post('/books', bookCtrl.postBook)
router.put('/books/:id', bookCtrl.putBook)
router.delete('/books/:id', bookCtrl.deleteBook)

router.get('/books/:id/authors', authorCtrl.getAuthors)
//router.get('/books/:id/authors/:aId', authorCtrl.getAuthor)
router.post('/books/:id/authors', authorCtrl.postAuthor)
router.put('/books/:id/authors/:aId', authorCtrl.putAuthor)
router.delete('/books/:id/authors/:aId', authorCtrl.deleteAuthor)

module.exports = router
