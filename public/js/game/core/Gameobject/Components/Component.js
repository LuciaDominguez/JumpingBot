import {GameObject} from './../Gameobject.js';

/**
 * @class
 * @abstract
 */
export class Component{
    /**
     * 
     * @param {GameObject} gameObject 
     */
    constructor(gameObject){

        if (this.constructor == Component) {
            throw new Error("Component: Abstract classes can't be instantiated.");
        }

        /**
         * @member {GameObject} gameObject
         */
        this.gameObject = gameObject;

        /**
         * @member {boolean} isComponent
         */
        this.isComponent = true;
    }

    clone(){
        let Component = new (this.constructor);

        Object.assign(Component, this);

        return Component;
    }
}