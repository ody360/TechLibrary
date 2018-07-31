const shortID = require('short-id')
const Book = require('../models/bookModel')
var books = require('./data.js').Books

function deleteAuthor(bId,aId) {
  console.log('IN DELETE AUTHOR')
  let err = {}
  let book = books.find(b => b.id == bId)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  }
  console.log('Found Book: ', book)
  let author = book.author.find(a => a.id == aId)
  console.log('Author is: ', author)
  if(!author || author==undefined) {
    err.status = 404
    err.errors = 'Author not found, invalid ID'
    return err
  }

  let Idx = book.author.indexOf(author)
  return book.author.splice(Idx,1)
}



function putAuthor(bId, aId, newAuthor) {
    console.log('In PUTAUTHOR')
    let err = {}
    let response

    let book = books.find(b => b.id == bId)
    console.log('BOOK IS: ', book)
    if(!book || book==undefined) {
      console.log('BOOK IS UNDEFINED')
      err.status = 404
      err.errors = 'Book not found, invalid ID'
      return err
    }

    let author = book.author.find(a => a.id == aId)
    console.log('AUTHOR IS: ', author)


    if (!newAuthor.fName || !newAuthor.lName) {
      err.status = 400
      err.errors = 'First and Last name required'
      return err
    } else {
      author.fName = newAuthor.fName
      author.lName = newAuthor.lName
    }
    return author
}



function postAuthor(bookId, author) {
  let book = Books.find(b => b.id == bookId)
  console.log('AUTHOR---LOOKING/FOUND BOOK: ', book)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  } else if (!author.fName || !author.lName) {
    err.status = 400
    err.errors = 'First and Last name required'
    return err
  }
    book.authors.post(author)
    book.authors.forEach(a => a.id = shortID.generate())
    return author
}


function getAuthors(id) {
  let book = books.find(b => b.id == id)
  console.log('AUTHOR---LOOKING/FOUND BOOK: ', book)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  } else {
    return book.author
  }
}

function getAuthor(bId, aId) {
  let err = {}
  let response = ''
  let book = books.find(b => b.id == bId)
  console.log('AUTHOR---LOOKING/FOUND BOOK: ', book)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  } else {
    console.log('author id: ', aId)
    console.log('AUTHORS IS:', Authors)
  let author = Authors.find(a => a.id == aId)

  console.log('LOOKING/FOUND AUTHOR: ', author)
    response = author
  }
  return response
}






module.exports = { postAuthor, getAuthors, getAuthor, putAuthor,postAuthor, deleteAuthor }
