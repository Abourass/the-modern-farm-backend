const CounterController = require('CounterController');
const Article = require('../models/ArticleModel');

class ArticleController{
  async findAll(ctx){ctx.body = await Article.find();}
  async findByArticleNumber(ctx) { // Find an Article
    try {
      const article = await Article.findOne({number: ctx.params.articleNumber});
      if (!article) { ctx.throw(404); }
      ctx.body = article;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async create(ctx){
    try {
      const articleThatAlreadyExist = await Article.findOne({title: ctx.request.body.title});
      if (articleThatAlreadyExist){
        ctx.body = {Message: 'That article already exist'}
      } else {
        const articleNum =  await CounterController.increaseCounter('articles', 1);
        const article = new Article({
          title: ctx.request.body.title,
          content: ctx.request.body.content,
          author: ctx.request.body.author,
          number: articleNum,
        });
        const savedArticle = await article.save();
        ctx.body = savedArticle;
      }
    } catch (err){
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async delete(ctx){
    try {
      const deletedArticle = await Article.deleteOne({number: ctx.params.articleNumber});
      if (deletedArticle) {
        ctx.body = {Message: 'Deleted'}
      } else {
        ctx.body = {Message: `No article with the number ${ctx.params.articleNumber}`}
      }
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
}
module.exports = new ArticleController();
