import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickersPageRoutingModule } from './stickers-routing.module';

import { StickersPage } from './stickers.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickersPageRoutingModule,
    ComponentsModule

  ],
  declarations: [StickersPage]
})
export class StickersPageModule {}
