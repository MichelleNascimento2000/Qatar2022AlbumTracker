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

export enum ObtainedPhases{
    Todos      = 'Todos',
    NaoObtidas = 'Não Obtidas',
    Obtidas    = 'Obtidas',
    Repetidas  = 'Repetidas'
}

export interface Category{
    name    : string;
    selected: boolean
}