import { FETCH_SERIES, FETCH_SERIES_BY_CHARACTER_ID } from '../../shared/graphqlQuery'

export enum ENUM_FILTER {
    'DEFAULT' = 'default',
    'CHARACTER_ID' = 'characterId',
}

export const FILTER_TYPE = new Map([
    [ENUM_FILTER.DEFAULT, FETCH_SERIES],
    [ENUM_FILTER.CHARACTER_ID, FETCH_SERIES_BY_CHARACTER_ID],
])
