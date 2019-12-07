import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
    @Output() public searchChange = new EventEmitter();
    @Input() public title: string;
    @Input() public status: string;
    @Input() public statusSubscribe: string;
    @Input() public backUrl: string;
    private _search: string;
    @Input()
    public get search() {
        return this._search;
    }
    public set search(value: string) {
        this._search = value;
        this.searchChange.emit(value);
    }
    private routerSubscription: Subscription;
    public goBackIsVisible: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    public ngOnInit () {
        this.goBackIsVisible = /^\/.+\/.+/.test(this.router.url);
        this.routerSubscription = this.router.events.subscribe((event: ResolveEnd) => {
            if (event instanceof ResolveEnd) {
                this.goBackIsVisible = /^\/.+\/.+/.test(event.url);
            }
        });
    }

    public ngOnDestroy () {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    public goBack() {
        this.router.navigate([(this.backUrl || '..')], {relativeTo: this.route});
    }
}
