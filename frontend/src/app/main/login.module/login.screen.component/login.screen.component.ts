import {Component} from '@angular/core';
import {AppConfigEnum, ConfigService} from 'app/services/config.service';
import {Router} from '@angular/router';
import {BackendService} from 'app/services/backend.service';
import {NotifyService} from 'app/services/notify.service';
import {IUserModel} from 'app/models/IUser.model';

@Component({
    selector: 'app-login-screen',
    templateUrl: './login.screen.component.html',
    styleUrls: ['./login.screen.component.scss']
})
export class LoginScreenComponent {
    public login: string;
    public password: string;
    constructor(
        private router: Router,
        private configService: ConfigService,
        private backendService: BackendService,
        private notify: NotifyService,
    ) {}

    public ngOnInit() {
        if (this.configService.get(AppConfigEnum.Login)) {
            this.router.navigate(['/documents']).then()
        }
    }

    public auth() {
        this.backendService.get<IUserModel>(`User/${this.login}`)
            .then(response => {
                this.configService.set(AppConfigEnum.Login, this.login);
                this.router.navigate(['/documents']).then()
            })
            .catch(error => this.notify.show('Ошибка авторизации', 'error'));
    }
}
