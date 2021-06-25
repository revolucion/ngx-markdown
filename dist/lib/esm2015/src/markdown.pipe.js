import { Pipe } from '@angular/core';
import { first } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./markdown.service";
export class MarkdownPipe {
    constructor(elementRef, markdownService, zone) {
        this.elementRef = elementRef;
        this.markdownService = markdownService;
        this.zone = zone;
    }
    transform(value) {
        if (value == null) {
            return '';
        }
        if (typeof value !== 'string') {
            console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
            return value;
        }
        const markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(first())
            .subscribe(() => this.markdownService.highlight(this.elementRef.nativeElement));
        return markdown;
    }
}
MarkdownPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MarkdownPipe, deps: [{ token: i0.ElementRef }, { token: i1.MarkdownService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Pipe });
MarkdownPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MarkdownPipe, name: "markdown" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MarkdownPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'markdown',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.MarkdownService }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zcmMvbWFya2Rvd24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPdkMsTUFBTSxPQUFPLFlBQVk7SUFFdkIsWUFDVSxVQUFtQyxFQUNuQyxlQUFnQyxFQUNoQyxJQUFZO1FBRlosZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQVE7SUFDbEIsQ0FBQztJQUVMLFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyw2REFBNkQsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzVGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDZixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRWxGLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O3lHQXpCVSxZQUFZO3VHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFIeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBOZ1pvbmUsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICcuL21hcmtkb3duLnNlcnZpY2UnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdtYXJrZG93bicsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBtYXJrZG93blNlcnZpY2U6IE1hcmtkb3duU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgKSB7IH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgY29uc29sZS5lcnJvcihgTWFya2Rvd25QaXBlIGhhcyBiZWVuIGludm9rZWQgd2l0aCBhbiBpbnZhbGlkIHZhbHVlIHR5cGUgWyR7dHlwZW9mIHZhbHVlfV1gKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZG93biA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNvbXBpbGUodmFsdWUpO1xuXG4gICAgdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1hcmtkb3duU2VydmljZS5oaWdobGlnaHQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcblxuICAgIHJldHVybiBtYXJrZG93bjtcbiAgfVxufVxuIl19