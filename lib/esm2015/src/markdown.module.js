import { NgModule, SecurityContext } from '@angular/core';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';
import * as i0 from "@angular/core";
const sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
export class MarkdownModule {
    static forRoot(markdownModuleConfig) {
        return {
            ngModule: MarkdownModule,
            providers: [
                MarkdownService,
                markdownModuleConfig && markdownModuleConfig.loader || [],
                markdownModuleConfig && markdownModuleConfig.markedOptions || [],
                {
                    provide: SECURITY_CONTEXT,
                    useValue: markdownModuleConfig && markdownModuleConfig.sanitize != null
                        ? markdownModuleConfig.sanitize
                        : SecurityContext.HTML,
                },
            ],
        };
    }
    static forChild() {
        return {
            ngModule: MarkdownModule,
        };
    }
}
MarkdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MarkdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownModule, declarations: [LanguagePipe,
        MarkdownComponent,
        MarkdownPipe], exports: [LanguagePipe,
        MarkdownComponent,
        MarkdownPipe] });
MarkdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MarkdownModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: sharedDeclarations,
                    declarations: sharedDeclarations,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NyYy9tYXJrZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQVl2RSxNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsWUFBWTtDQUNiLENBQUM7QUFNRixNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUEyQztRQUN4RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2Ysb0JBQW9CLElBQUksb0JBQW9CLENBQUMsTUFBTSxJQUFJLEVBQUU7Z0JBQ3pELG9CQUFvQixJQUFJLG9CQUFvQixDQUFDLGFBQWEsSUFBSSxFQUFFO2dCQUNoRTtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLEVBQUUsb0JBQW9CLElBQUksb0JBQW9CLENBQUMsUUFBUSxJQUFJLElBQUk7d0JBQ3JFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRO3dCQUMvQixDQUFDLENBQUMsZUFBZSxDQUFDLElBQUk7aUJBQ3pCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ2IsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1NBQ3pCLENBQUM7SUFDSixDQUFDOzsyR0F0QlUsY0FBYzs0R0FBZCxjQUFjLGlCQVR6QixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLFlBQVksYUFGWixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLFlBQVk7NEdBT0QsY0FBYzsyRkFBZCxjQUFjO2tCQUoxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFlBQVksRUFBRSxrQkFBa0I7aUJBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGFuZ3VhZ2VQaXBlIH0gZnJvbSAnLi9sYW5ndWFnZS5waXBlJztcbmltcG9ydCB7IE1hcmtkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Rvd25QaXBlIH0gZnJvbSAnLi9tYXJrZG93bi5waXBlJztcbmltcG9ydCB7IE1hcmtkb3duU2VydmljZSwgU0VDVVJJVFlfQ09OVEVYVCB9IGZyb20gJy4vbWFya2Rvd24uc2VydmljZSc7XG5cbi8vIGhhdmluZyBhIGRlcGVuZGVuY3kgb24gYEh0dHBDbGllbnRNb2R1bGVgIHdpdGhpbiBhIGxpYnJhcnlcbi8vIGJyZWFrcyBhbGwgdGhlIGludGVyY2VwdG9ycyBmcm9tIHRoZSBhcHAgY29uc3VtaW5nIHRoZSBsaWJyYXJ5XG4vLyBoZXJlLCB3ZSBleHBsaWNpdGVseSBhc2sgdGhlIHVzZXIgdG8gcGFzcyBhIHByb3ZpZGVyIHdpdGhcbi8vIHRoZWlyIG93biBpbnN0YW5jZSBvZiBgSHR0cENsaWVudE1vZHVsZWBcbmV4cG9ydCBpbnRlcmZhY2UgTWFya2Rvd25Nb2R1bGVDb25maWcge1xuICBsb2FkZXI/OiBQcm92aWRlcjtcbiAgbWFya2VkT3B0aW9ucz86IFByb3ZpZGVyO1xuICBzYW5pdGl6ZT86IFNlY3VyaXR5Q29udGV4dDtcbn1cblxuY29uc3Qgc2hhcmVkRGVjbGFyYXRpb25zID0gW1xuICBMYW5ndWFnZVBpcGUsXG4gIE1hcmtkb3duQ29tcG9uZW50LFxuICBNYXJrZG93blBpcGUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBzaGFyZWREZWNsYXJhdGlvbnMsXG4gIGRlY2xhcmF0aW9uczogc2hhcmVkRGVjbGFyYXRpb25zLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1hcmtkb3duTW9kdWxlQ29uZmlnPzogTWFya2Rvd25Nb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hcmtkb3duTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXJrZG93bk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNYXJrZG93blNlcnZpY2UsXG4gICAgICAgIG1hcmtkb3duTW9kdWxlQ29uZmlnICYmIG1hcmtkb3duTW9kdWxlQ29uZmlnLmxvYWRlciB8fCBbXSxcbiAgICAgICAgbWFya2Rvd25Nb2R1bGVDb25maWcgJiYgbWFya2Rvd25Nb2R1bGVDb25maWcubWFya2VkT3B0aW9ucyB8fCBbXSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNFQ1VSSVRZX0NPTlRFWFQsXG4gICAgICAgICAgdXNlVmFsdWU6IG1hcmtkb3duTW9kdWxlQ29uZmlnICYmIG1hcmtkb3duTW9kdWxlQ29uZmlnLnNhbml0aXplICE9IG51bGxcbiAgICAgICAgICAgID8gbWFya2Rvd25Nb2R1bGVDb25maWcuc2FuaXRpemVcbiAgICAgICAgICAgIDogU2VjdXJpdHlDb250ZXh0LkhUTUwsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNYXJrZG93bk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFya2Rvd25Nb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuIl19