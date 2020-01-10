const router = require('@koa/router')();

router.prefix('/'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {article: {title: 'This is a title', content: 'Hello World'}} });
module.exports = router;
