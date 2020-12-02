import {Spawner} from './Spawner.js';

export class ObstacleSpawner extends Spawner{
    
    constructor(owner, sceneRef, gameSceneRef , spawnPosition, gameObjects, interval, rangeX, minTime, maxTime, objectIntersect){
        super(owner, sceneRef, gameSceneRef , spawnPosition, interval);

        this.spawnableObjects = gameObjects;
        this.rangeX = rangeX;

        this.objectIntersect= objectIntersect;

        this.minTime = minTime;
        this.maxTime = maxTime;

        this.accum2 = 0;
        this.delay= 2;
    }

    iniciar(){
        
    }

    spawnObject(i){
        let clon = this.spawnableObjects[i].clone();
        let obst = clon.getFirstComponentOfType('Obstacle');
        if(obst){
            obst.mesh = obst.mesh.clone();
            obst.mesh.position.copy(this.spawnPosition);
            obst.iniciar();
            this.sceneRef.add(obst.mesh);
            this.objectIntersect.push(obst.mesh);
            this.gameSceneRef.push(clon);
            return true;
        }
        return false;
    }

    actualizar(deltaTime){
       this.accum2+= deltaTime;
        if(this.accum2>=this.delay){

           this.accum += deltaTime;

           if(this.accum >= this.interval){

            this.spawnPosition.x = randomRange(-this.rangeX/2, this.rangeX /2);

            this.interval = randomRange(this.minTime, this.maxTime);

            this.spawnObject(
                Math.floor(Math.random() * this.spawnableObjects.length)
             );

            this.accum -= this.interval;
           }
        }
    }
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
