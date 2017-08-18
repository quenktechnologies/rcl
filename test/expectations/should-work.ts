import { refresh, check } from 'app/middleware'
import * as Users from 'app/Users'
import { Random } from 'app/Random'

export const routes = <C>(_app: express.Application, _mod: tendril.app.Module<C>) => {
    let _users = new Users();
    let _random = new Random();
    _app.get('/users', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [r => refresh(r)], r => _users.search(r), _mod);
        _ctx.next();
    })
    _app.post('/users', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [r => refresh(r)], r => _users.create(r), _mod);
        _ctx.next();
    })
    _app.put('/users/:id', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [r => refresh(r), r => check(r, { perm: 'admin', v: 12 })], r => _users.update(r), _mod);
        _ctx.next();
    })
    _app.delete('/users/:id', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [], r => _users.delete(r), _mod);
        _ctx.next();
    })
    _app.get('/random', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [], r => _random.get(r, 1, 2, 3), _mod);
        _ctx.next();
    })
    _app.delete('/users/:id', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [r => refresh(r), r => check(r, ['admin', 'remove'])], r => _users.delete(r), _mod);
        _ctx.next();
    })
    _app.get('/', (_req, _res) => {

        let _ctx = new tendril.app.actions.Context(_req, _res, [], _mod.render('main/index', { name: 'Nikosi' }), _mod);
        _ctx.next();
    })
} 
