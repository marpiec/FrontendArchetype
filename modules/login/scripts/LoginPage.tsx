namespace login {

    const xhrObj = new XMLHttpRequest();
// open and send a synchronous request
    xhrObj.open('GET', "/scripts/modules/calculator.js", false);
    xhrObj.send('');
    eval(xhrObj.responseText);

    // let calculator = require("scripts/modules/calculator");

    import Calculator = calculator.Calculator;

    export class LoginPageProps {
    }

    export class LoginPageState {
    }


    export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

        calc:Calculator;

        constructor(props:LoginPageProps) {
            super(props);
            this.state = new LoginPageState();
            this.calc = new Calculator();
        }

        render() {
            return <div className="loginPage">
                <p>Login page</p>
            </div>;
        }
    }
}