/* global describe it */
const assert = require('assert')
const nanopow = require('../.')

describe('nanopow', () => {

  const hash = '8D3E5F07BFF7B7484CDCB392F47009F62997253D28BD98B94BCED95F03C4DA09'

  describe('#checkWork()', () => {
    it('should validate good work', () => {
      const work = '4effb6b0cd5625e2'
      const valid = nanopow.checkWork(hash, work)
      assert(valid)
    })
    it('should reject bad work', () => {
      const work = '5effb6b0cd5625e2'
      const valid = nanopow.checkWork(hash, work)
      assert(!valid)
    })
  })
  describe('#generateWorkSync()', () => {
    it('should generate valid work', () => {
      const work = nanopow.generateWorkSync(hash)
      const valid = nanopow.checkWork(hash, work)
      assert(valid)
    }).timeout(0)
  })
  describe('#generateWork()', () => {
    it('should generate valid work', async () => {
      const work = await nanopow.generateWork(hash)
      const valid = nanopow.checkWork(hash, work)
      assert(valid)
    }).timeout(0)
    it('should reject when not finding work', (done) => {
      nanopow.generateWork(hash, 1)
        .then(work => {
          done(new Error('Did not reject'))
        })
        .catch(err => {
          done()
        })
    }).timeout(0)
  })
})
