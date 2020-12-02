import {Component} from "./Component.js"
/**
 * @class
 * @abstract
 */
export class Behaviour extends Component{
    constructor(gameObject){
        super(gameObject);
        
        if (this.constructor == Behaviour) {
            throw new Error("Behaviour: Abstract classes can't be instantiated.");
        }

        /**
         * @member {boolean} isBehaviour
         */
        
        this.isBehaviour = true;
    }

    iniciar(){
        throw new Error("Behaviour.iniciar: Abstract method can't be called.");
    }

    actualizar(deltaTime){
        throw new Error("Behaviour.actualizar: Abstract method can't be called.");
    }
}