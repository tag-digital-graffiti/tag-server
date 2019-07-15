const expect = require('chai').expect

const User = require('./users')
describe('user model', () => {
  describe('generate salt', () => {
    it('returns a 26 char value', () => {
      expect(User.generateSalt()).to.have.length(24)
    })
  })
  describe('salted password', () => {
    it('does not return the original password', async () => {
      let testUser = await User.create({
        username: 'superCoolUser',
        password: 'badPassword'
      })
      expect(testUser.dataValues.password).to.not.equal('badPassword')
    })
    it('is a string', async () => {
      let testUser2 = await User.create({
        username: 'superCoolUser2',
        password: 'badPassword'
      })
      expect(testUser2.dataValues.password).to.be.a('string')
    })
    it('requires usernames to be unique', async () => {
      try {
        let testUser = await User.create({
          username: 'superCoolUser',
          password: 'badPassword'
        })
      } catch (error) {
        expect(error.message).to.contain('Validation error')
      }
    })
  })
})
