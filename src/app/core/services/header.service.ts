import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, Observable, Subject, Subscription} from "rxjs";
import {isEqual} from "lodash";
import {CoreModule} from "../core.module";
import {RouteConfig} from "../models/RouteConfig";

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
    providedIn: CoreModule
})
export class HeaderService extends RouteConfig<HeaderConfig> {

    public static readonly DEFAULT_CONFIG: HeaderConfig = {
        showMenu: false,
        background: HeaderBackground.HIDE
    }

    constructor() {
        super('header', HeaderService.DEFAULT_CONFIG);
    }

}
