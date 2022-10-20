import { Injectable } from '@angular/core';
import BaseStickerJSON from '../../stickers.json';
import CategoriesJSON from '../../categories.json';
import { BaseSticker, Category, ObtainedSticker } from '../models/models';
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

    //  Arrays referentes às categorias
    public allCategoryNames: string[] = [];
    public allCategories   : Category[] = [];

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
}