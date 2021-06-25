import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrismPlugin } from './prism-plugin';
import * as i0 from "@angular/core";
import * as i1 from "./markdown.service";
export class MarkdownComponent {
    constructor(element, markdownService) {
        this.element = element;
        this.markdownService = markdownService;
        // Event emitters
        this.error = new EventEmitter();
        this.load = new EventEmitter();
        this.ready = new EventEmitter();
        this._emoji = false;
        this._katex = false;
        this._lineHighlight = false;
        this._lineNumbers = false;
    }
    // Plugin - emoji
    get emoji() { return this._emoji; }
    set emoji(value) { this._emoji = this.coerceBooleanProperty(value); }
    // Plugin - katex
    get katex() { return this._katex; }
    set katex(value) { this._katex = this.coerceBooleanProperty(value); }
    // Plugin - lineHighlight
    get lineHighlight() { return this._lineHighlight; }
    set lineHighlight(value) { this._lineHighlight = this.coerceBooleanProperty(value); }
    // Plugin - lineNumbers
    get lineNumbers() { return this._lineNumbers; }
    set lineNumbers(value) { this._lineNumbers = this.coerceBooleanProperty(value); }
    ngOnChanges() {
        if (this.data != null) {
            this.handleData();
            return;
        }
        if (this.src != null) {
            this.handleSrc();
            return;
        }
    }
    ngAfterViewInit() {
        if (!this.data && !this.src) {
            this.handleTransclusion();
        }
    }
    render(markdown, decodeHtml = false) {
        let compiled = this.markdownService.compile(markdown, decodeHtml, this.emoji);
        compiled = this.katex ? this.markdownService.renderKatex(compiled, this.katexOptions) : compiled;
        this.element.nativeElement.innerHTML = compiled;
        this.handlePlugins();
        this.markdownService.highlight(this.element.nativeElement);
        this.ready.emit();
    }
    coerceBooleanProperty(value) {
        return value != null && `${String(value)}` !== 'false';
    }
    handleData() {
        this.render(this.data);
    }
    handleSrc() {
        this.markdownService
            .getSource(this.src)
            .subscribe(markdown => {
            this.render(markdown);
            this.load.emit(markdown);
        }, error => this.error.emit(error));
    }
    handleTransclusion() {
        this.render(this.element.nativeElement.innerHTML, true);
    }
    handlePlugins() {
        if (this.lineHighlight) {
            this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
        }
        if (this.lineNumbers) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
            this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
        }
    }
    setPluginClass(element, plugin) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            const classes = plugin instanceof Array ? plugin : [plugin];
            preElements.item(i).classList.add(...classes);
        }
    }
    setPluginOptions(element, options) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            Object.keys(options).forEach(option => {
                const attributeValue = options[option];
                if (attributeValue) {
                    const attributeName = this.toLispCase(option);
                    preElements.item(i).setAttribute(attributeName, attributeValue.toString());
                }
            });
        }
    }
    toLispCase(value) {
        const upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }
        let str = value.toString();
        for (let i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
        }
        if (str.slice(0, 1) === '-') {
            str = str.slice(1);
        }
        return str;
    }
}
MarkdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MarkdownComponent, deps: [{ token: i0.ElementRef }, { token: i1.MarkdownService }], target: i0.ɵɵFactoryTarget.Component });
MarkdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: MarkdownComponent, selector: "markdown, [markdown]", inputs: { data: "data", src: "src", emoji: "emoji", katex: "katex", katexOptions: "katexOptions", lineHighlight: "lineHighlight", line: "line", lineOffset: "lineOffset", lineNumbers: "lineNumbers", start: "start" }, outputs: { error: "error", load: "load", ready: "ready" }, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MarkdownComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'markdown, [markdown]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.MarkdownService }]; }, propDecorators: { data: [{
                type: Input
            }], src: [{
                type: Input
            }], emoji: [{
                type: Input
            }], katex: [{
                type: Input
            }], katexOptions: [{
                type: Input
            }], lineHighlight: [{
                type: Input
            }], line: [{
                type: Input
            }], lineOffset: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], start: [{
                type: Input
            }], error: [{
                type: Output
            }], load: [{
                type: Output
            }], ready: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NyYy9tYXJrZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPN0MsTUFBTSxPQUFPLGlCQUFpQjtJQTRDNUIsWUFDUyxPQUFnQyxFQUNoQyxlQUFnQztRQURoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFaekMsaUJBQWlCO1FBQ1AsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFbkMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQUt6QixDQUFDO0lBckNMLGlCQUFpQjtJQUNqQixJQUNJLEtBQUssS0FBYyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUUsaUJBQWlCO0lBQ2pCLElBQ0ksS0FBSyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFx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LDJCQUEyQjsyRkFFMUIsaUJBQWlCO2tCQUw3QixTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7K0hBUVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFJRixLQUFLO3NCQURSLEtBQUs7Z0JBTUYsS0FBSztzQkFEUixLQUFLO2dCQUdHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBSUYsYUFBYTtzQkFEaEIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFJRixXQUFXO3NCQURkLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdJLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBLYXRleE9wdGlvbnMgfSBmcm9tICcuL2thdGV4LW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7IFByaXNtUGx1Z2luIH0gZnJvbSAnLi9wcmlzbS1wbHVnaW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdtYXJrZG93biwgW21hcmtkb3duXScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Vtb2ppOiBib29sZWFuIHwgJyc7XG4gIHByb3RlY3RlZCBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfa2F0ZXg6IGJvb2xlYW4gfCAnJztcbiAgcHJvdGVjdGVkIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9saW5lSGlnaGxpZ2h0OiBib29sZWFuIHwgJyc7XG4gIHByb3RlY3RlZCBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGluZU51bWJlcnM6IGJvb2xlYW4gfCAnJztcblxuICBASW5wdXQoKSBkYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFBsdWdpbiAtIGVtb2ppXG4gIEBJbnB1dCgpXG4gIGdldCBlbW9qaSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Vtb2ppOyB9XG4gIHNldCBlbW9qaSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9lbW9qaSA9IHRoaXMuY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8vIFBsdWdpbiAtIGthdGV4XG4gIEBJbnB1dCgpXG4gIGdldCBrYXRleCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2thdGV4OyB9XG4gIHNldCBrYXRleCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9rYXRleCA9IHRoaXMuY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBASW5wdXQoKSBrYXRleE9wdGlvbnM6IEthdGV4T3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAvLyBQbHVnaW4gLSBsaW5lSGlnaGxpZ2h0XG4gIEBJbnB1dCgpXG4gIGdldCBsaW5lSGlnaGxpZ2h0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbGluZUhpZ2hsaWdodDsgfVxuICBzZXQgbGluZUhpZ2hsaWdodCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9saW5lSGlnaGxpZ2h0ID0gdGhpcy5jb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIEBJbnB1dCgpIGxpbmU6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBsaW5lT2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgLy8gUGx1Z2luIC0gbGluZU51bWJlcnNcbiAgQElucHV0KClcbiAgZ2V0IGxpbmVOdW1iZXJzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbGluZU51bWJlcnM7IH1cbiAgc2V0IGxpbmVOdW1iZXJzKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xpbmVOdW1iZXJzID0gdGhpcy5jb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIEBJbnB1dCgpIHN0YXJ0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgLy8gRXZlbnQgZW1pdHRlcnNcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9lbW9qaSA9IGZhbHNlO1xuICBwcml2YXRlIF9rYXRleCA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lSGlnaGxpZ2h0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2xpbmVOdW1iZXJzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHB1YmxpYyBtYXJrZG93blNlcnZpY2U6IE1hcmtkb3duU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaGFuZGxlRGF0YSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zcmMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5oYW5kbGVTcmMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRhdGEgJiYgIXRoaXMuc3JjKSB7XG4gICAgICB0aGlzLmhhbmRsZVRyYW5zY2x1c2lvbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBkZWNvZGVIdG1sID0gZmFsc2UpOiB2b2lkIHtcbiAgICBsZXQgY29tcGlsZWQgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jb21waWxlKG1hcmtkb3duLCBkZWNvZGVIdG1sLCB0aGlzLmVtb2ppKTtcbiAgICBjb21waWxlZCA9IHRoaXMua2F0ZXggPyB0aGlzLm1hcmtkb3duU2VydmljZS5yZW5kZXJLYXRleChjb21waWxlZCwgdGhpcy5rYXRleE9wdGlvbnMpIDogY29tcGlsZWQ7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gY29tcGlsZWQ7XG4gICAgdGhpcy5oYW5kbGVQbHVnaW5zKCk7XG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UuaGlnaGxpZ2h0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlYWR5LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlOiBib29sZWFuIHwgJycpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBgJHtTdHJpbmcodmFsdWUpfWAgIT09ICdmYWxzZSc7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZURhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXIodGhpcy5kYXRhISk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNyYygpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZVxuICAgICAgLmdldFNvdXJjZSh0aGlzLnNyYyEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBtYXJrZG93biA9PiB7XG4gICAgICAgICAgdGhpcy5yZW5kZXIobWFya2Rvd24pO1xuICAgICAgICAgIHRoaXMubG9hZC5lbWl0KG1hcmtkb3duKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKSxcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVRyYW5zY2x1c2lvbigpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lckhUTUwsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVQbHVnaW5zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpbmVIaWdobGlnaHQpIHtcbiAgICAgIHRoaXMuc2V0UGx1Z2luT3B0aW9ucyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgeyBkYXRhTGluZTogdGhpcy5saW5lLCBkYXRhTGluZU9mZnNldDogdGhpcy5saW5lT2Zmc2V0IH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5saW5lTnVtYmVycykge1xuICAgICAgdGhpcy5zZXRQbHVnaW5DbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgUHJpc21QbHVnaW4uTGluZU51bWJlcnMpO1xuICAgICAgdGhpcy5zZXRQbHVnaW5PcHRpb25zKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7IGRhdGFTdGFydDogdGhpcy5zdGFydCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBsdWdpbkNsYXNzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbHVnaW46IHN0cmluZyB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBwbHVnaW4gaW5zdGFuY2VvZiBBcnJheSA/IHBsdWdpbiA6IFtwbHVnaW5dO1xuICAgICAgcHJlRWxlbWVudHMuaXRlbShpKS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UGx1Z2luT3B0aW9ucyhlbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCB9KTogdm9pZCB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnRvTGlzcENhc2Uob3B0aW9uKTtcbiAgICAgICAgICBwcmVFbGVtZW50cy5pdGVtKGkpLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b0xpc3BDYXNlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVwcGVyQ2hhcnMgPSB2YWx1ZS5tYXRjaCgvKFtBLVpdKS9nKTtcbiAgICBpZiAoIXVwcGVyQ2hhcnMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSB1cHBlckNoYXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCh1cHBlckNoYXJzW2ldKSwgJy0nICsgdXBwZXJDaGFyc1tpXS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gICAgaWYgKHN0ci5zbGljZSgwLCAxKSA9PT0gJy0nKSB7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiJdfQ==