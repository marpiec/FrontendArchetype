///<reference path="State.ts"/>
///<reference path="Actions.ts"/>

namespace reducers {



    import ReducersMapObject = Redux.ReducersMapObject;
    import Todos = state.Todos;
    import AddEntry = actions.AddEntry;
    import Todo = state.Todo;
    import RemoveEntry = actions.RemoveEntry;
    import Action = Redux.Action;

    function AddEntryReducer(state: Todos, action: AddEntry):Todos {
        return new Todos(state.todos.concat([new Todo(action.id, action.description)]));
    }

    function RemoveEntryReducer(state: Todos, action: RemoveEntry):Todos {
        return new Todos(state.todos.filter(t => t.id !== action.id));
    }


    export function TodosReducer(state: Todos, action: Action): Todos {
        switch(action.type) {
            case "AddEntry": return AddEntryReducer(state, <AddEntry>action);
            case "RemoveEntry": return RemoveEntryReducer(state, <RemoveEntry>action);
            case "@@redux/INIT": return new Todos([]);//ActionTypes.INIT
            default: throw new Error("Unsupported action type " + action);
        }
    }



}