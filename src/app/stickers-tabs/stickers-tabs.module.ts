import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickersTabsPageRoutingModule } from './stickers-tabs-routing.module';

import { StickersTabsPage } from './stickers-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickersTabsPageRoutingModule
  ],
  declarations: [StickersTabsPage]
})
export class StickersTabsPageModule {}
