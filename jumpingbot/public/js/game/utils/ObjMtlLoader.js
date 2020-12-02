import {OBJLoader} from './../../libs/OBJLoader.js';
import {MTLLoader} from './../../libs/MTLLoader.js';

var objLoader  = new OBJLoader();
var mtlLoader  = new MTLLoader();

function loadOBJMTL(pathOBJ,pathMTL){
    return new Promise((resolve, reject)=>{//resolve
        mtlLoader.load(pathMTL, materials=>{
            objLoader.setMaterials(materials);
            objLoader.load(pathOBJ, 
                obj=>{resolve(obj)},
                progress=>{},
                err=>{reject(err)});
        },
        //progress
            progress=>{},
        //reject
            err=>{reject(err)}
        );
    });
}
export{loadOBJMTL}