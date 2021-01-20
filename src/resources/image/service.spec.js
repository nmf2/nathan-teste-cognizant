import chai from 'chai'
import Service from './service'

describe('Image Service', () => {
  describe('Service initialization', () => {
    it('should throw error when no image is supplied', done => {
      chai
        .expect(() => new Service())
        .to.throw(Error, 'Missing image argument')
      done()
    })

    it('should not throw error when image is supplied', done => {
      chai.expect(() => new Service([[]])).not.to.throw(Error)
      done()
    })
  })

  describe('Service with empty image', () => {
    const service = new Service([[]])

    it('should should always return zero count for getCount', done => {
      chai.expect(service.getCount(0)).to.be.equal(0)
      chai.expect(service.getCount(1)).to.be.equal(0)
      chai.expect(service.getCount(4)).to.be.equal(0)
      chai.expect(service.getCount(-1)).to.be.equal(0)
      done()
    })

    it('should should always return zero count for all values in getBulkCount', done => {
      chai.expect(service.getBulkCount([0, 1, 4, -1])).to.be.deep.equals({
        0: 0,
        1: 0,
        4: 0,
        '-1': 0
      })
      done()
    })
  })

  describe('Service with example image', () => {
    const service = new Service([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [1, 2, 3, 4],
      [5, 6, 7, 8]
    ])

    it('should should return right counts in getCount', done => {
      for (let i = 1; i <= 8; i++) {
        chai.expect(service.getCount(i)).to.be.equal(2)
      }

      chai.expect(service.getCount(9)).to.be.equal(0)
      chai.expect(service.getCount(10)).to.be.equal(0)

      done()
    })

    it('should should return right counts in getBulkCount', done => {
      const values = []
      for (let i = 1; i <= 8; i++) {
        values.push(i)
      }
      chai.expect(service.getBulkCount(values)).to.be.deep.equals({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2
      })
      done()
    })
  })
})
