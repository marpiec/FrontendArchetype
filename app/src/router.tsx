

namespace main {

    import LoginPage = login.LoginPage;

    import Router = ReactRouter.Router;
    import Route = ReactRouter.Route;
    import IndexRoute = ReactRouter.IndexRoute;

    ReactDOM.render((
        <Router>
            <Route path="/" component={AppTemplate}>
                <IndexRoute component={LoginPage} />
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    ), document.getElementById('main'));

}