import {
    FETCH_CHARACTERS,
    FETCH_CHARACTERS_BY_COMIC_ID,
    FETCH_CHARACTERS_BY_SERIES_ID,
} from '../../shared/graphqlQuery'

export enum ENUM_FILTER {
    'DEFAULT' = 'default',
    'COMIC_ID' = 'comicId',
    'SERIES_ID' = 'seriesId',
}

export const FILTER_TYPE = new Map([
    [ENUM_FILTER.DEFAULT, FETCH_CHARACTERS],
    [ENUM_FILTER.COMIC_ID, FETCH_CHARACTERS_BY_COMIC_ID],
    [ENUM_FILTER.SERIES_ID, FETCH_CHARACTERS_BY_SERIES_ID],
])
