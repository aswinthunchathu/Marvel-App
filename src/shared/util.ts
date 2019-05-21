import { ICharacter, IComic, ISeries, IPagination, IData } from './types'
import { ICardData } from '../components/CardList'
import { ICardDetails } from '../components/CardList/CardDetails'
import qs from 'qs'

/*
    This class is used for instantiating pagination
    @params limit: number -- set the number of records per page
*/
class Pagination implements IPagination {
    limit = 0
    total = 0
    offset = 0
    count = 0

    constructor(limit: number) {
        this.limit = limit
    }
}

/*
    This function converts input data to card component compatible data 
    @params data: ICharacter or IComic or ISeries Array
    @params link: string -- This sets to which route the card should redirect
    @imageType data: string -- This specifies which quality image to be used for actual image
    @placeholderImageType data: string -- This specifies which quality image to be used as placeholder
    returns : ICardData Array
*/
export const generateCardData = (
    data: (ICharacter | IComic | ISeries)[],
    link: string,
    imageType: string = '/portrait_uncanny',
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

/*
    This function set pagination and fetch format the fetched data for the first time load 
    @params link: string -- This sets to which route the card should redirect
    @params data: ICharacter or IComic or ISeries Array
    @params limit: number -- number of records per page
    @imageType data: string -- This specifies which quality image to be used for actual image
    @placeholderImageType data: string -- This specifies which quality image to be used as placeholder
    returns {
        type of Pagination,
        ICardData[]
    }
*/
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

/*
    This function is used to merge existing data with the newly fetched data for infinity scrolling
    @params prev: IData -- previous data
    @params next: IData -- new data
    returns IData -- prev + next data
*/
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

/*
    This function converts data of type IData to ICardDetails
    @params data: ICharacter or IComic or ISeries Array
*/
export const getCardDetailsData = (data?: IData) => {
    let updatedData: ICardDetails | undefined = undefined

    if (data && data.container && data.container.results && data.container.results.length > 0) {
        updatedData = {
            id: data.container.results[0].id,
            text: data.container.results[0].title,
            image: `${data.container.results[0].thumbnail.path}/portrait_incredible.${
                data.container.results[0].thumbnail.extension
            }`,
            description: data.container.results[0].description,
        }
    }

    return updatedData
}

/*
    This function checks if the device is mobile or not
    returns boolean
*/
export const isMobile = () => window.outerWidth < 992

/*
    This function checks if the device is mobile or not
    returns boolean
*/
export const getQueryValue = (str: string, key: string) => {
    const params = qs.parse(str, {
        ignoreQueryPrefix: true,
    })
    return params[key]
}
