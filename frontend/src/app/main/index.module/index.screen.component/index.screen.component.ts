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

  public ngOnInit() {}
}
