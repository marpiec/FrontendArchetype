///<reference path="AppTemplate.tsx"/>
///<reference path="NotFoundPage.tsx"/>

namespace main {

    const xhrObj = new XMLHttpRequest();
// open and send a synchronous request
    xhrObj.open('GET', "/scripts/modules/login.js", false);
    xhrObj.send('');
    eval(xhrObj.responseText);


    // $.getScript('/scripts/modules/login.js', eval);

    import IndexRoute = ReactRouter.IndexRoute;
    import Route = ReactRouter.Route;
    import Router = ReactRouter.Router;
    import LoginPage = login.LoginPage;

    ReactDOM.render((
        <Router>
            <Route path="/" component={AppTemplate}>
                <IndexRoute component={LoginPage} />
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    ), document.getElementById('main'));

}
