const router = require('@koa/router')();
const ArticleController = require('../controllers/ArticleController');

router.prefix('/article'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World'}} });
router.post('/all', async(ctx, next) => ArticleController.findAll(ctx));
router.post('/:articleNumber', async(ctx) => ArticleController.findByArticleNumber(ctx));

router.post('/new', async(ctx, next) => {
  if (ctx.isAuthenticated()){
    await ArticleController.new(ctx)
  } else {
    ctx.redirect('/user/login')
  }
});
router.post('/update/:articleNumber', async(ctx) => {
  if (ctx.isAuthenticated()){
    await ArticleController.update(ctx)
  } else {
    ctx.redirect('/user/login')
  }
});

router.get('/create', async(ctx) => {
  if (ctx.isAuthenticated()){
    await ArticleController.create(ctx);
  } else {
    ctx.redirect('/user/login')
  }
});

router.get('/edit/:articleNumber', async(ctx) => {
  if (ctx.isAuthenticated()){
    await ArticleController.edit(ctx);
  } else {
    ctx.redirect('/user/login')
  }
});

router.post('/delete/:articleNumber', async(ctx) => {
  if (ctx.isAuthenticated()){
    await ArticleController.delete(ctx);
  } else {
    ctx.redirect('/user/login')
  }
});
module.exports = router;
