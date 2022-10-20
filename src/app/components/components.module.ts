import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CategoryFiltersComponent } from './category-filters/category-filters.component';


@NgModule({
    declarations: [
        CategoryFiltersComponent
    ],
    exports: [
        CategoryFiltersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ]
})
export class ComponentsModule { }