import * as $$runtime from 'tendril'; 
 import {refresh,check} from 'app/middleware'
import * as Users from 'app/Users' 

export const routes = (app:tendril.Application) => (mod:tendril.Module) => (eApp:express.Application)=>{ 
 _doNext = doNext(app, mod); 
 eApp.get('/users', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(Users.search , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.post('/users', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(Users.create , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.put('/users/:id', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(check, {{ perm : 'admin' ,v : 12  } }))  .then(_doNext(Users.update , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.delete('/users/:id', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(Users.delete , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.delete('/users/:id', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(refresh, null))  .then(_doNext(check, {['admin','remove']}))  .then(_doNext(Users.delete , null))  .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
})
eApp.get('/', (req, res, next) => { 
  Promise
  .resolve(new tendril.Continuation($$runtime.Request.fromFramework(req)))
  .then(_doNext(() =>  Promise .try(() => res.render('main/index'))  .then(() => new End())))
   .catch(e=>mod.onError(e))
  .catch(e=>app.onError(e));
}) 
 } 