export namespace ExcessorWebGL {
  type RBAColor = [number, number, number, number];

  export interface ExcessorWebGLProgram extends WebGLProgram {
    attributeStack?: {[key: string]: GLint}
    uniformStack?: {[key: string]: WebGLUniformLocation}
  }

  export interface ExcessorWebGLBuffer extends WebGLBuffer {
    type?: GLenum;
    itemSize?: number;
  }

  export interface IDrawViewport {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface IDrawConstructorOptions {
    width?: number;
    height?: number;
    DOMObjectId?: string;
    clearColor?: RBAColor;
    viewport?: IDrawViewport;
  }

  export enum IDrawInitStatusesEnum {
    error = 'Error',
    success = 'Success',
  }

  export interface IDrawBufferOptions {
    itemSize?: number,
  }

  export enum IDrawBufferTypesEnum {
    ARRAY_BUFFER = 'ARRAY_BUFFER',
    ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER',
  }

  export enum IDrawRenderMethodsEnum {
    TRIANGLES = 'TRIANGLES',
  }

  export interface IDrawBindTextureSourceOptions {
    textureType?: GLenum;
    colorType?: GLenum;
    textureMagFilter?: GLenum;
    textureMinFilter?: GLenum;
    flip?: boolean;
  }

  export interface IDraw {
    canvas: HTMLCanvasElement;
    context: WebGLRenderingContext;
    clearColor: RBAColor;
    viewport: IDrawViewport;
    initStatus: IDrawInitStatusesEnum;
    buffers: {[key: string]: WebGLBuffer};
    programStack: {[key: string]: WebGLProgram};
    getShader(type: GLenum, source: string): WebGLShader
    getBuffer(
      bufferMap: number[],
      id?: string,
      options?: IDrawBufferOptions,
      bufferType?: IDrawBufferTypesEnum,
      dataType?: Float32ArrayConstructor | Uint16ArrayConstructor,
      drawType?: GLenum
    ): WebGLBuffer
    initShaderProgram(shaders: WebGLShader[], id?: string): WebGLProgram;
    attributeVariable(
      program: WebGLProgram,
      name: string,
      buffer: WebGLBuffer,
      itemSize: number,
      dataType?: GLenum,
    ): void;
    attachShaders(program: WebGLProgram, shaders: WebGLShader[]): void;
    render(
      bufferLength: number,
      clearColor?: RBAColor,
      viewport?: IDrawViewport,
      method?: IDrawRenderMethodsEnum,
      offset?: number,
    ): void;
    loadTexture(
      sourcePath: string,
      name: string,
      program: WebGLProgram,
      callback?: (texture: WebGLTexture, sourceImage: HTMLImageElement) => void
    ): void;
    createTexture(name: string, program: WebGLProgram): WebGLTexture;
    bindTextureSource(
      texture: WebGLTexture,
      sourceImage: HTMLImageElement,
      options?: IDrawBindTextureSourceOptions,
    ): void;
  }

  export class Draw implements IDraw {
    buffers: { [key: string]: ExcessorWebGLBuffer } = {};
    canvas: HTMLCanvasElement = document.createElement('canvas');
    clearColor: RBAColor;
    context: WebGLRenderingContext;
    initStatus: IDrawInitStatusesEnum;
    programStack: { [key: string]: ExcessorWebGLProgram } = {};
    viewport: IDrawViewport;

    constructor(options: IDrawConstructorOptions = {}) {
      this.canvas.width = options.width || 300;
      this.canvas.height = options.height || 150;
      this.canvas.id = options.DOMObjectId || Math.random().toString();
      this.clearColor = options.clearColor || [0,0,0,0.2];
      this.viewport = options.viewport || {
        x: 0,
        y: 0,
        width: options.width,
        height: options.height
      };

      try {
        this.context = (this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
      } catch (error) {
        logError(error);
      }

      if(!this.context) {
        logError('WebGL don`t support in your browser.');
        this.initStatus = IDrawInitStatusesEnum.error;
        return;
      } else {
        this.initStatus = IDrawInitStatusesEnum.success;
      }

      this.context.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
      this.context.clear(this.context.COLOR_BUFFER_BIT);
    }

    attachShaders(
      program: ExcessorWebGLProgram,
      shaders: WebGLShader[]
    ): void {
      shaders.forEach(shader => this.context.attachShader(program, shader));
    }

    attributeVariable(
      program: ExcessorWebGLProgram,
      name: string,
      buffer: ExcessorWebGLBuffer,
      itemSize: number,
      dataType?: number
    ): void {
      dataType = dataType || this.context.FLOAT;
      program.attributeStack[name] = this.context.getAttribLocation(program, name);
      this.context.enableVertexAttribArray(program.attributeStack[name]);
      this.context.bindBuffer(buffer.type, buffer);
      this.context.vertexAttribPointer(program.attributeStack[name], itemSize, dataType, false, 0, 0);
    }

    bindTextureSource(
      texture: WebGLTexture,
      sourceImage: HTMLImageElement,
      options?: IDrawBindTextureSourceOptions
    ): void {
      options = options || {};
      const context = this.context;
      const textureType = options.textureType || context.TEXTURE_2D;
      const colorType = options.colorType || context.RGBA;
      const textureMagFilter = options.textureMagFilter || context.LINEAR;
      const textureMinFilter = options.textureMinFilter || context.LINEAR;
      const flip = !!options.flip;

      context.bindTexture(textureType, texture);
      context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, flip as any);
      context.texImage2D(textureType, 0, colorType, colorType, context.UNSIGNED_BYTE, sourceImage);
      context.texParameteri(textureType, context.TEXTURE_MAG_FILTER, textureMagFilter);
      context.texParameteri(textureType, context.TEXTURE_MIN_FILTER, textureMinFilter);
    }

