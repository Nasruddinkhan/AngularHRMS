import { NgModule } from '@angular/core';
import { OnlyCharecterDirective } from './views/directive/onlycharecter.directive';
import { OnlynumberDirective } from './views/directive/onlynumber.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        OnlyCharecterDirective,
        OnlynumberDirective
    ],
    exports:[
        OnlyCharecterDirective,
        OnlynumberDirective,
        CommonModule
    ]
})
export class CommonDirective{

}