const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('User List')
})

router.get('/new', (req, res) => {
	res.send('User New Form')
})

router.post('/', (req, res) => {
	res.send('Create User')
})

router
	.route('/:userId')
	.get((req, res) => {
		req.params.userId
		res.send(`Get user with ID ${req.params.userId}`)
	})
	.put((req, res) => {
		req.params.userId
		res.send(`Update user with ID ${req.params.userId}`)
	})
	.delete((req, res) => {
		req.params.userId
		res.send(`Delete user with ID ${req.params.userId}`)
	})

router.param('userId', (req, res, next, userId) => {
  next()
})

module.exports = router
