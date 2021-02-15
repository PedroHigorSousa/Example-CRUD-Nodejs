const { request, response } = require('express')
const express = require('express')

const server = express()

server.use(express.json())

const users = ['Higor', 'Rafael', 'Leonardo', 'Lucas', 'Gilberto']

// All Users
server.get('/users/all', (request, response) => {
    return response.json(users)
})

// Only Users
server.get('/users/:index', (request, response) => {
    const { index } = request.params

    response.json(users[index])
})

// Create User
server.post('/users/new', (request, response) => {
    const { name } = request.body

    if (name !== undefined)
        users.push(name)
    else {
        return response.json(
            {
                message: "The necessary data has not been passed"
            }
        )
    }

    return response.json(
        {
            message: `User: ${name}, created success !`
        }
    )
})

// Update User
server.put('/users/update/:index', (request, response) => {
    const { index } = request.params
    const { name } = request.body

    const oldName = users[index]
    const newName = users[index] = name

    return response.json(
        {
            message:`The name ${oldName} was changed to ${newName} `
        }
    )

})

server.listen('3333', () => {
    console.log('Server is running  :')
    console.log('http://127.0.0.1:3333')
})

