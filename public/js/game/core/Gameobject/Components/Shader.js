var vertexShader=`varying vec2 vUV;

void main() {
  vUV = uv;
  vec4 pos = vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * pos;
}`

var fragmentShader=
`uniform sampler2D t_alb;
uniform float tiles;
uniform float offset;
varying vec2 vUV;

void main() {
    vec2 uvFinal = vUV*tiles;
    uvFinal=vec2(uvFinal.x,uvFinal.y-offset);

  vec4 texel = texture2D(t_alb, uvFinal);
  gl_FragColor = vec4(texel.xyz, texel.w);
}`

export{fragmentShader,vertexShader}

/*
Typeorm 
SHADERS ok
MODOS  ok
COLISIONES ok
PAUSA ok
LOCALSTORAGE ok
 */