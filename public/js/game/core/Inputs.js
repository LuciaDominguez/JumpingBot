var inputs = [];
for(var i=0; i<256; i++){
    inputs.push(false);
}

function keydown(e){
    inputs[e.keyCode] = true;
}
function keyup(e){
    inputs[e.keyCode] = false;
}

window.addEventListener("keydown",keydown);
window.addEventListener("keyup"  ,keyup  );

function keyState(keycode){
    return inputs[keycode];
}

export {
    keyState
};