///<reference path="actions/Reducers.ts"/>

namespace main {


    import Todos = state.Todos;
    import AddEntry = actions.AddEntry;
    import Store = Redux.Store;
    import Action = Redux.Action;
    export class AppTemplateProps {
        children: React.Component<any, any>[];
    }

    export class AppTemplateState {
    }


    function purify(a: Action): any {
        return _.merge({}, a);
    }

    export class AppTemplate extends React.Component<AppTemplateProps, AppTemplateState> {
        constructor(props:AppTemplateProps) {
            super(props);
            this.state = new AppTemplateState();


            const store: Store<Todos> = Redux.createStore<Todos>(reducers.TodosReducer, new Todos([]));

            store.dispatch(purify(new AddEntry(1, "Hello")));

            console.log(store.getState());

            store.dispatch(purify(new AddEntry(2, "World!")));

            console.log(store.getState());
        }

        render() {
            return (
                <div className="appTemplate">
                    <p>Frontend Archetype</p>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }


}