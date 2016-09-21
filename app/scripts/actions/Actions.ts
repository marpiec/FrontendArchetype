namespace actions {

    import Action = Redux.Action;
    
    export class AddEntry implements Action {
        type = "AddEntry";

        constructor(public id: number, public description:string) {}
    }


    export class RemoveEntry implements Action {
        type = "RemoveEntry";

        constructor(public id: number) {}
    }


}