import * as THREE from './../../libs/three.module.js';

class Audio{

    constructor(audio, camera){
        this.audio=audio;
        this.camera=camera;

    }


    loadAudio(){
        this.listener = new THREE.AudioListener();
        this.sound = new THREE.Audio( this.listener );
        this.camera.add( this.listener );
        this.audioLoader = new THREE.AudioLoader();
        this.handler=this.handler.bind(this);
        this.audioLoader.load( this.audio, this.handler);
    }   

    handler(buffer){
        this.sound.setBuffer( buffer );
        this.sound.setLoop( true );
        this.sound.setVolume( 1.0 );
        this.sound.connect();
    }
    
    playAudio(){
       
        this.sound.play();

    }

    stopAudio(){
        this.sound.stop();
    }
   
}

export{Audio}