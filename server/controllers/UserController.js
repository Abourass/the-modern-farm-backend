const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

class UserController {
  async createUser(ctx){
    if (ctx.request.body.password !== ctx.request.body.confPassword){
      ctx.oldVal.displayName = ctx.request.body.displayName;
      ctx.oldVal.username = ctx.request.body.username;
      ctx.oldVal.email = ctx.request.body.email;
      return this.reloadRegisterPage(ctx);
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(ctx.request.body.password, salt, async(err, hash) => {
        const user = new User({
          username: ctx.request.body.username,
          displayName: ctx.request.body.displayName,
          email: ctx.request.body.email,
          password: hash,
        });
        const savedUser = await user.save();
        ctx.body = await savedUser;
      });
    });

  }
  async registerPage(ctx){
    ctx.body = `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Register User</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    </head>
    <body>
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Register User
            </h1>
          </div>
        </div>
      </section>
    <form action="/user/new" method="post">
      <div class="field">
        <label class="label">Display Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name articles will be published under" name="displayName">
        </div>
      </div>
      
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input class="input" type="text" placeholder="Username" name="username">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" type="email" placeholder="Email" name="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="password" placeholder="Password" name="password">
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="password" placeholder="Confirm Password" name="confPassword">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
      </div>
    </form>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </body>
   </html>
    `
  }
  async reloadRegisterPage(ctx){
    ctx.body = `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Register User</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    </head>
    <body>
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Register User
            </h1>
          </div>
        </div>
      </section>
    <form action="/user/new" method="post">
      <div class="field">
        <label class="label">Display Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name articles will be published under" name="displayName" value="${ctx.oldVal.displayName}">
        </div>
      </div>
      
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input class="input" type="text" placeholder="Username" name="username" value="${ctx.oldVal.username}">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" type="email" placeholder="Email" name="email" value="${ctx.oldVal.email}">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded is-danger">
              <input class="input" type="password" placeholder="Password" name="password">
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded is-danger">
              <input class="input" type="password" placeholder="Confirm Password" name="confPassword">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
      </div>
    </form>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </body>
   </html>
    `
  }
  async loginPage(ctx){
    ctx.body = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Register User</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    </head>
    <body>
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Register User
            </h1>
          </div>
        </div>
      </section>
    <form action="/user/login" method="post">
    <section class="section">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Login</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Username" name="username">
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="password" placeholder="Password" name="password">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
      </div>
      </section>
    </form>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </body>
   </html>
    `
  }
}
module.exports = new UserController();
