export interface IResult {
    offset: number
    limit: number
    total: number
    count: number
}

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

export interface ILoadData {
    (page: number): void
}

export interface ICharacters extends IResult {
    results: ICharacter[]
}

export interface IComics extends IResult {
    results: IComic[]
}

export interface ISeriesList extends IResult {
    results: ISeries[]
}

export interface IResponseCharacters {
    data: {
        characters: ICharacters
    }
}

export interface IResponseComics {
    data: {
        comics: IComics
    }
}

export interface IData {
    container: IComics | ICharacters | ISeriesList
}
