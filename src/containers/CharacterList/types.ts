import { ENUM_FILTER } from './enum'

export interface IFilter {
    type: ENUM_FILTER
    value: string
}

export type IProps =
    | {
          withSpace?: boolean
          filter?: IFilter
          location?: never
      }
    | {
          withSpace?: boolean
          filter?: never
          location?: {
              search: string
          }
      }

export interface IVariables {
    offset: number
    limit: number
    filter?: string
}
