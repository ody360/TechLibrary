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
    console.log('CURRENT AUTHOR IS: ', author)
    console.log('New Author is: ', newAuthor.author.fName)


    if (!newAuthor.author.fName || !newAuthor.author.lName) {
      console.log('IN NEWAUTHOR ERROR')
      err.status = 400
      err.errors = 'First and Last name required'
      return err
    } else {
      author.fName = newAuthor.author.fName
      author.lName = newAuthor.author.lName
    }
    console.log(author)
    return author
}



function postAuthor(bookId, author) {
  let book = books.find(b => b.id == bookId)
  console.log('POST--AUTHOR---LOOKING/FOUND BOOK: ', book)
  if(!book || book==undefined) {
    console.log("In book not defined")
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  } 
  
  if (!author.fName || !author.lName) {
    console.log("IN NO F/L NAMES", author)
    err.status = 400
    err.errors = 'First and Last name required'
    return err
  }
  
    console.log("ABOUT TO TRY TO POST AUTHOR", author)
    book.author.push(author)
    console.log(book)

    book.author.forEach(a => a.id = shortID.generate())
    return author
}


function getAuthors(id) {
  let book = books.find(b => b.id == id)
  console.log('GET-- AUTHOR---LOOKING/FOUND BOOK: ', book)
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






module.exports = { getAuthors, getAuthor, putAuthor,postAuthor, deleteAuthor }
