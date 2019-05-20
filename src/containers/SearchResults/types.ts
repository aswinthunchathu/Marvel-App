import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'
import { IPagination, IData } from '../../shared/types'

export interface IProps extends IRouteComponentProps {}

export interface IVariables {
    offset: number
    limit: number
    search: string
}

export interface ISearchQuery {
    query: string
    variables: IVariables
}

export interface IResponse {
    data: IData
}
