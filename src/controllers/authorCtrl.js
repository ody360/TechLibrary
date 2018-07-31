const Author = require('../models/authorModel')


function getAuthors(req, res, next) {
  console.log('IN GET AUTHORS FOR THAT ONE BOOK!')
  const data = Author.getAuthors(req.params.id)
  res.status(200).json(data)
}

function getAuthor(req, res, next) {
  console.log('IN CTRL; AUTHOR ',req.params.aId)
  const data = Author.getAuthor(req.params.id,req.params.aId)
  res.status(201).json(data)
}

function postAuthor(req, res, next) {
  //console.log('IN CTRL; AUTHOR ',req.params.aId)
  const data = Author.postAuthor(req.params.id, req.body)
  res.status(201).json(data)
}

function putAuthor(req, res, next) {
  const data = Author.putAuthor(req.params.id, req.params.aId, req.body)
  res.status(202).json(data)

}

function deleteAuthor(req, res, next) {
  const data = Author.deleteAuthor(req.params.id, req.params.aId)
  console.log('DELETE DATA: ', data)
  res.status(202).json(data)
}

module.exports = {getAuthors, getAuthor, postAuthor, putAuthor, deleteAuthor}
