import {Behaviour} from './Behaviour.js';
import {keyState} from './../../Inputs.js';

export class PlayerLight extends Behaviour{

    constructor(owner, playerMesh, LightRef, offset){
        super(owner);
        this.playerMesh = playerMesh;
        this.LightRef = LightRef;
        this.offset =offset;
    }

    iniciar(){
    }

    actualizar(deltaTime){
        let playerpos = this.playerMesh.position.clone();
        playerpos.add(this.offset);
        this.LightRef.position.copy(playerpos);

    }
}