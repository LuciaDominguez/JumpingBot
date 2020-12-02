import * as THREE from './../../libs/three.module.js';

import {loadFBX} from './../utils/FbxLoader.js';
import {loadOBJMTL} from './../utils/ObjMtlLoader.js';
import {loadGLTF} from './../utils/GLTFLoader.js';

import { Edificio }   from './Gameobject/Components/Edificio.js';
import {Obstacle} from './Gameobject/Components/Obstacle.js';
import { Skydome } from './Gameobject/Components/Skydome.js';
import { SueloCurvo } from './Gameobject/Components/SueloCurvo.js';

import { BuildingSpawner } from './Gameobject/Components/BuildingSpawner.js';
import { ObstacleSpawner} from './Gameobject/Components/ObstacleSpawner.js';
import { Particles} from './Gameobject/Components/Particles.js';

import { Player } from './Gameobject/Components/Player.js';
import { PlayerLight } from './GameObject/Components/PlayerLight.js';

import { GameObject } from './gameobject/gameobject.js';

const resource_path = function(path){return './../../../resources/'+path;};

const aspect_ratio = 1.77777;

/**
 * @class
 * @method constructor
 * @method run
 * @method stop
 */
class Game{

    constructor(){
        this.renderer    = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0.3,0.3,0.3));
        this.renderer.setSize(window.innerWidth, window.innerWidth/aspect_ratio);

        this.scene       = new THREE.Scene();
        this.camera      = new THREE.PerspectiveCamera(45, aspect_ratio, 0.1, 1000);
        this.gameObjects = new Array();

        this.rayCaster = new THREE.Raycaster();
        this.rayCaster.far=0.2;
        
        this.objetosColision= new Array();

        this.sound = null;
        this.isPlayer2=false;

        this.stopGame = false;
        this.paused   = false;

        this.points1 = 0;
        this.points2 = 0;

      
        this.particle = new Particles(resource_path('textures/drop.png'));

        this.objectsMap = new Map();
        this.clock = new THREE.Clock();

        this.interval=0.1;
        this.minTime=0.11;
        this.maxTime=0.15;
      
        window.addEventListener('resize', ()=>{
            this.renderer.setSize(window.innerWidth, window.innerWidth/aspect_ratio);
        })

        this.handler = this.handler.bind(this);

        this.pause=this.pause.bind(this);
        window.addEventListener('keyup',this.pause);
    }
    
    handler(buffer){
        this.sound.setBuffer( buffer );
        this.sound.setLoop( true );
        this.sound.setVolume( 0.5 );
        this.sound.play();
    }

    playAudio(){
        const listener = new THREE.AudioListener();
        this.camera.add( listener );

        // create a global audio source
        this.sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( resource_path('audio/williamrosati.mp3'), this.handler);
    }    

    stopAudio(){
        if(!this.sound || !this.sound.isPlaying)
            return;
        
        this.sound.stop();
    }

    modo(modo){
        if(modo==1){
            this.interval=0.5;
            this.minTime=0.15;
            this.maxTime=0.20;
            console.log('facil');
        }
        else if(modo==2){
            this.interval=0.1;
            this.minTime=0.11;
            this.maxTime=0.15;
            console.log('normal');
        }
        else if(modo==3){
                this.interval=0.05;
                this.minTime=0.09;
                this.maxTime=0.11;
                console.log('dificil');
        }

    }

    twoPlayer(){
        this.isPlayer2=true;
    }
    
    async run(){
        let tl = new THREE.TextureLoader();

        ///CARGA DE TEXTURAS
        this.objectsMap['textura_skydome'] = tl.load(resource_path('textures/raining-sky.jpg'));
        this.objectsMap['textura_suelo']   = tl.load(resource_path('textures/floor.jpg'));

        this.camera.position.set(0,80,100);
        this.camera.lookAt(0,80,0);

        let jb1 = await loadOBJMTL(resource_path('models/JBuilding1/JB1f.obj'),resource_path('models/JBuilding1/JB1f.mtl'));
        this.objectsMap['jb1'] = jb1.children[0];

        let ldr = await loadFBX(resource_path('models/OrangeBot_FBX/OrangeBOT_FBX.fbx'));

        this.objectsMap['ldr'] = ldr;

        let ldr2 = await loadFBX(resource_path('models/OrangeBot_FBX/OrangeBOT_FBX.fbx'));

        this.objectsMap['ldr2'] = ldr2;
        
        let box = await loadFBX(resource_path('models/ABox/box.fbx'));

        this.objectsMap['box'] = box;

        let ambient = new THREE.AmbientLight(0xBBBBBB,0.5);

        let dir = new THREE.DirectionalLight(0x999999, 1);
        dir.position.set(0,10,10);

        this.scene.add(ambient);
        this.scene.add(dir);
        this.scene.add(this.particle.particleSystem);

        
        this.load();
    }

    load(){
        let sueloCurvo = new GameObject();
    
        let sueloCurvoComp  = new SueloCurvo(
            sueloCurvo,                             //owner
            80,                                     //radio
            32,                                     //slices
            120,                                     //length
            this.objectsMap['textura_suelo'] ,      //texture path
            3,3,                                    //uv tiles xy
            new THREE.Vector2(0,-1)                 //texture offset speed
        );
        let sueloCurvoMesh = sueloCurvoComp.getMesh();
        sueloCurvo.addComponent(sueloCurvoComp);
        this.scene.add(sueloCurvoMesh);

        let jb1GameObjectRIGHT = new GameObject();
        let jb1mesh = this.objectsMap['jb1'].clone();
        jb1mesh.scale.set(1.3,1.3,1.3);
        jb1mesh.rotation.y = -Math.PI/2;
        let edificioComp = new Edificio(
            jb1GameObjectRIGHT,//owner
            jb1mesh,
            sueloCurvoComp,
            20
        );
        jb1GameObjectRIGHT.addComponent(edificioComp);

        
        let jb1GameObjectLEFT = new GameObject();
        let jb1mesh2 = this.objectsMap['jb1'].clone();
        jb1mesh2.scale.set(1.3,1.3,1.3);
        jb1mesh2.rotation.y = Math.PI/2;
        let edificioComp2 = new Edificio(
            jb1GameObjectLEFT,//owner
            jb1mesh2,
            sueloCurvoComp,
            20
        );
        jb1GameObjectLEFT.addComponent(edificioComp2);
   

        let boxObstacle = new GameObject();
        let boxMesh = this.objectsMap['box'].clone();
        boxMesh.scale.set(0.5,0.5,0.5);
        let obstacleComp = new Obstacle(
            boxObstacle,//owner
            boxMesh,
            sueloCurvoComp,
            20
        );
        boxObstacle.addComponent(obstacleComp);


        let spawnersGO = new GameObject();
        let spawnerComp1 = new BuildingSpawner(
            spawnersGO,
            this.scene,
            this.gameObjects,
            new THREE.Vector3(50,0,0),
            [jb1GameObjectRIGHT],
            1.3,
            this.objetosColision
        );
        let spawnerComp2 = new BuildingSpawner(
            spawnersGO,
            this.scene,
            this.gameObjects,
            new THREE.Vector3(-50,0,0),
            [jb1GameObjectLEFT],
            1.3,
            this.objetosColision
        );
        let spawnerCompObtaculos = new ObstacleSpawner(
            spawnersGO,
            this.scene,
            this.gameObjects,
            new THREE.Vector3(0,0,30),
            [boxObstacle ],
            this.interval,
            60,
            this.minTime,
            this.maxTime,
            this.objetosColision
        );
        spawnersGO.addComponent(spawnerComp1);
        spawnersGO.addComponent(spawnerComp2);
        spawnersGO.addComponent(spawnerCompObtaculos);

        let skydomeGO = new GameObject();
        let skydomeComponent = new Skydome(
            skydomeGO,
            this.camera,
            300,
            32,
            32,
            this.objectsMap['textura_skydome'],
            0.01,
            new THREE.Vector3(0,1,0)
        );
        skydomeGO.addComponent(skydomeComponent);
        this.scene.add(skydomeComponent.getMesh());

        let playerGO = new GameObject();
        this.playerMesh =  this.objectsMap['ldr'] ;
        this.playerMesh.scale.set(0.5,0.5,0.5);

        let playerComp = new Player(
            playerGO,
            this.playerMesh,
            sueloCurvoComp,
            null,
            'A','D','W'
        );

        this.playerMesh.rayos=
		[
			new THREE.Vector3(0,0,1),
			new THREE.Vector3(0,0,-1),
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(-1,0,0)
        ];

        let player2GO = new GameObject();
        this.player2Mesh =  this.objectsMap['ldr2'] ;
        this.player2Mesh.scale.set(0.5,0.5,0.5);

        let player2Comp = new Player(
            player2GO,
            this.player2Mesh,
            sueloCurvoComp,
            null,
            'J','L','I'
        );

        this.player2Mesh.rayos=
		[
			new THREE.Vector3(0,0,1),
			new THREE.Vector3(0,0,-1),
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(-1,0,0)
        ];

        let pointLight = new THREE.PointLight(0xBBBBBB, 1, 10);
        let playerLightComp = new PlayerLight(
            playerGO,
            this.playerMesh,
            pointLight,
            new THREE.Vector3(0,5,0)
        );

        let point2Light = new THREE.PointLight(0xBBBBBB, 1, 10);
        let player2LightComp = new PlayerLight(
            player2GO,
            this.player2Mesh,
            pointLight,
            new THREE.Vector3(0,5,0)
        );

        this.scene.add(this.playerMesh);
        if(this.isPlayer2==true){
            this.scene.add(this.player2Mesh);
        }
        //this.scene.add(pointLight);
        playerGO.addComponent(playerComp);
        playerGO.addComponent(playerLightComp);

        player2GO.addComponent(player2Comp);
        player2GO.addComponent(player2LightComp);
        

        this.gameObjects.push(
            sueloCurvo,
            skydomeGO,
            spawnersGO,
            playerGO,
            player2GO
        );

        this.iniciar();

        var that = this;
        requestAnimationFrame(()=>{that.gameloop()});
    }

    iniciar(){
        this.gameObjects.forEach(gameObject=>gameObject.iniciar());
    }

    actualizar(deltaTime){
        this.gameObjects.forEach(gameObject=>gameObject.actualizar(deltaTime));
        this.particle.particleSystem.position.y -= deltaTime;
        for(var i=0; i< this.playerMesh.rayos.length; i++){
            var rayo = this.playerMesh.rayos[i];

            //1. Desde que punto va ser lanzado el vector
            //2. Vector
            this.rayCaster.set(this.playerMesh.position.clone().add(new THREE.Vector3(0,1,0)),rayo);

            var colisiones = this.rayCaster.intersectObjects(this.objetosColision, true);

            if (colisiones.length > 0 ) {
                this.stopGame=true;
                $(".game-over").css({
                    visibility:"visible"
                });
                $(".game-player1").css({
                    visibility: 'hidden'
                })
                $(".game-player2").css({
                    visibility: 'hidden'
                })
                    $("#2-player").append("<h2 class='game-puntuation text-center'>Jugador 1:</h2><br><h3 id='puntuacion-numero1' class='game-puntuation text-center'>"+this.points1+"</h3>");

                if(this.isPlayer2==true){
                    $("#2-player").append("<h2 class='game-puntuation text-center'>Jugador 2:</h2><br><h3 id='puntuacion-numero2' class='game-puntuation text-center'>"+this.points2+"</h3>");
                }
                    $("#puntuacion-cont").append("<input type='number' name='puntuacion' id='puntuacion' class='data-facebook' value="+this.points1+" readonly>");   
            }
            else{
                this.points1+=1;

                document.getElementById("puntaje1").innerHTML = 'Jugador 1:'+this.points1;
            }
        }
        if(this.isPlayer2==true){
            for(var i=0; i< this.player2Mesh.rayos.length; i++){
                var rayo = this.player2Mesh.rayos[i];
    
                //1. Desde que punto va ser lanzado el vector
                //2. Vector
                this.rayCaster.set(this.player2Mesh.position.clone().add(new THREE.Vector3(0,1,0)),rayo);
    
                var colisiones = this.rayCaster.intersectObjects(this.objetosColision, true);
    
                if (colisiones.length > 0 ) {
                    this.stopGame=true;
                    $(".game-over").css({
                        visibility:"visible"
                    });
                    $(".game-player1").css({
                        visibility: 'hidden'
                    })
                    $(".game-player2").css({
                        visibility: 'hidden'
                    })
                    $("#2-player").append("<h2 class='game-puntuation text-center'>Jugador 1:</h2><br><h3 id='puntuacion-numero1' class='game-puntuation text-center'>"+this.points1+"</h3>");
                    $("#2-player").append("<h2 class='game-puntuation text-center'>Jugador 2:</h2><br><h3 id='puntuacion-numero2' class='game-puntuation text-center'>"+this.points2+"</h3>");
                    $("#puntuacion-cont").append("<input type='number' name='puntuacion' id='puntuacion' class='data-facebook' value="+this.points1+" readonly>");         
                }
                else{       
                    this.points2+=1;
                    document.getElementById("puntaje2").innerHTML = 'Jugador 2:'+this.points2;
                }
            }
        }
       
    }

    stop(){
      
    }

    pause(e){
        
        if(e.key=="p"){
            this.paused=!this.paused;
            if(this.paused==true){
                $(".pause-game").css({
                    visibility:"visible"
                    
                })
            }
            else{
                $(".pause-game").css({
                    visibility:"hidden"
                    
                })
            }  
        }
    }

    gameloop(){

        if(!this.stopGame){
            let dt = this.clock.getDelta();

            if(!this.paused){
                this.actualizar(dt);

                this.renderer.render(this.scene, this.camera);
            }
            var that = this;
            requestAnimationFrame(()=>{that.gameloop()});
        }
        else{
            stop();
        }
    }
}

export{Game}