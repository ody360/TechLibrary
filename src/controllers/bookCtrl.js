const Book = require('../models/bookModel')


function getBooks(req, res, next) {
  const limit = req.query.limit
  const data = Book.getBooks(limit)
  res.status(200).json({message: 'success', data})
}

function getBook(req, res, next) {
  console.log('INSIDE getBook, with ID:', req.params.id)
  const data = Book.getBook(req.params.id)
  if(data.errors) {
    next({status: data.status, message: 'Error retrieving book', error: data.errors})
  } else {
    res.status(200).json({message: 'book found', data})
  }
}

function postBook(req, res, next) {
  const data = Book.postBook(req.body)
  if(data.errors) {
    next({status: data.status, message: 'Error posting book', error: data.errors})
  } else {
  res.status(201).json({message: 'Book posted', data})
}

}

function putBook(req, res, next) {
  const data = Book.putBook(req.params.id, req.body)
  if(data.errors) {
    console.log('INSIDE DATA ERRORS')
    next({status: data.status, message: 'Error Updating book', error: data.errors})
  } else {
    res.status(202).json({message: 'Book updated', data})
  }
}

function deleteBook(req, res, next) {
  const data = Book.deleteBook(req.params.id)
  if(data.errors) {
    console.log('DELETE BOOK ERROR')
    next({status: data.status, message: 'Error Deleting Book', error: data.errors})
  } else {
    res.status(202).json({message: 'Book deleted', data: data})
  }
}

module.exports = {getBooks, getBook, postBook, putBook, deleteBook}
