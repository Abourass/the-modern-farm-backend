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
  async new(ctx){
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
  async update(ctx){
    try {
      const article = await Article.findOne({number: ctx.params.articleNumber});
      article.title = ctx.request.body.title;
      article.content = ctx.request.body.content;
      article.author = ctx.request.body.author;
      const savedArticle = await article.save();
      ctx.body = savedArticle
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async create(ctx){
    try {
      const articles = await Article.find();
      const articleNavCreate = (articles) => {
        let html = '';
        articles.forEach(article => html += `<a class="navbar-item" href="/article/edit/${article.number}"> ${article.title} </a>`)
        return html
      };
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
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="modernNav">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
       </div>
    
      <div id="modernNav" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="https://the-modern-farm.now.sh/">
            Home
          </a>
    
          <a class="navbar-item" href="/article/create">
            Create Article
          </a>
    
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Articles
            </a>
    
            <div class="navbar-dropdown">
              ${articleNavCreate(articles)}
            </div>
          </div>
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" href="/user/logout">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
                <input class="input" type="text" name="author" placeholder="Author" value="${ctx.state.user.displayName}">
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
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async edit(ctx){
    try {
      const article = await Article.findOne({number: ctx.params.articleNumber});
      const articles = await Article.find();
      const articleNavCreate = (articles) => {
        let html = '';
        articles.forEach(article => html += `<a class="navbar-item" href="/article/edit/${article.number}"> ${article.title} </a>`)
        return html
      };
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
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="modernNav">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
       </div>
    
      <div id="modernNav" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="https://the-modern-farm.now.sh/">
            Home
          </a>
    
          <a class="navbar-item" href="/article/create">
            Create Article
          </a>
    
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Articles
            </a>
    
            <div class="navbar-dropdown">
              ${articleNavCreate(articles)}
            </div>
          </div>
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" href="/user/logout">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <form action="/article/update/${article.number}" method="post">
      <section class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" name="title" placeholder="Title" value="${article.title}">
              </div>
            </div>  
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Author</label>
              <div class="control">
                <input class="input" type="text" name="author" placeholder="Author" value="${article.author}">
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
