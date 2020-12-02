import {Component} from './Components/Component.js';

export class GameObject{
    constructor(){
        this.components = [];
    }

    iniciar(){
        if(this.components.length > 0)
        {
            this.components.forEach(comp=>{
                if(comp.isBehaviour)
                    comp.iniciar();
            })
        }
    }

    actualizar(deltaTime){
        if(this.components.length > 0)
        {
            this.components.forEach(comp=>{
                if(comp.isBehaviour)
                    comp.actualizar(deltaTime);
            })
        }
    }

    /**
     * @param {Component} comp 
     */
    addComponent(comp){
        if(comp.isComponent)
            this.components.push(comp);
    }

    getFirstComponentOfType(type){
        let result = null;

        for(let i = 0; i < this.components.length; i++){
            if( this.components[i]["is"+type]){
                result = i;
            }
        }
        
        if(result === null)
            return null;
        
        return this.components[result];
    }

    clone(){
        let clone = new GameObject();
        
        this.components.forEach((elem,i)=>{
            clone.components.push(elem.clone());
        })

        return clone;
    }
}