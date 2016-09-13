/// <reference path="../calculator/Calculator.ts"/>

namespace login {

    import Calculator = calculator.Calculator;

    export class LoginPageProps {
    }

    export class LoginPageState {
    }


    export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

        calc: Calculator;

        constructor(props: LoginPageProps) {
            super(props);
            this.state = new LoginPageState();
            this.calc = new Calculator();
        }

        render() {
            return (
                <div className="loginPage">
                    <p>Login page</p>
                </div>
            )
        }
    }


}