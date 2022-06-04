import { Directive, TemplateRef } from '@angular/core';
import { AppendToTemplateContext } from './append-to-template-context';

@Directive({ selector: '[appendToTmp]' })
export class AppendToTemplateDirective {
    constructor(
        public readonly template: TemplateRef<AppendToTemplateContext>
    ) { }
}
