import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StickersService } from '../services/stickers.service';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage {
	constructor(
        public stickersService: StickersService,
		public navController  : NavController
    ){}
    

    //  Ao iniciar na Home Page, verificar se App já abriu uma vez e, 
    //  caso não, montar a lista com as categorias, checar a situação
    //  das figurinhas salvas no Storage, e calcular as quantidades
    //  de figurinhas obtidas/repetidas/não obtidas
    async ngOnInit(){
        if(!this.stickersService.appAlreadyOpened){
            this.stickersService.buildAllCategoriesList();
            await this.stickersService.checkStorageExistence();
            this.stickersService.calculateStickersAmount();

            this.stickersService.appAlreadyOpened = true;
        }
    }

    //  Recuperar porcentagem de figurinhas obtidas para exibição no início
    public getObtainedStickersPercentage(){
        return this.stickersService.obtainedPercentage;
    }

    //  Redirecionar para página inicial de gerenciamento das figurinhas
    public navigateToStickersManager(){
		this.navController.navigateForward('stickers-tabs/stickers');
    }
}
