import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'
import { ICharacters } from '../../../shared/types'

interface IMatchParams {
    id: string
}

export interface IProps extends IRouteComponentProps<IMatchParams> {}

export interface IData {
    container: ICharacters
}

export interface IVariables {
    characterId: string
}
