import {Component, ElementRef, ViewChild} from '@angular/core';
import {ExcessorWebGL} from 'app/models/excessorWebGL.namespace';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index-screen',
  templateUrl: './index.screen.component.html',
  styleUrls: ['./index.screen.component.scss']
})
export class IndexScreenComponent {
  @ViewChild('canvasContainer') private canvasContainer: ElementRef;
  private draw: ExcessorWebGL.IDraw = new ExcessorWebGL.Draw({
    width: 500,
    height: 500,
    clearColor: [255, 255, 255, 1],
  });

  constructor (private http: HttpClient) {}

  public ngOnInit() {
    if (this.draw.initStatus === 'Error') {
      alert('Error of WebGL initialization. \nSee more in console.');
      return;
    }
    Promise.all<string>([
      this.loadShader('perceptron', 'vertex'),
      this.loadShader('perceptron', 'fragment'),
    ]).then(shadersSources => this.initProgram(shadersSources));
  }

  public loadShader(name: string, type: 'vertex' | 'fragment'): Promise<string> {
    const extension = type === 'vertex' ? 'vshader' : 'fshader';
    return this.http.get(`/assets/shaders/${name}.${extension}`, {responseType: 'text'}).toPromise();
  }

  private initProgram(shadersSources: string[]) {
    const shaders = [
      this.draw.getShader(this.draw.context.VERTEX_SHADER, shadersSources[0]),
      this.draw.getShader(this.draw.context.FRAGMENT_SHADER, shadersSources[1]),
    ];
    const program = this.draw.initShaderProgram(shaders);
    const vertexBufferMap = [
      1, 1, 0,
      -1, 1, 0,
      1, -1, 0,
      -1, -1, 0
    ];
    const vertexBuffer: ExcessorWebGL.ExcessorWebGLBuffer = this.draw.getBuffer(vertexBufferMap, 'vertexBuffer', {itemSize: 3});
    this.draw.attributeVariable(program, 'aVertexPosition', vertexBuffer, vertexBuffer.itemSize);

    const textureBufferMap = [
      0, 0,
      1, 0,
      1, 1,
      0, 1
    ];
    const textureBuffer: ExcessorWebGL.ExcessorWebGLBuffer = this.draw.getBuffer(textureBufferMap, 'textureBuffer', {itemSize: 2});
    this.draw.attributeVariable(program, 'aTexturePosition', textureBuffer, textureBuffer.itemSize);

    const indexBufferMap = [
      0, 1, 2,
      0, 2, 3
    ];
    const indexBuffer: ExcessorWebGL.ExcessorWebGLBuffer = this.draw.getBuffer(
      indexBufferMap,
      'indexBuffer',
      null,
      ExcessorWebGL.IDrawBufferTypesEnum.ELEMENT_ARRAY_BUFFER,
      Uint16Array
    );

    this.draw.loadTexture(
      '/assets/images/someTexture.png',
      'someTexture',
      program,
      () => this.draw.render(6)
    );

    this.canvasContainer.nativeElement.appendChild(this.draw.canvas);
  };
}
