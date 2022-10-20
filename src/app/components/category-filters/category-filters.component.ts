import { Component, OnInit } from '@angular/core';
import { StickersService } from 'src/app/services/stickers.service';

@Component({
    selector: 'app-category-filters',
    templateUrl: './category-filters.component.html',
    styleUrls: ['./category-filters.component.scss'],
})
export class CategoryFiltersComponent implements OnInit {

    constructor(
        public stickersService: StickersService
    ){}

    ngOnInit(){}

    //  Retorna lista das categorias
    public getAllCategoryList(){
        return this.stickersService.allCategories;
    }

    //  Retorna lista das categorias selecionadas para filtro
    public getAllCurrentCategoriesList(){
        return this.stickersService.currentCategoriesFilter;
    }

    //  Limpa as categorias para filtro
    public cleanAllCurrentCategoriesList(){
        this.stickersService.currentCategoriesFilter = [];
    }

    //  Atualiza fitragem com as categorias atualmente selecionadas
    public updateFilteringStickersByChosenCategories(){
        this.cleanAllCurrentCategoriesList();

        for(let category of this.getAllCategoryList()){
            if(category.selected){
                this.getAllCurrentCategoriesList().push(category.name);
            }
        }

        if(this.getAllCurrentCategoriesList().length == 37){
            this.getAllCurrentCategoriesList().push('Todos');
        }

        this.stickersService.updateFiltering();
    }

    //  Marca ou desmarca todas as categorias dependendo do botão pressionado
    public useAllCategories(shouldUse: boolean){
        this.getAllCategoryList().forEach(
            category => category.selected = shouldUse
        );

        this.updateFilteringStickersByChosenCategories();
    }
}
