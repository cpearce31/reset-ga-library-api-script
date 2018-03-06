#!/usr/bin/env node
'use strict'

const request = require('request')
const parse = require('csv-parse')
const fs = require('fs')

const httpOptions = body => {
  return {
    url: 'https://ga-library-api.herokuapp.com/books',
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

fs.readFile('./books.csv', function (err, data) {
  err && console.log(err)
  parse(data, { columns: true }, function (err, data) {
    err && console.log(err)
    console.log(data)
    let timeout = 0
    data.forEach(book => {
      timeout += 10
      setTimeout(() => {
        request(httpOptions(JSON.stringify({ book })), (e, r, body) => {
          console.log(body)
        })
      }, timeout)
    })
  })
})
