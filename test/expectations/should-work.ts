import * as $$runtime from 'tendril'; 
 import {refresh,check} from 'app/middleware'
import {search,create,update} from 'app/users'
import * as Users from 'app/Users' 

export const routes = (app:$$runtime.Application) => (mod:$$runtime.Module) =>{ 
 _doNext = $$runtime.doNext(app, mod); 
 eApp.get('/users', (req, res, next) => { 
  Promise
  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(search, null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.post('/users', (req, res, next) => { 
  Promise
  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(create, null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.put('/users/:id', (req, res, next) => { 
  Promise
  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(check, {perm : 'admin' ,v : 12 }))  .then(_doNext(update, null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.delete('/users/:id', (req, res, next) => { 
  Promise
  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(check, {prem : ['admin','remove'] }))  .then(_doNext(Users.delete , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.get('/', (req, res, next) => { 
  Promise
  .resolve(new $$runtime.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(() =>  Promise .try(() => res.render('main/index'))  .then(() => new End())))
   .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
}) 
 } 