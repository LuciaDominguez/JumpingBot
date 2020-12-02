import { Geometry, MeshLambertMaterial } from "../../../../libs/three.module.js";
import { Behaviour } from "./Behaviour.js";4
import * as THREE from "../../../../libs/three.module.js";
import {fragmentShader,vertexShader} from './Shader.js';

export class SueloCurvo extends Behaviour{

    constructor(owner, radio, slices, largo, texture, uvTilesX, uvTilesY,velocity){
        super(owner);

        this.radio      = radio;
        this.slices     = slices;
        this.largo      = largo;
        this.velocity   = velocity;

        let theta = -360.0 / slices;
        let geom = new Geometry();

        //calcular vertices
        for(let i = 0; i < slices+1 ; ++i){
            let v = new THREE.Vector3(-largo/2,0,radio);
            v.applyMatrix4(
                new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(1,0,0), THREE.Math.degToRad(theta * i)
                )
            );
    
            let v2 = v.clone();
            v2.x *= -1;
            
            geom.vertices.push(v, v2);
        }
        //crear indices de caras y uvs
        for(let n = 0; n < slices; n+=2){
            geom.faces.push(
                new THREE.Face3(n,n+1,n+3),
                new THREE.Face3(n, n+3, n+2)
            );
    
            let cn  = new THREE.Vector2(0, n/slices);
            let cn1 = new THREE.Vector2(1, n/slices);
            let cn2 = new THREE.Vector2(0, (n+2)/slices);
            let cn3 = new THREE.Vector2(1, (n+2)/slices);
    
            let tri1 = [cn, cn1, cn3];
            let tri2 = [cn, cn3, cn2];
    
            geom.faceVertexUvs[0].push(tri1,tri2);
        }
        
        geom.computeVertexNormals();

        //crear textura
        this.texture = texture;
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(uvTilesX,uvTilesY);

        var uniforms = {
            t_alb: { type: 't', value: this.texture },
            tiles: {value: 5},
            offset:{value:0}
        };

        this.offset = uniforms.offset;

        let material2 = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    
        //crear material
        let material = new THREE.MeshLambertMaterial({map:this.texture});
        
        //crear maya
        this.target = new THREE.Mesh(geom, material2);
        this.target.name = "sueloCurvo";
    }

    getMesh(target){
        if(!target){
            target = new THREE.Mesh();
        }
        target.copy(this.target);
        return target;
    }

    /** 
     * @method getY returns height at a certain z position
    *  @param {number} z the z coordinate
    *  @returns {number} the y coordinate found, returns 1000 if out of range
    */
    getY(z){
        if (z < -this.radio || z > this.radio)
            return -1000;

        let ca = Math.abs(0-z);

        let error = 0.9;

        return (Math.sqrt( this.radio*this.radio - ca*ca ) + this.target.position.y) - error;
    }

    /** 
     * @method  getRY returns rotation at a certain z position
    *  @param   {number} z the z coordinate
    *  @returns {number} the y coordinate found, returns 1000 if out of range
    */
    getRX(z){
        if (z < -this.radio || z > this.radio)
            return 0;
            let ca = -z;
        return Math.acos( ca/this.radio ) -  Math.PI/2;
    }

    iniciar(){

    }

    actualizar(deltaTime){
        //this.texture.offset.add(this.velocity.clone().multiplyScalar(deltaTime));
        this.offset.value+=deltaTime*0.6;
    }
}