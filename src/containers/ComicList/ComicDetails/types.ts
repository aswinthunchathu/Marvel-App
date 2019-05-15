import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'
import { IComics } from '../../../shared/types'

interface IMatchParams {
    id: string
}

export interface IProps extends IRouteComponentProps<IMatchParams> {}

export interface IData {
    container: IComics
}

export interface IVariables {
    comicId: string
}
