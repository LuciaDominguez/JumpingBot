import {Spawner} from './Spawner.js';

export class BuildingSpawner extends Spawner{
    
    constructor(owner, sceneRef, gameSceneRef , spawnPosition, gameObjects, interval,objectIntersect){
        super(owner, sceneRef, gameSceneRef , spawnPosition, interval);

        this.spawnableObjects = gameObjects;

        this.objectIntersect= objectIntersect;
    }

    iniciar(){
        this.spawnObject(
            Math.floor(Math.random() * this.spawnableObjects.length)
        );
    }

    spawnObject(i){
        let clon = this.spawnableObjects[i].clone();
        let edif = clon.getFirstComponentOfType('Edificio');
        if(edif){
            edif.mesh = edif.mesh.clone();
            edif.mesh.position.copy(this.spawnPosition);
            edif.iniciar();
            this.sceneRef.add(edif.mesh);
            this.objectIntersect.push(edif.mesh);
            this.gameSceneRef.push(clon);
            return true;
        }
        return false;
    }

    actualizar(deltaTime){
       this.accum += deltaTime;

       if(this.accum >= this.interval){
           this.spawnObject(
               Math.floor(Math.random() * this.spawnableObjects.length)
            );
           this.accum -= this.interval;
       }
    }
}