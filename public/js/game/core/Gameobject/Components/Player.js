import {Behaviour} from './Behaviour.js';
import {keyState} from './../../Inputs.js';

export class Player extends Behaviour{

    constructor(owner,meshRef,sueloRef, animattionMixer, left,right,jump){
        super(owner);
        this.meshRef = meshRef;
        this.sueloRef = sueloRef;
        this.animattionMixer = animattionMixer;
        this.left =left;
        this.right = right;
        this.jump=jump;
        this.limitAccum =0;
        this.isLimit=false;
    }

    iniciar(){
        this.meshRef.position.z = 20;
    }

    actualizar(deltaTime){

        let speed = 15;
        let limite=15;
        

        this.meshRef.position.y = this.sueloRef.getY(this.meshRef.position.z);
        this.meshRef.rotation.x  = this.sueloRef.getRX(this.meshRef.position.z);
        //Manejar Inputs y checar colision
        if(keyState(this.right.charCodeAt(0)) ){
            this.meshRef.position.x+= 15*deltaTime;
        }
        else if(keyState(this.left.charCodeAt(0)) ){
            this.meshRef.position.x-= 15*deltaTime;
        }
        if (keyState(this.jump.charCodeAt(0))){
            if(this.limitAccum<limite && !this.isLimit){
                    this.limitAccum+=speed*deltaTime;      
            }
            else{
                this.limitAccum-=speed*deltaTime;
                this.isLimit=true;
            }
            if(this.limitAccum<0){
                this.isLimit= false;
                this.limitAccum=0;
            }
            this.meshRef.position.y+=this.limitAccum; 
        }
        else{
            this.limitAccum-=speed*deltaTime;
            if(this.limitAccum<0){
                this.isLimit=false;
                this.limitAccum=0;
            }
            this.meshRef.position.y+=this.limitAccum; 
        }

    }
}