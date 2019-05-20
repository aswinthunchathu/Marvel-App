import { ENUM_FILTER } from './enum'

export interface IFilter {
    type: ENUM_FILTER
    value: string
}

export interface IProps {
    infinityScrolling?: boolean
    limit?: number
    withSpace?: boolean
    filter?: IFilter
    getDataCount?: (count: number, loading: boolean) => void
}

export interface IVariables {
    offset: number
    limit: number
    filter?: string
}
