import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

export type HeaderConfig = {
    showMenu: boolean,
    background: HeaderBackground
}

export enum HeaderBackground {
    SHOW = 'show',
    BLEND_IN_ON_SCROLL = 'blend-in-on-scroll',
    TRANSPARENT = 'transparent',
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService implements OnDestroy {

    private static readonly DEFAULT_CONFIG: HeaderConfig = {
        showMenu: false,
        background: HeaderBackground.SHOW
    }

    private currentConfig: HeaderConfig = HeaderService.DEFAULT_CONFIG;
    private routeSubscription: Subscription | null = null;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.routeSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const routeConfig = this.getCurrentRouteConfig();
                this.currentConfig = routeConfig ? routeConfig : HeaderService.DEFAULT_CONFIG;
            });
    }

    ngOnDestroy(): void {
        if (!this.routeSubscription) return;

        this.routeSubscription.unsubscribe();
    }

    private getCurrentRouteConfig(): HeaderConfig | null {
        let currentRoute = this.route.root;
        while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
        }

        return currentRoute.snapshot.data['header'] as HeaderConfig;
    }

    public getHeaderConfig(): HeaderConfig {
        return this.currentConfig;
    }

}
