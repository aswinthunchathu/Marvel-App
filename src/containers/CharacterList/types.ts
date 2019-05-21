import { ENUM_FILTER } from './enum'

export interface IFilter {
    type: ENUM_FILTER
    value: string
}

export interface IProps {
    withSpace?: boolean
    filter?: IFilter
}

export interface IVariables {
    offset: number
    limit: number
    filter?: string
}
