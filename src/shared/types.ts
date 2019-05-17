export interface IItem {
    name?: string
    role?: string
    type?: string
}

export interface IImage {
    path: string
    extension: string
}

export interface IItems {
    available?: number
    items?: IItem[]
}

export interface IPagination {
    limit: number
    total: number
    offset: number
    count: number
}

export interface IPrice {
    type: string
    price: number
}

export interface ICharacter {
    id: string
    title: string
    description: string
    thumbnail: IImage
}

export interface IComic {
    id: string
    title: string
    description: string
    pageCount: number
    prices: IPrice[]
    thumbnail: IImage
    images: IImage[]
    characters: IItems[]
}
export interface ISeries {
    id: string
    title: string
    description: string
    startYear: number
    endYear: number
    rating: string
    type: string
    thumbnail: IImage
    characters: IItems[]
}

export interface ICharacters extends IPagination {
    results: ICharacter[]
}

export interface IComics extends IPagination {
    results: IComic[]
}

export interface ISeriesList extends IPagination {
    results: ISeries[]
}

export interface IData {
    container: IComics | ICharacters | ISeriesList
}
