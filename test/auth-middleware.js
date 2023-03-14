const { expect } = require('chai')
const jwt = require('jsonwebtoken')
const sinon = require('sinon')
const isAuthMiddleware = require('../middleware/is-auth')

describe('Auth middleware', () => {
  it('should throw an error if no Authorization header is present', () => {
    const req = {
      get: () => null
    }

    expect(isAuthMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated.'
    )
  })
  it('should throw an error if the Authorization header is only one string', () => {
    const req = {
      get: () => 'Bearer'
    }

    expect(isAuthMiddleware.bind(this, req, {}, () => {})).to.throw()
  })
  it("should throw an error if the provided token couldn't be verified", () => {
    const req = {
      get: () => 'Bearer token'
    }

    expect(isAuthMiddleware.bind(this, req, {}, () => {})).to.throw()
  })
  it('should yield a userId after decoding the token', () => {
    const req = {
      get: () => 'Bearer token'
    }

    sinon.stub(jwt, 'verify')
    jwt.verify.returns({ userId: 'abc' })
    isAuthMiddleware(req, {}, () => {})

    expect(req).to.have.property('userId')
    expect(req).to.have.property('userId', 'abc')
    expect(jwt.verify.called).to.be.true

    jwt.verify.restore()
  })
})
