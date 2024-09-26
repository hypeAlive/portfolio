import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, Observable, Subject, Subscription} from "rxjs";
import {isEqual} from "lodash";

export type HeaderConfig = {
    showMenu: boolean,
    background: HeaderBackground
}

export enum HeaderBackground {
    SHOW = 'show',
    BLEND_IN_ON_SCROLL = 'blend-in-on-scroll',
    HIDE = 'transparent',
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService implements OnDestroy {

    public static readonly DEFAULT_CONFIG: HeaderConfig = {
        showMenu: false,
        background: HeaderBackground.HIDE
    }

    private configSubject: Subject<HeaderConfig> = new BehaviorSubject<HeaderConfig>(HeaderService.DEFAULT_CONFIG);
    private readonly routeSubscription: Subscription | null = null;
    private currentConfig: HeaderConfig = HeaderService.DEFAULT_CONFIG;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.routeSubscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => {
                const routeConfig = this.getCurrentRouteConfig() || HeaderService.DEFAULT_CONFIG;
                if (isEqual(routeConfig, this.getConfig())) return;

                this.currentConfig = routeConfig;
                this.configSubject.next(routeConfig);
            });
    }

    ngOnDestroy(): void {
        this.configSubject.unsubscribe();

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

    public getConfigObserver(): Observable<HeaderConfig> {
        return this.configSubject.asObservable();
    }

    public getConfig(): HeaderConfig {
        return this.currentConfig;
    }

}
