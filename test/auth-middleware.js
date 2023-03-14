const { expect } = require('chai')
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
})
