import { Component, OnInit } from '@angular/core';
import { ObtainedPhases } from 'src/app/models/models';
import { StickersService } from '../services/stickers.service';

@Component({
    selector: 'app-stickers-tabs',
    templateUrl: './stickers-tabs.page.html',
    styleUrls: ['./stickers-tabs.page.scss'],
})
export class StickersTabsPage implements OnInit {

    constructor(
        public stickersService: StickersService
    ){
        this.buildAllObtainedPhases();
    }

    ngOnInit(){}

    //  Arrays com as infos das fases de obtenção
    public allObtainedPhases: string[] = []
    public allObtainedPhasesWithImage = new Map();

    //  Recuperar infos das fases de obtenção
    public buildAllObtainedPhases(){
        for(let phase of Object.values(ObtainedPhases)){
            this.allObtainedPhasesWithImage.set(phase, '../../../assets/obtained-phases/' + phase + '.png')
            this.allObtainedPhases.push(phase);
        }
    }

    //  Retornar o filtro de obtenção usado atualmente
    public getCurrentObtainedFilter(){
        return this.stickersService.currentObtainedFilter;
    }

    //  Atualizar o filtro de obtenção
    public changeLastObtainedFilterSelected(filter: string){
        this.stickersService.currentObtainedFilter = filter;

        this.stickersService.updateFiltering();
    }
}
