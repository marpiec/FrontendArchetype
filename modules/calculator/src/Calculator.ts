/// ///<reference path="Sumator.ts"/>

namespace __Calculator {
    export class Calculator {

        static sum(a: number, b: number) {
            return Sumator.sum(a, b);
        }

    }
    
}


module "calculator" {
    export = __Calculator;
}

