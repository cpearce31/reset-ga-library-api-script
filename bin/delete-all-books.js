#!/usr/bin/env node
'use strict'

const request = require('request')

const httpOptions = id => {
  return {
    url: 'https://ga-library-api.herokuapp.com/books/' + id,
    method: 'DELETE'
  }
}

request('https://ga-library-api.herokuapp.com/books', (e, r, body) => {
  const ids = JSON.parse(body).books.map(book => book.id)
  let timeout = 0
  ids.forEach(id => {
    setTimeout(() => {
      timeout += 10
      request(httpOptions(id), (e, r, b) => {
        console.log('status code for book with id ' + id, r && r.statusCode)
      })
    }, timeout)
  })
})
