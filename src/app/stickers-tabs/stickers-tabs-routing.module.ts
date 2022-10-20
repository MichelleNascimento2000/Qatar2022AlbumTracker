import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StickersTabsPage } from './stickers-tabs.page';

const routes: Routes = [
    {
        path: '',
        component: StickersTabsPage,
        children: [
            {
                path: 'stickers',
                loadChildren: () => import('./stickers/stickers.module').then( m => m.StickersPageModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickersTabsPageRoutingModule {}
