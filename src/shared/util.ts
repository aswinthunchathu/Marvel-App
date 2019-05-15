import { ICharacter, IComic, ISeries, IPagination, IData } from './types'
import { ICardData } from '../components/CardList/types'

class Pagination implements IPagination {
    limit = 0
    total = 0
    offset = 0
    count = 0

    constructor(limit: number) {
        this.limit = limit
    }
}

export const generateCardData = (
    data: (ICharacter | IComic | ISeries)[],
    link: string,
    imageType: string = '/portrait_incredible',
    placeholderImageType: string = '/portrait_small'
): ICardData[] =>
    data.map(
        (item): ICardData => ({
            id: item.id,
            text: item.title,
            image: `${item.thumbnail.path}${imageType}.${item.thumbnail.extension}`,
            placeholderImage: `${item.thumbnail.path}${placeholderImageType}.${item.thumbnail.extension}`,
            link: `${link}/${item.id}`,
        })
    )

export const getPageData = (
    link: string,
    limit: number,
    data?: IData,
    imageType: string = '/portrait_incredible',
    placeholderImageType: string = '/portrait_small'
) => {
    const pagination = new Pagination(limit)
    let generatedData: ICardData[] = []
    if (data && data.container) {
        pagination.count = data.container.count
        pagination.total = data.container.total
        pagination.offset = data.container.offset
        pagination.limit = data.container.limit

        if (data.container.results && data.container.results.length) {
            generatedData = generateCardData(data.container.results, link, imageType, placeholderImageType)
        }
    }

    return {
        pagination,
        data: generatedData,
    }
}

export const getUpdatedPage = (prev: IData, next?: IData) => {
    if (!next) {
        return prev
    }
    return {
        container: {
            ...prev.container,
            ...next.container,
            results: [...prev.container.results, ...next.container.results],
        },
    }
}

export const isMobile = () => window.outerWidth < 992
