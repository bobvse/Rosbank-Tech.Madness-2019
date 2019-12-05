import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  private _userPhoto: string;
  public sanitizedImage: SafeStyle;
  @Input() get userPhoto (): string {
    return this._userPhoto;
  }
  set image (value: string) {
    this._userPhoto = value;
    this.sanitizedImage = this.sanitizer.bypassSecurityTrustStyle('url(' + value + ')');
  }
  constructor (
    public sanitizer: DomSanitizer
  ) {}
}
