// This middleware is used to check if the user is logged in or not
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/') // If the user is not logged in, redirect to the login page
      }
    }
  }
  