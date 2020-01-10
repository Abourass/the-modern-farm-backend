const router = require('@koa/router')();

router.prefix('/'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World'}} });

router.post('/', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World'}}});
router.post('/1', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World - Article 1'}}});
module.exports = router;
