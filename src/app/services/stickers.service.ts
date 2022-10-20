import { Injectable } from '@angular/core';
import BaseStickerJSON from '../../stickers.json';
import CategoriesJSON from '../../categories.json';
import { BaseSticker, Category, ObtainedPhases, ObtainedSticker } from '../models/models';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class StickersService {

    constructor(
        public storage: Storage
    ){}

    //  Controle para saber se app já abriu uma vez
    public appAlreadyOpened = false;
    
    //  Array de todos as figurinhas base, importadas do JSON
    public allStickersFromJSON: BaseSticker[];

    //  Array com as figurinhas já obtidas
    public allObtainedStickers: ObtainedSticker[] = [];

    //  Quantidades de figurinhas para usar em cálculos
    public totalStickersAmount  : number = 678;

    public generalObtainedAmount: number = 0;   //  Todas em quantidade
    public obtainedAmount       : number = 0;   //  Uma de cada que tem
    public notObtainedAmount    : number = 0;   //  Uma de cada que não tem
    public repeatedAmount       : number = 0;   //  Todas em quantidade repetida

    public obtainedPercentage   : number = 0;


    //  Arrays referentes às categorias
    public allCategoryNames: string[] = [];
    public allCategories   : Category[] = [];

    //  Map para manipular a paginação das figurinhas
    public stickersToPageNumberMap = new Map();

    //  Valores usados atualmente para filtragem
    public currentObtainedFilter: string = ObtainedPhases.Todos;
    public currentCategoriesFilter: string[] = ['Todos'];
    
    //  Recuperar infos das categorias do JSON e atribuir ao array local    
    public buildAllCategoriesList(){
        this.allCategoryNames = CategoriesJSON;

        this.allCategoryNames.forEach(
            category => this.allCategories.push(
                {
                    name    : category,
                    selected: true
                }
            )
        );
    }

    //  Recuperar figurinhas obtidas salvas do Storage, e resetar filtros
    public async getObtainedStickersFromStorage(){
        await this.storage.get('obtained-stickers').then(
			obtainedSticker => this.allObtainedStickers.push(...obtainedSticker)
		);

        this.buildStickersByPageMap('Todos', ['Todos']);
    }

    //  Verificar se infos das figurinhas obtidas já existe no Storage e recuperá-las
    //  Caso não tenha, criar e setar todas as figurinhas zeradas
    public async checkStorageExistence(){
		if((await this.storage.keys()).length != 1){
            await this.buildStarterObtainedStickers();
            await this.updateStorage();
        } else {
            await this.getObtainedStickersFromStorage();
        }

        this.buildStickersByPageMap('Todos', ['Todos']);
	}

    //  Enviar ao Storage Array local atualizado de todas as figurinhas
    public async updateStorage(){
        this.storage.set('obtained-stickers', this.allObtainedStickers);
    }

    //  Popula a lista de figurinhas obtidas com figurinhas zeradas
    public async buildStarterObtainedStickers(){
        this.allStickersFromJSON = BaseStickerJSON;
        
        this.allStickersFromJSON.forEach(
            baseSticker => this.allObtainedStickers.push(
                {
                    sticker   : baseSticker,
                    amount    : 0
                }
            )
        );
    }

    //  Métodos para verificar status de obtenção das figurinhas
    public isStickerNotObtained(sticker: ObtainedSticker){
        return sticker.amount == 0;
    }

    public isStickerObtained(sticker: ObtainedSticker){
        return sticker.amount >= 1;
    }

    public isStickerDuplicated(sticker: ObtainedSticker){
        return sticker.amount > 1;
    }



    //  Calcular quantidades e porcentagem das figurinhas obtidas
    public calculateStickersAmount(){
        this.clearAllAmountsToShow();      

        for(let obtainedSticker of this.allObtainedStickers){
            if(this.isStickerObtained(obtainedSticker)){
                this.generalObtainedAmount += obtainedSticker.amount;

                //  Retira-se 1 no final que é a "original" já obtida
                if(this.isStickerDuplicated(obtainedSticker)){
                    this.repeatedAmount += obtainedSticker.amount - 1;
                }
                
                //  Extras não contam para contagem de obtidas/não obtidas
                if(
                    this.isStickerObtained(obtainedSticker) &&
                    obtainedSticker.sticker.category.toLowerCase() != 'extra'
                ){
                    this.obtainedAmount++;
                }
            } 

        }
        this.notObtainedAmount = this.totalStickersAmount - this.obtainedAmount;

        this.obtainedPercentage = 
            ((100 * this.obtainedAmount) / this.totalStickersAmount) * 0.01;
    }

    //  Zerar quantidades das figurinhas antes de recalcular
    public clearAllAmountsToShow(){
        this.generalObtainedAmount = 0;
        this.notObtainedAmount = 0;
        this.obtainedAmount = 0;
        this.repeatedAmount = 0;
    }

    //  Construir Map de paginação das figurinhas dependendo dos filtros usados
    public buildStickersByPageMap(obtainedFilter: string, categoryFilters: string[]){
        this.stickersToPageNumberMap = new Map();
        this.resetPages();

        let pageNumber = 1;
        let itemIndex = 1;

        for(let obtainedSticker of this.allObtainedStickers.filter(
            s =>
                (
                    (obtainedFilter.toLowerCase() == 'não obtidas') ? (this.isStickerNotObtained(s)) : 
                    (obtainedFilter.toLowerCase() == 'obtidas')     ? (this.isStickerObtained(s))    :
                    (obtainedFilter.toLowerCase() == 'repetidas')   ? (this.isStickerDuplicated(s))  : 
                    (s.amount >= 0)
                ) &&
                (
                    !categoryFilters.includes('Todos') ? 
                    categoryFilters.includes(s.sticker.category) :
                    categoryFilters != null
                )
        )){
            
            if(!this.stickersToPageNumberMap.has(pageNumber)){
                this.stickersToPageNumberMap.set(pageNumber, []);
            }
            this.stickersToPageNumberMap.get(pageNumber).push(obtainedSticker);
            
            if(itemIndex++ == 20){
                pageNumber++;
                itemIndex = 1;
            }
        }
    }

    //  Atualizar figurinhas para exibição baseados nos filtros atuais
    public updateFiltering(){
        this.buildStickersByPageMap(
            this.currentObtainedFilter,
            this.currentCategoriesFilter
        );
    }


    //  Métodos para manipulação das páginas
    public currentPage = 1;
    public backPage(){
        if(this.currentPage > 1){
            this.currentPage--;
        }
    }

    public forwardPage(){
        if(this.stickersToPageNumberMap.get(this.currentPage + 1) != null){
            this.currentPage++;
        }
    }

    public resetPages(){
        this.currentPage = 1;
    }
}