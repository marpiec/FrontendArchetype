namespace main {

    import IndexRoute = ReactRouter.IndexRoute;
    import Route = ReactRouter.Route;
    import Router = ReactRouter.Router;

    declare function require(nam: string): any;

    requirejs(["scripts/modules/login"], function(login: any) {

        import LoginPage = login.LoginPage;

        ReactDOM.render((
            <Router>
                <Route path="/" component={AppTemplate}>
                    <IndexRoute component={LoginPage} />
                    <Route path="*" component={NotFoundPage}/>
                </Route>
            </Router>
        ), document.getElementById('main'));


    });

}