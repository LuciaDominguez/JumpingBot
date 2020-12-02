import {GLTFLoader} from './../../libs/GLTFLoader.js';

var gltfLoader  = new GLTFLoader();

function loadGLTF(path){
    return new Promise((resolve, reject)=>{
        gltfLoader.load( path, function(object){
            resolve(object);
        },
        progress =>{}, 
        err=>{
            reject(err);
        });
    });
}

export{loadGLTF};