
const domain = 'http://localhost:8888/lifenote/public'

const routes = {
    'home': '/',
    'login': '/login',
    'register': '/register',
    'note': '/note',
    'notes': '/notes',
    'notes.store': '/notes',
    'notes.update': '/notes/{note}',
    'notes.show': '/notes/{note}',
    'notes.create': {
        path: '/notes/create/{date?}',
        params: ['',],
    },
    'notes.edit': '/notes/{note}/edit',
    'notes.destroy': '/notes/{note}',
    'calendar': '/calendar',
    'settings': '/settings',
    'logout': '/logout',
    'delete': '/delete/{id}'
}

export { domain, routes }
