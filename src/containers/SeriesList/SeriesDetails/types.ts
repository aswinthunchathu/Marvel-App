import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'
import { ISeriesList } from '../../../shared/types'

interface IMatchParams {
    id: string
}

export interface IProps extends IRouteComponentProps<IMatchParams> {}

export interface IData {
    container: ISeriesList
}

export interface IVariables {
    seriesId: string
}
