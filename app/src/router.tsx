import React = require("react");
import login = require("login");


namespace main {

    import AppTemplate = page.AppTemplate;
    import NotFoundPage = page.NotFoundPage;
    import ReactDOM = React.ReactDOM;
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