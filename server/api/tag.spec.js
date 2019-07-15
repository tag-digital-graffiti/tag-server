const expect = require('chai').expect
const app = require('../index')
const agent = require('supertest')(app)
const Tag = require('../db/models/tags')
const db = require('../db/db')

describe('Tag routes', () => {
  let storedTags
  const tagData = [
    {
      imageUrl: '75 Wall St',
      lat: 40.7049444,
      long: -74.0091771,
      assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
      arTagUrl:
        'https://res.cloudinary.com/coolcaps/image/upload/v1562951499/svaj4zj84tuifk2p7okm.png'
    },
    {
      imageUrl: 'Lawrence, NJ',
      lat: 40.753849,
      long: -73.978435,
      assetUrl: 'https://i.imgur.com/IiDUaeJ.png',
      arTagUrl:
        'https://res.cloudinary.com/coolcaps/image/upload/v1562363991/nukg2iiszvqybgynbyyp.png'
    }
  ]

  beforeEach(async () => {
    await Tag.sync({force: true})
    const createdTags = await Tag.bulkCreate(tagData)
    storedTags = createdTags.map(tag => tag.dataValues)
  })

  describe('GET `/api/tags/tags`', () => {
    it('serves up all Tags', async () => {
      const response = await agent.get('/api/tags/tags').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].imageUrl).to.equal(storedTags[0].imageUrl)
    })
  })

  describe('GET`/api/tags`', () => {
    it('serves up all nearby Tags', async () => {
      const response = await agent
        .get('/api/tags/?lat=40.7049444&long=-74.0091771')
        .expect(200)
      console.log(response)
      expect(response.body).to.have.length(1)
    })
  })

  describe('GET`/api/tags/id`', () => {
    it('serves up one Tag by id', async () => {
      const response = await agent.get('/api/tags/1').expect(200)
      console.log(response)
      expect(response.body.imageUrl).to.equal(storedTags[0].imageUrl)
    })
  })
})
