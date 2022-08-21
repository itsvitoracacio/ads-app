module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) return next()
		if (!req.isAuthenticated()) res.redirect('/')
	},
	ensureGuest: function (req, res, next) {
		if (req.isAuthenticated()) res.redirect('/dashboard')
		if (!req.isAuthenticated()) return next()
	},
}
