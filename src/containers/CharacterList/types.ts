import { ICharacters } from '../../shared/types'

export interface IProps {
    comicId?: string
    seriesId?: string
    withSpace?: boolean
}

export interface IVariables {
    offset: number
    limit: number
    comicId?: string
    seriesId?: string
}
