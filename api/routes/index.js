const router = require('express').Router();
const profileRoute = require('./profile/profile-router');

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('/user', profileRoute);

module.exports = router;
