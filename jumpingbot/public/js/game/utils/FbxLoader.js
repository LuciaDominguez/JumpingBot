import {FBXLoader} from './../../libs/FBXLoader.js';

var fbxLoader  = new FBXLoader();

function loadFBX(path){
    return new Promise((resolve, reject)=>{
        fbxLoader.load( path, function(object){
            resolve(object);
        },
        progress =>{}, 
        err=>{
            reject(err);
        });
    });
}

export{loadFBX};