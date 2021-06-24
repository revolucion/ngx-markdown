import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional, PLATFORM_ID } from '@angular/core';
import * as marked from 'marked';
import { map } from 'rxjs/operators';
import { MarkedRenderer } from './marked-renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./marked-options";
import * as i3 from "@angular/platform-browser";
/* eslint-disable max-len */
export const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
/* eslint-enable max-len */
export const SECURITY_CONTEXT = new InjectionToken('SECURITY_CONTEXT');
export class MarkdownService {
    constructor(platform, securityContext, http, options, sanitizer) {
        this.platform = platform;
        this.securityContext = securityContext;
        this.http = http;
        this.sanitizer = sanitizer;
        this.initialMarkedOptions = {
            renderer: new MarkedRenderer(),
        };
        this.options = options;
    }
    get options() { return this._options; }
    set options(value) {
        this._options = Object.assign(Object.assign({}, this.initialMarkedOptions), value);
    }
    get renderer() { return this.options.renderer; }
    set renderer(value) {
        this.options.renderer = value;
    }
    compile(markdown, decodeHtml = false, emojify = false, markedOptions = this.options) {
        const trimmed = this.trimIndentation(markdown);
        const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
        const emojified = emojify ? this.renderEmoji(decoded) : decoded;
        const compiled = marked.parse(emojified, markedOptions);
        return this.sanitizer.sanitize(this.securityContext, compiled) || '';
    }
    getSource(src) {
        if (!this.http) {
            throw new Error(errorSrcWithoutHttpClient);
        }
        return this.http
            .get(src, { responseType: 'text' })
            .pipe(map(markdown => this.handleExtension(src, markdown)));
    }
    highlight(element) {
        if (!isPlatformBrowser(this.platform)) {
            return;
        }
        if (typeof Prism !== 'undefined') {
            if (!element) {
                element = document;
            }
            const noLanguageElements = element.querySelectorAll('pre code:not([class*="language-"])');
            Array.prototype.forEach.call(noLanguageElements, (x) => x.classList.add('language-none'));
            Prism.highlightAllUnder(element);
        }
    }
    renderKatex(html, options) {
        if (!isPlatformBrowser(this.platform)) {
            return html;
        }
        if (typeof katex === 'undefined' || typeof katex.renderToString === 'undefined') {
            throw new Error(errorKatexNotLoaded);
        }
        return html.replace(/\$([^\s][^$]*?[^\s])\$/gm, (_, tex) => katex.renderToString(tex, options));
    }
    decodeHtml(html) {
        if (!isPlatformBrowser(this.platform)) {
            return html;
        }
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    }
    handleExtension(src, markdown) {
        const extension = src
            ? src.split('?')[0].split('.').splice(-1).join()
            : '';
        return extension !== 'md'
            ? '```' + extension + '\n' + markdown + '\n```'
            : markdown;
    }
    renderEmoji(html) {
        if (!isPlatformBrowser(this.platform)) {
            return html;
        }
        if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
            throw new Error(errorJoyPixelsNotLoaded);
        }
        return joypixels.shortnameToUnicode(html);
    }
    trimIndentation(markdown) {
        if (!markdown) {
            return '';
        }
        let indentStart;
        return markdown
            .split('\n')
            .map(line => {
            let lineIdentStart = indentStart;
            if (line.length > 0) {
                lineIdentStart = isNaN(lineIdentStart)
                    ? line.search(/\S|$/)
                    : Math.min(line.search(/\S|$/), lineIdentStart);
            }
            if (isNaN(indentStart)) {
                indentStart = lineIdentStart;
            }
            return lineIdentStart
                ? line.substring(lineIdentStart)
                : line;
        }).join('\n');
    }
}
MarkdownService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownService, deps: [{ token: PLATFORM_ID }, { token: SECURITY_CONTEXT }, { token: i1.HttpClient, optional: true }, { token: i2.MarkedOptions, optional: true }, { token: i3.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
MarkdownService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.SecurityContext, decorators: [{
                    type: Inject,
                    args: [SECURITY_CONTEXT]
                }] }, { type: i1.HttpClient, decorators: [{
                    type: Optional
                }] }, { type: i2.MarkedOptions, decorators: [{
                    type: Optional
                }] }, { type: i3.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zcmMvbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFFM0csT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFjbkQsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLDZKQUE2SixDQUFDO0FBQ3JNLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLHFKQUFxSixDQUFDO0FBQ3pMLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHLDJKQUEySixDQUFDO0FBQ3JNLDJCQUEyQjtBQUUzQixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBa0Isa0JBQWtCLENBQUMsQ0FBQztBQUd4RixNQUFNLE9BQU8sZUFBZTtJQWtCMUIsWUFDK0IsUUFBZ0IsRUFDWCxlQUFnQyxFQUM5QyxJQUFnQixFQUN4QixPQUFzQixFQUMxQixTQUF1QjtRQUpGLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDWCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUU1QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBckJoQix5QkFBb0IsR0FBa0I7WUFDckQsUUFBUSxFQUFFLElBQUksY0FBYyxFQUFFO1NBQy9CLENBQUM7UUFxQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENB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ciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0ICogYXMgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEthdGV4T3B0aW9ucyB9IGZyb20gJy4va2F0ZXgtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZWRPcHRpb25zIH0gZnJvbSAnLi9tYXJrZWQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZWRSZW5kZXJlciB9IGZyb20gJy4vbWFya2VkLXJlbmRlcmVyJztcblxuZGVjbGFyZSBsZXQgam95cGl4ZWxzOiB7XG4gIHNob3J0bmFtZVRvVW5pY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nO1xufTtcblxuZGVjbGFyZSBsZXQga2F0ZXg6IHtcbiAgcmVuZGVyVG9TdHJpbmcodGV4OiBzdHJpbmcsIG9wdGlvbnM/OiBLYXRleE9wdGlvbnMpOiBzdHJpbmc7XG59O1xuXG5kZWNsYXJlIGxldCBQcmlzbToge1xuICBoaWdobGlnaHRBbGxVbmRlcjogKGVsZW1lbnQ6IEVsZW1lbnQgfCBEb2N1bWVudCkgPT4gdm9pZDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmV4cG9ydCBjb25zdCBlcnJvckpveVBpeGVsc05vdExvYWRlZCA9ICdbbmd4LW1hcmtkb3duXSBXaGVuIHVzaW5nIHRoZSBgZW1vamlgIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIGluY2x1ZGUgRW1vamktVG9vbGtpdCBmaWxlcyB0byBgYW5ndWxhci5qc29uYCBvciB1c2UgaW1wb3J0cy4gU2VlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbic7XG5leHBvcnQgY29uc3QgZXJyb3JLYXRleE5vdExvYWRlZCA9ICdbbmd4LW1hcmtkb3duXSBXaGVuIHVzaW5nIHRoZSBga2F0ZXhgIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIGluY2x1ZGUgS2FUZVggZmlsZXMgdG8gYGFuZ3VsYXIuanNvbmAgb3IgdXNlIGltcG9ydHMuIFNlZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24nO1xuZXhwb3J0IGNvbnN0IGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQgPSAnW25neC1tYXJrZG93bl0gV2hlbiB1c2luZyB0aGUgYHNyY2AgYXR0cmlidXRlIHlvdSAqaGF2ZSB0byogcGFzcyB0aGUgYEh0dHBDbGllbnRgIGFzIGEgcGFyYW1ldGVyIG9mIHRoZSBgZm9yUm9vdGAgbWV0aG9kLiBTZWUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uJztcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG5leHBvcnQgY29uc3QgU0VDVVJJVFlfQ09OVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZWN1cml0eUNvbnRleHQ+KCdTRUNVUklUWV9DT05URVhUJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrZG93blNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbE1hcmtlZE9wdGlvbnM6IE1hcmtlZE9wdGlvbnMgPSB7XG4gICAgcmVuZGVyZXI6IG5ldyBNYXJrZWRSZW5kZXJlcigpLFxuICB9O1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IE1hcmtlZE9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IG9wdGlvbnMoKTogTWFya2VkT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zITsgfVxuICBzZXQgb3B0aW9ucyh2YWx1ZTogTWFya2VkT3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdGlhbE1hcmtlZE9wdGlvbnMsIC4uLnZhbHVlIH07XG4gIH1cblxuICBnZXQgcmVuZGVyZXIoKTogTWFya2VkUmVuZGVyZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmVyITsgfVxuICBzZXQgcmVuZGVyZXIodmFsdWU6IE1hcmtlZFJlbmRlcmVyKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtOiBPYmplY3QsXG4gICAgQEluamVjdChTRUNVUklUWV9DT05URVhUKSBwcml2YXRlIHNlY3VyaXR5Q29udGV4dDogU2VjdXJpdHlDb250ZXh0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBvcHRpb25zOiBNYXJrZWRPcHRpb25zLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBjb21waWxlKG1hcmtkb3duOiBzdHJpbmcsIGRlY29kZUh0bWwgPSBmYWxzZSwgZW1vamlmeSA9IGZhbHNlLCAgbWFya2VkT3B0aW9ucyA9IHRoaXMub3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgdHJpbW1lZCA9IHRoaXMudHJpbUluZGVudGF0aW9uKG1hcmtkb3duKTtcbiAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlSHRtbCA/IHRoaXMuZGVjb2RlSHRtbCh0cmltbWVkKSA6IHRyaW1tZWQ7XG4gICAgY29uc3QgZW1vamlmaWVkID0gZW1vamlmeSA/IHRoaXMucmVuZGVyRW1vamkoZGVjb2RlZCkgOiBkZWNvZGVkO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gbWFya2VkLnBhcnNlKGVtb2ppZmllZCwgbWFya2VkT3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLnNhbml0aXplKHRoaXMuc2VjdXJpdHlDb250ZXh0LCBjb21waWxlZCkgfHwgJyc7XG4gIH1cblxuICBnZXRTb3VyY2Uoc3JjOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5odHRwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTcmNXaXRob3V0SHR0cENsaWVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoc3JjLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gICAgICAucGlwZShtYXAobWFya2Rvd24gPT4gdGhpcy5oYW5kbGVFeHRlbnNpb24oc3JjLCBtYXJrZG93bikpKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChlbGVtZW50PzogRWxlbWVudCB8IERvY3VtZW50KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIFByaXNtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vTGFuZ3VhZ2VFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlIGNvZGU6bm90KFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0pJyk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vTGFuZ3VhZ2VFbGVtZW50cywgKHg6IEVsZW1lbnQpID0+IHguY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpKTtcbiAgICAgIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckthdGV4KGh0bWw6IHN0cmluZywgb3B0aW9ucz86IEthdGV4T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIGlmICh0eXBlb2Yga2F0ZXggPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBrYXRleC5yZW5kZXJUb1N0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckthdGV4Tm90TG9hZGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvXFwkKFteXFxzXVteJF0qP1teXFxzXSlcXCQvZ20sIChfLCB0ZXgpID0+IGthdGV4LnJlbmRlclRvU3RyaW5nKHRleCwgb3B0aW9ucykpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNvZGVIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXh0ZW5zaW9uKHNyYzogc3RyaW5nLCBtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBzcmNcbiAgICAgID8gc3JjLnNwbGl0KCc/JylbMF0uc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKVxuICAgICAgOiAnJztcbiAgICByZXR1cm4gZXh0ZW5zaW9uICE9PSAnbWQnXG4gICAgICA/ICdgYGAnICsgZXh0ZW5zaW9uICsgJ1xcbicgKyBtYXJrZG93biArICdcXG5gYGAnXG4gICAgICA6IG1hcmtkb3duO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJFbW9qaShodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSkpIHtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGpveXBpeGVscyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGpveXBpeGVscy5zaG9ydG5hbWVUb1VuaWNvZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JKb3lQaXhlbHNOb3RMb2FkZWQpO1xuICAgIH1cbiAgICByZXR1cm4gam95cGl4ZWxzLnNob3J0bmFtZVRvVW5pY29kZShodG1sKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpbUluZGVudGF0aW9uKG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghbWFya2Rvd24pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGV0IGluZGVudFN0YXJ0OiBudW1iZXI7XG4gICAgcmV0dXJuIG1hcmtkb3duXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKGxpbmUgPT4ge1xuICAgICAgICBsZXQgbGluZUlkZW50U3RhcnQgPSBpbmRlbnRTdGFydDtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxpbmVJZGVudFN0YXJ0ID0gaXNOYU4obGluZUlkZW50U3RhcnQpXG4gICAgICAgICAgICA/IGxpbmUuc2VhcmNoKC9cXFN8JC8pXG4gICAgICAgICAgICA6IE1hdGgubWluKGxpbmUuc2VhcmNoKC9cXFN8JC8pLCBsaW5lSWRlbnRTdGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTmFOKGluZGVudFN0YXJ0KSkge1xuICAgICAgICAgIGluZGVudFN0YXJ0ID0gbGluZUlkZW50U3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVJZGVudFN0YXJ0XG4gICAgICAgICAgPyBsaW5lLnN1YnN0cmluZyhsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICA6IGxpbmU7XG4gICAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl19