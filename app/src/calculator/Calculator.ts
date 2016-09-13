///<reference path="Sumator.ts"/>

namespace calculator {

    export class Calculator {

        static sum(a: number, b: number): number {
            return Sumator.sum(a, b);
        }

    }

}
