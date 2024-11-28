export const errors = [
    {
        name: 'badRequest',
        status: 400,
        message: 'Bad request'
    },
    {
        name: 'unauthorized',
        status: 401,
        message: 'User unauthorized'
    },
    {
        name: 'wrongPassword',
        status: 401,
        message: 'Wrong password'
    },
    {
        name: 'userNotFound',
        status: 404,
        message: 'User not found'
    },
    {
        name: 'userAlreadyExist',
        status: 409,
        message: 'User already exist'
    },
    {
        name: 'databaseUnable',
        status: 503,
        message: 'Unable to connect to database: '
    }
]

export const getError = (err: string) => errors.find(el => el.name === err)