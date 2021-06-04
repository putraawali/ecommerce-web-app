const request = require('supertest')
const app = require('../app.js')
const { Op } = require("sequelize");
const { User } = require('../models')

afterAll((done) => {
  User.destroy({
      where:
      {
        id:
        { [Op.notIn]: [1, 2] }
      }
    })
    .then(() => {
      done()
    })
    .catch(err => done(err))
})

let dataTest = {
  username: 'putra',
  email: 'putra1@mail.com',
  password: '123123'
}

describe('POST /register test', () => {
  it('Success test for register', (done) => {
    return request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(dataTest)
      .then(response => {
        let {
          body,
          status
        } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('email', dataTest.email)
        expect(body).toHaveProperty('username', dataTest.username)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

// --------------- BATAS SUCI --------------- //

let dataFailPasswordTest = {
  email: 'putra@mail.com',
  password: '00000000'
}
let dataFailEmailTest = {
  email: 'putraaaaaaaaaaaaa@mail.com',
  password: '123123'
}
let dataEmpty = {
  email: '',
  password: ''
}
let arrErr = ['Please input email using email format', 'Password is required']

describe('POST /login test', () => {
  it('Success test for login', (done) => {
    return request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(dataTest)
      .then(response => {
        let {
          body,
          status
        } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Fail email test for login', (done) => {
    return request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(dataFailEmailTest)
      .then(response => {
        let {
          body,
          status
        } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', "Invalid email/password")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Fail password test for login', (done) => {
    return request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(dataFailPasswordTest)
      .then(response => {
        let {
          body,
          status
        } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', "Invalid email/password")
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty input test for login', (done) => {
    return request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(dataEmpty)
      .then(response => {
        let {
          body,
          status
        } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.arrayContaining(arrErr))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})