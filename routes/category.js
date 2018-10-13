const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/category')
const router = express.Router()

// localhost:5000/api/category/
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

// localhost:5000/api/category/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)

// localhost:5000/api/category/:id
router.delete('/:id', controller.remove)

// localhost:5000/api/category/:id
router.post('/', upload.single('image'), controller.create)

// localhost:5000/api/category/:id
router.post('/:id', upload.single('image'), controller.update)

module.exports = router