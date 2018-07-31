const shortID = require('short-id')
const postAuthor = require('./authorModel').postAuthor
var books = require('./data').Books

function getBooks(limit) {
  return limit ? books.slice(0, limit) : books
}

function getBook(id) {
  let err = {}
  let response
  console.log('IN MODEL- GET BOOK', id)
  let book = books.find(b => b.id == id)
  console.log('LOOKING/FOUND BOOK: ', book)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err

  } else {
    response = book
  }
  return response
}

function postBook(body) {
  console.log('INSIDE model.POSTBOOK')
  let {name, borrowed, desc='', authors=[]} = body
  let bookFound = books.find(b => b.name == name)
  let err = {}
  let response

  console.log('PASSING DATA:', name, borrowed, bookFound)
  console.log(typeof borrowed)
  console.log('ABOUT TO CHECK REQUEST BODY')
  if(!name || name == undefined) {
    console.log('NAME AND BORROWED FLAG REQUIRED')
    err.status = 400
    err.errors = 'Name required'
    return err
  }  
  
  if(borrowed !== true && borrowed !== false) {
    console.log('INSIDE BORROWED CHECK')
    err.status = 400
    err.errors = 'Borrowed must be true or false'
    return err
  }  
  
  if (bookFound !== undefined) {
    console.log('DUPLICATE BOOK FOUND!')
    err.status = 400
    err.errors = 'Book already in library - cannot add book'
    return err
  }

  console.log('NAME AND BORROWED OK')
  let book = {id: shortID.generate(), name, borrowed}
  if(desc) {
    console.log('DESC included:', desc)
    book.desc = desc
  } else {
      book.desc = ''
  }
  if(body.authors) {
    if(body.authors instanceof Array) {
      book.authors= body.authors
    } else {
      books.authors  = [body.authors]
    }
    book.authors.forEach(a => a.id = shortID.generate())
  } else {
      book.authors = []
  }
  books.push(book)

  return books
}

function putBook(id, body) {
    console.log('In PUTBOOK')
    let {name, borrowed, desc, author} = body
    let err = {}
    console.log('DATA TO UPDATE:', name, borrowed, desc, author)

    let book = books.find(b => b.id == id)
    console.log('BOOK IS: ', book)
    if(!book || book==undefined) {
      console.log('BOOK IS UNDEFINED')
      err.status = 404
      err.errors = 'Book not found, invalid ID'
      return err
    }


    if(name !== undefined) {
      book.name = name
    }

    console.log('About to check borrowed')
    if(borrowed !== undefined) {
      console.log('BORROWED WAS:', borrowed)
      if(borrowed !== true && borrowed !== false) {
        console.log('INSIDE BORROWED ERROR')
        err.status = 400
        err.errors = 'Borrowed must be true or false'
        return err
      }
      book.borrowed = borrowed
    }
    
    
    
    if(desc != '') {
      book.desc = desc
    }

    console.log("Author is: ", author, book.author)
    if(author !== undefined) {
      console.log("IN POSTAUTHOR OF PUT BOOK")
      postAuthor(id,author)

    }
    return book
  }



function deleteBook(id) {
  console.log('IN DELETE BOOK')
  let err = {}
  let book = books.find(b => b.id == id)
  if(!book || book==undefined) {
    err.status = 404
    err.errors = 'Book not found, invalid ID'
    return err
  }

  let bookIdx = books.indexOf(book)
  return books.splice(bookIdx,1)
}


module.exports = {getBooks, getBook, postBook, putBook, deleteBook}
