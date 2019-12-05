precision highp float;
uniform sampler2D someTexture;
varying vec2 vTextureCoords;
void main(void) {
    vec2 textureCorrelation = vec2(vTextureCoords.x * 1.0, vTextureCoords.y * 1.0);
    gl_FragColor = texture2D(someTexture, textureCorrelation);
}
