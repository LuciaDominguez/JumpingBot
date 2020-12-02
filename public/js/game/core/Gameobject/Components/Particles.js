import * as THREE from "../../../../libs/three.module.js";


class Particles{
    constructor(texture){
        this.texture=texture;
        this.particles = new THREE.Geometry;
        this.particleTexture = new THREE.TextureLoader().load(this.texture);
        this.particleMaterial = new THREE.PointsMaterial({ map: this.particleTexture, transparent: true, size: 5 });
		this.particleSystem = new THREE.Points(this.particleVertx(), this.particleMaterial);

    }

    particleVertx(){
        for (var p = 0; p < 5000; p++) {
            this.particleV = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
            this.particles.vertices.push(this.particleV);
        }

        return this.particles;
    }

}

export {Particles}