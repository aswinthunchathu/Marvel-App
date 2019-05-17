import { FETCH_COMICS, FETCH_COMICS_BY_CHARACTER_ID, FETCH_COMICS_BY_SERIES_ID } from '../../shared/graphqlQuery'

export enum ENUM_FILTER {
    'DEFAULT' = 'default',
    'CHARACTER_ID' = 'characterId',
    'SERIES_ID' = 'seriesId',
}

export const FILTER_TYPE = new Map([
    [ENUM_FILTER.DEFAULT, FETCH_COMICS],
    [ENUM_FILTER.CHARACTER_ID, FETCH_COMICS_BY_CHARACTER_ID],
    [ENUM_FILTER.SERIES_ID, FETCH_COMICS_BY_SERIES_ID],
])
