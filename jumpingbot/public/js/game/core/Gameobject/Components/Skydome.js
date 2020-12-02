import { Behaviour } from "./Behaviour.js";
import * as THREE from "../../../../libs/three.module.js";

export class Skydome extends Behaviour{

    constructor(owner,camera, radio, slices, stacks, texture, speed, axis){
        super(owner)
        
        this.camera = camera;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        this.mesh =  new THREE.Mesh(
            new THREE.SphereGeometry(radio, slices, stacks), new THREE.MeshBasicMaterial({map:texture, side:THREE.BackSide})
        );
        this.axis = axis;
        this.speed = speed;
    }

    getMesh(target){
        if(!target){
            target = new THREE.Mesh();
        }
        target.copy(this.mesh);
        return target;
    }

    iniciar(){

    }

    actualizar(deltaTime){
        //this.mesh.position.copy(this.camera.position);
        this.mesh.material.map.offset.x -= this.speed * deltaTime;
    }
}