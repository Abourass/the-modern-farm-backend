const router = require('@koa/router')();
const passport = require('koa-passport')
require('../utils/auth');

const UserController = require('../controllers/UserController');

router.prefix('/user'); // Create route prefix for this file
router.get('/', async(ctx) => { ctx.body = {article: {title: 'This is userland', content: 'Hello World'}} });
router.get('/register', async(ctx) => UserController.registerPage(ctx));
router.post('/new', async(ctx) => UserController.createUser(ctx));
router.get('/login', async(ctx) => UserController.loginPage(ctx));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/article/create',
  failureRedirect: '/user/login'
}));
router.post('/logout', async(ctx) => {
  ctx.logout();
  ctx.redirect('/user/login');
});

module.exports = router;
