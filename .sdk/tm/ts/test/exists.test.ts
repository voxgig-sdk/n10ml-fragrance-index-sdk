
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { N10mlFragranceIndexSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = N10mlFragranceIndexSDK.test()
    equal(testsdk instanceof N10mlFragranceIndexSDK, true,
      'N10mlFragranceIndexSDK.test() must return a client synchronously')
  })

})
