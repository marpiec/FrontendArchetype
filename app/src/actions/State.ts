namespace state {

    export class Todo {
        constructor(public id:number, public description:string) {}
    }

    export class Todos {
        constructor(public todos:Array<Todo>) {}
    }



}