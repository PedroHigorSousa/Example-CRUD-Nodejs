const { request, response } = require('express')
const express = require('express')

const server = express()

// Query params = ?test=1
// Route params = /user/1
// Rquest Body = {"name": "Zezinho"}

const users = ['Higor', 'Rafael', 'Leonardo', 'Lucas', 'Gilberto']

// All users
server.get('/users/all', (request, response) => {
    return response.json(users)
})


// Only users
server.get('/users/:index', (request, response) => {
    const { index } = request.params

    response.json(users[index])
})



server.listen('3333', () => {
    console.log('Server is running ^^ :')
    console.log('http://127.0.0.1:3333')
})

