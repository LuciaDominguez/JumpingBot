import {Behaviour} from './Behaviour.js'

export class Obstacle extends Behaviour{

    constructor(gameObject, mesh, suelo, speed){
        super(gameObject);

        this.mesh = mesh;
        this.suelo = suelo;
        this.speed = speed;
        this.isObstacle = true;
    }

    iniciar(){
        this.mesh.position.z = 70;
    }

    actualizar(deltaTime){
        this.mesh.position.z -= this.speed*deltaTime;
        this.mesh.position.y  = this.suelo.getY (this.mesh.position.z);
        this.mesh.rotation.x  = this.suelo.getRX(this.mesh.position.z);
    }
}