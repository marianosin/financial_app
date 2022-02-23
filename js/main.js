//initianilaztion of app
const app = new AppController(new DataModel(), new AppViewer());

//Routing
const routes = [
    { path: '/', action: 'add' },
    { path: '/history', action: 'list' },
    { path: '/search', action: 'search' },
]

//getting browser rout 
const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/';



const findActionByPath = (path, routes) => routes.find(r => r.path == path || undefined);



const router = () => {
    const path = parseLocation(); //get loc
    //defines action with error as main action in case rout not found
    const { action = 'error' } = findActionByPath(path, routes) || {};
    console.log(action);
    switch (action) {
        case 'add':
            app.add('#app')
            break;
        case 'list':
            app.list('#app')
            break;
        case 'search':
            app.search('#app')
            break;

        default:
            ErrorComponent('#app');
            break;
    }
}

$(window).on('load', function () {
    router()
})
$(window).on('hashchange', function (e) {
    console.log('hash changed');
    router();
});