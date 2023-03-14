const { expect } = require('chai')
const isAuthMiddleware = require('../middleware/is-auth')

it('should throw an error if no Authorization header is present', () => {
  const req = {
    get: () => null
  }

  expect(isAuthMiddleware.bind(this, req, {}, () => null)).to.throw(
    'Not authenticated.'
  )
})
