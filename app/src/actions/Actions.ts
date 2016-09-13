namespace actions {

    import Action = Redux.Action;
    
    export class AddEntry implements Action {
        type = "AddEntry";
        id: number;
        description: string;

        constructor(id: number, description:string) {
            this.id = id;
            this.description = description;
        }
    }


    export class RemoveEntry implements Action {
        type = "RemoveEntry";
        id: number;

        constructor(id: number) {
            this.id = id;
        }
    }


}