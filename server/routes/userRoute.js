const router = require('@koa/router')();
const UserController = require('../controllers/UserController');

router.prefix('/user'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {article: {title: 'This is userland', content: 'Hello World'}} });
router.get('/register', async(ctx, next) => UserController.registerPage(ctx));
router.post('/new', async(ctx, next) => UserController.createUser(ctx));

module.exports = router;
