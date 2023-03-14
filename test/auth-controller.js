const { expect } = require('chai')
const sinon = require('sinon')
const User = require('../models/user')
const AuthController = require('../controllers/auth')

describe('Auth Controller login', () => {
  it('should throw an error with code 500 if accessing the database fails', (done) => {
    sinon.stub(User, 'findOne')
    User.findOne.throws()

    const req = {
      body: {
        email: 'test@mail.com',
        password: 'test'
      }
    }

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an('error')
      expect(result).to.have.property('statusCode', 500)
      done()
    })

    User.findOne.restore()
  })
})
