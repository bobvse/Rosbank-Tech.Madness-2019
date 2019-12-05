attribute vec3 aVertexPosition;
attribute vec2 aTexturePosition;
varying vec2 vTextureCoords;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vTextureCoords = aTexturePosition;
}
