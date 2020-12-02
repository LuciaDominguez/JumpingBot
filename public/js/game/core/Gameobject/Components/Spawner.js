import {Behaviour} from './Behaviour.js';

export class Spawner extends Behaviour{

    constructor(owner, sceneRef, gameSceneRef , spawnPosition, interval){
        super(owner);

        this.sceneRef = sceneRef;
        this.gameSceneRef = gameSceneRef;
        this.spawnPosition = spawnPosition;
        this.interval = interval;
        this.accum = 0;
    }

    iniciar(){
        throw new Error("Spawner.iniciar: Abstract method can't be called.");
    }

    spawnObject(i){

        throw new Error("Spawner.spawnObject: Abstract method can't be called.");
    }

    actualizar(deltaTime){
        throw new Error("Spawner.actualizar: Abstract method can't be called.");
    }
}