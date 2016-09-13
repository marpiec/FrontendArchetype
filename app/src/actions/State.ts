namespace state {

    export class Todo {
        id: number;
        description: string;
        
        constructor(id:number, description:string) {
            this.id = id;
            this.description = description;
        }
    }

    export class Todos {
        todos: Array<Todo>;
        
        constructor(todos:Array<Todo>) {
            this.todos = todos;
        }
    }



}