const router = require('express').Router()
const {Tag} = require('../db/models')
const sequelize = require('sequelize')
const Op = sequelize.Op
router.get('/', async (req, res, next) => {
  const lat = parseFloat(req.query.lat)
  const long = parseFloat(req.query.long)

  try {
    const getNearByTag = await Tag.findAll({
      where: {
        lat: {
          [Op.between]: [lat - 0.005, lat + 0.005]
        },
        long: {
          [Op.between]: [long - 0.005, long + 0.005]
        }
      }
    })
    res.json(getNearByTag)
  } catch (error) {
    next(error)
  }
})
module.exports = router
