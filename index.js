const express = require('express')
const server = express()

server.use(express.json())

const users = ['Higor', 'Rafael', 'Leonardo', 'Lucas', 'Gilberto']

// Middleware Global
server.use((request, response, next) => {
    console.log(`Method: ${request.method}; URL: ${request.url};`)

    return next();
})

// Middlewares
const Middlewares = {
    checkUserExists(request, response, next) {
        const user = users[request.body.index]

        if (!request.body.name) {
            return response.status(400).json(
                {
                    error: 'User name is required'
                }
            )
        }

        return next()
    },

    checkUserInArray(request, response, next) {
        const user = users[request.params.index]

        if (!users[request.params.index]) {
            return response.status(400).json(
                {
                    error: 'User does not exists'
                }
            )
        }

        request.user = user

        return next()
    }
}

// All Users
server.get('/users/all', (request, response) => {
    return response.json(users)
})

// Only Users
server.get('/users/:index', Middlewares.checkUserInArray, (request, response) => {
    response.json(request.user)
})

// Create User
server.post('/users/new', Middlewares.checkUserExists, (request, response) => {
    const { name } = request.body

    return response.json(
        {
            message: `User: ${name}, created success !`
        }
    )
})

// Update User
server.put('/users/update/:index', Middlewares.checkUserInArray, Middlewares.checkUserExists, (request, response) => {
    const { index } = request.params
    const { name } = request.body

    const oldName = users[index]
    const newName = users[index] = name

    return response.json(
        {
            message: `The name ${oldName} was changed to ${newName} `
        }
    )

})

// Delete User
server.delete('/users/remove/:index', Middlewares.checkUserInArray, (request, response) => {
    const { index } = request.params
    const user = users[index]

    users.splice(index, 1)

    return response.json(
        {
            message: `User ${user} was successfully deleted`
        }
    )
})


server.listen('3333', () => {
    console.log('Server is running  :')
    console.log('http://127.0.0.1:3333')
})

