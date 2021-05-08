import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

const size = 600;

const canvas = document.querySelector('canvas');
canvas.width = canvas.height = size;

const gl = canvas.getContext('webgl', { antialias: true });

gl.viewport(0, 0, size, size);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertex);
gl.shaderSource(fragmentShader, fragment);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.log('vertex compile error',  gl.getShaderInfoLog(vertexShader));
}

gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.log('fragment compile error', gl.getShaderInfoLog(fragmentShader));
}

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.validateProgram(program);

if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  console.log('program validation error', gl.getProgramInfoLog(program));
}



const vertextBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertextBuffer);

const vertexArray = [
  // X      Y    R    G    B
    0.0,  0.5,    0.5, 0.5, 0.5, 
    0.5, -0.5,    0.5, 0.5, 0.5,
   -0.5, -0.5,    0.5, 0.5, 0.1
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);

const posAttributeLocation = gl.getAttribLocation(program, 'vertexPosition');
gl.vertexAttribPointer(
  posAttributeLocation,
  2,
  gl.FLOAT,
  false,
  5 * Float32Array.BYTES_PER_ELEMENT,
  0 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(posAttributeLocation);

const colorAttributeLocation = gl.getAttribLocation(program, 'vertexColor');
gl.vertexAttribPointer(
  colorAttributeLocation,
  3,
  gl.FLOAT,
  false,
  5 * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(colorAttributeLocation);

gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);