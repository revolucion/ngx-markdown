/// <reference types="marked" />
import { HttpClient } from '@angular/common/http';
import { InjectionToken, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { KatexOptions } from './katex-options';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import * as i0 from "@angular/core";
export declare const errorJoyPixelsNotLoaded = "[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information";
export declare const errorKatexNotLoaded = "[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information";
export declare const errorSrcWithoutHttpClient = "[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information";
export declare const SECURITY_CONTEXT: InjectionToken<SecurityContext>;
export declare class MarkdownService {
    private platform;
    private securityContext;
    private http;
    private sanitizer;
    private readonly initialMarkedOptions;
    private _options;
    get options(): MarkedOptions;
    set options(value: MarkedOptions);
    get renderer(): MarkedRenderer;
    set renderer(value: MarkedRenderer);
    constructor(platform: Object, securityContext: SecurityContext, http: HttpClient, options: MarkedOptions, sanitizer: DomSanitizer);
    compile(markdown: string, decodeHtml?: boolean, emojify?: boolean, markedOptions?: MarkedOptions): string;
    getSource(src: string): Observable<string>;
    highlight(element?: Element | Document): void;
    renderKatex(html: string, options?: KatexOptions): string;
    private decodeHtml;
    private handleExtension;
    private renderEmoji;
    private trimIndentation;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkdownService, [null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MarkdownService>;
}
