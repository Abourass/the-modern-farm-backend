const router = require('@koa/router')();
const ArticleController = require('../controllers/ArticleController');

router.prefix('/article'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World'}} });
router.post('/new', async(ctx, next) => ArticleController.create(ctx));
router.post('/all', async(ctx, next) => ArticleController.findAll(ctx));
router.post('/:articleNumber', async(ctx) => ArticleController.findByArticleNumber(ctx));

router.get('/create', async(ctx) => ArticleController.write(ctx));
router.post('/delete/:articleNumber', async(ctx) => ArticleController.delete(ctx));
module.exports = router;
