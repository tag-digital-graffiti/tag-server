const db = require('./db')
const {User, Tag} = require('./db/models')
const {green, red} = require('chalk')

// var Promise = require('bluebird');

const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  const userOne = await User.create({
    username: 'tagger',
    password: '1234'
  })

  const tagOne = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091771,
    assetUrl: '../res/monitor.jpg',
    arTagUrl: '../res/graffiti.png'
  })

  console.log(green('Seeding success!'))
  db.close()
}

// const syncDb = () => db.sync({ force: true });
//syncDb();
seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
