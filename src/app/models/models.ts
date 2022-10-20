export interface BaseSticker{
    id      : string;
    category: string;
    name    : string;
    foil    : boolean;
}

export interface ObtainedSticker{
    sticker   : BaseSticker;
    amount    : number;
}

export interface Category{
    name    : string;
    selected: boolean
}