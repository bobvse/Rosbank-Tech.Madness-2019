import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {AppConfigEnum, ConfigService} from 'app/services/config.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
    private _userPhoto: string;
    public sanitizedImage: SafeStyle;

    @Input() get userPhoto(): string {
        return this._userPhoto;
    }

    set image(value: string) {
        this._userPhoto = value;
        this.sanitizedImage = this.sanitizer.bypassSecurityTrustStyle('url(' + value + ')');
    }

    constructor(
        public sanitizer: DomSanitizer,
        private configService: ConfigService,
        private router: Router,
    ) {}

    public logout() {
        this.configService.set(AppConfigEnum.Login, null);
        this.router.navigate(['/login']).then();
    }
}
