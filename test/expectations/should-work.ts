import { refresh, check } from 'app/middleware'
import * as Users from 'app/Users'
import { Random } from 'app/Random'

export const routes = <C>(_app: express.Application,
    _renderer: tendril.app.Renderer,
    _mod: tendril.app.Module<C>) => {
    let _users = new Users();
    let _random = new Random();
    _app.get('/users', refresh, (_req, _res) => {

        Bluebird
            .try(() => _users.search(_req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.post('/users', refresh, (_req, _res) => {

        Bluebird
            .try(() => _users.create(_req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.put('/users/:id', refresh, check({ perm: 'admin', v: 12 }), (_req, _res) => {

        Bluebird
            .try(() => _users.update(_req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.delete('/users/:id', (_req, _res) => {

        Bluebird
            .try(() => _users.delete(_req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.get('/random', (_req, _res) => {

        Bluebird
            .try(() => _random.get(1, 2, 3, _req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.delete('/users/:id', refresh, check(['admin', 'remove']), (_req, _res) => {

        Bluebird
            .try(() => _users.delete(_req, _res)).catch(e => _mod.onError(e, _req, _res))
    })
    _app.get('/', (_req, _res) => {

        Bluebird
            .try(() => _renderer.render('main/index', { name: 'Nikosi' })).catch(e => _mod.onError(e, _req, _res))
    })
} 
