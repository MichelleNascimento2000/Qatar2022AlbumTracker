import { Component, OnInit } from '@angular/core';
import { ObtainedSticker } from 'src/app/models/models';
import { StickersService } from '../../services/stickers.service';

@Component({
    selector: 'app-stickers',
    templateUrl: './stickers.page.html',
    styleUrls: ['./stickers.page.scss'],
})
export class StickersPage implements OnInit {

    constructor(
        public stickersService: StickersService
    ){}

    ngOnInit(){}

    //  Retorna quantidade total de figurinhas obtidas
    public getGeneralObtainedAmount(){
        return this.stickersService.generalObtainedAmount;
    }
    
    //  Retorna quantidade de figurinhas únicas obtidas
    public getObtainedAmount(){
        return this.stickersService.obtainedAmount;
    }

    //  Retorna quantidade de figurinhas únicas não obtidas
    public getNotObtainedAmount(){
        return this.stickersService.notObtainedAmount;
    }

    //  Retorna quantidade total de figurinhas repetidas
    public getRepeatedAmount(){
        return this.stickersService.repeatedAmount;
    }

    //  Retorna Map de paginação das figurinhas
    public getStickersToShow(){
        return this.stickersService.stickersToShow;
    }

    //  Atualiza quantidades totais de figurinhas para exibição no topo da tela
    public changeCurrentStickerAmount(sticker: ObtainedSticker, shouldAdd: boolean){
        sticker.amount = 
            shouldAdd           ? 
            sticker.amount += 1 : 
            sticker.amount > 0  ? 
            sticker.amount -= 1 : 0;
        
        this.stickersService.updateStorage();
        this.stickersService.calculateStickersAmount();
    }
}
