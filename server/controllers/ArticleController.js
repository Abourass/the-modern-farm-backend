const CounterController = require('./CounterController');
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
      if (articleThatAlreadyExist){ ctx.body = {Message: 'That article already exist'} }
      if (articleThatAlreadyExist == null){
        const articleNum =  await CounterController.increaseCounter('articles', 1);
        const article = new Article({
          title: ctx.request.body.title,
          content: ctx.request.body.content,
          author: ctx.request.body.author,
          number: articleNum.sequence_value,
        });
        const savedArticle = await article.save();
        ctx.body = savedArticle
      }
    } catch (err){
      console.log(err);
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async write(ctx){
    ctx.body = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create Article</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
  </head>
    <body>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Create Article
          </h1>
        </div>
      </div>
    </section>
    <form action="/article/new" method="post">
      <section class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" name="title" placeholder="Title">
              </div>
            </div>  
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Author</label>
              <div class="control">
                <input class="input" type="text" name="author" placeholder="Author">
              </div>
            </div>  
          </div>
        </div>
        <textarea id="editor" name="content"></textarea>
        <br />
        <button class="button is-success" type="submit">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Save</span>
        </button>
      </section>
    </form>
      <script src="https://cdn.ckeditor.com/ckeditor5/16.0.0/classic/ckeditor.js"></script>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <script>
        ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => { console.error( error ); } );
       </script>
    </body>
    </html>
    `
  }
  async edit(ctx){
    try {
      const article = await Article.findOne({number: ctx.params.articleNumber});
      ctx.body = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create Article</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
  </head>
    <body>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Create Article
          </h1>
        </div>
      </div>
    </section>
    <form action="/article/new" method="post">
      <section class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" name="title" placeholder="Title">
              </div>
            </div>  
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Author</label>
              <div class="control">
                <input class="input" type="text" name="author" placeholder="Author">
              </div>
            </div>  
          </div>
        </div>
        <textarea id="editor" name="content">${article.content}</textarea>
        <br />
        <button class="button is-success" type="submit">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Save</span>
        </button>
      </section>
    </form>
      <script src="https://cdn.ckeditor.com/ckeditor5/16.0.0/classic/ckeditor.js"></script>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <script>
        ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => { console.error( error ); } );
       </script>
    </body>
    </html>
    `
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async delete(ctx){
    try {
      const deletedArticle = await Article.deleteOne({number: ctx.params.articleNumber});
      if (deletedArticle) {
        await CounterController.decreaseCounter('articles', 1);
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