    createTexture(
      name: string,
      program: ExcessorWebGLProgram
    ): WebGLTexture {
      const context = this.context;
      const texture = context.createTexture();

      context.bindTexture(context.TEXTURE_2D, texture);
      program.uniformStack[name] = context.getUniformLocation(program, name);
      context.uniform1i(program.uniformStack[name], 0);
      return texture;
    }

    getBuffer(
      bufferMap: number[],
      id?: string,
      options?: IDrawBufferOptions,
      bufferType?: IDrawBufferTypesEnum,
      dataType?: Float32ArrayConstructor,
      drawType?: number
    ): ExcessorWebGLBuffer {
      id = id || Math.random().toString();
      bufferType = bufferType || IDrawBufferTypesEnum.ARRAY_BUFFER;
      const bufferGLEnumType  = this.context[bufferType];
      const dataTypeInstance = dataType && new dataType(bufferMap) ||  new Float32Array(bufferMap);
      drawType = drawType || this.context.STATIC_DRAW;
      options = options || {};
      const buffer: ExcessorWebGLBuffer = this.context.createBuffer();

      this.context.bindBuffer(bufferGLEnumType, buffer);
      this.context.bufferData(bufferGLEnumType, dataTypeInstance, drawType);

      for(const key in options) {
        buffer[key] = options[key];
      }

      buffer.type = bufferGLEnumType;
      this.buffers[id] = buffer;
      return buffer;
    }

    getShader(
      type: GLenum,
      source: string
    ): WebGLShader {
      const shader = this.context.createShader(type);
      this.context.shaderSource(shader, source);
      this.context.compileShader(shader);

      if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
        logError("Shader compilation error: " + this.context.getShaderInfoLog(shader));
        this.context.deleteShader(shader);
        return
      }
      return shader;
    }

    initShaderProgram(
      shaders: WebGLShader[],
      id?: string
    ): ExcessorWebGLProgram {
      id = id || Math.random().toString();
      const program: ExcessorWebGLProgram = this.context.createProgram();

      this.attachShaders(program, shaders);

      this.context.linkProgram(program);

      if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
        logError('Shader program linking error');
        return;
      }

      this.context.useProgram(program);

      program.attributeStack = {};
      program.uniformStack = {};
      this.programStack[id] = program;
      return program;
    }

    loadTexture(
      sourcePath: string,
      name: string,
      program: ExcessorWebGLProgram,
      callback?: (texture: WebGLTexture, sourceImage: HTMLImageElement) => void
    ): void {
      callback = callback || function(){};
      const sourceImage = new Image();

      sourceImage.onload = () => {
        const texture = this.createTexture(name, program);
        this.bindTextureSource(texture, sourceImage, {flip: true});
        callback(texture, sourceImage);
      };

      sourceImage.onerror = function () {
        logError('\tError of texture loading. \n\tTexture variable name: ' + name + ' \n\tPath of source image: ' + sourcePath);
      };

      sourceImage.src = sourcePath;
    }

    render(
      bufferLength: number,
      clearColor?: [number, number, number, number],
      viewport?: IDrawViewport,
      method?: IDrawRenderMethodsEnum,
      offset?: number
    ): void {
      const context = this.context;
      clearColor = clearColor || this.clearColor;
      viewport = viewport || this.viewport;
      method = method || IDrawRenderMethodsEnum.TRIANGLES;
      offset = offset || 0;

      context.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
      context.clear(context.COLOR_BUFFER_BIT || context.DEPTH_BUFFER_BIT);
      context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

      context.drawElements(context[method], bufferLength, context.UNSIGNED_SHORT, offset);
      //context.drawArrays(context[method], offset, bufferLength);
    }

  }

  const logError = (error: any) => {
    console.error('WebGL Error: \n', error);
  }
}
