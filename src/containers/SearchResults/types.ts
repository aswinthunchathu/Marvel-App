import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'
import { ICharacters, IComics, ISeriesList } from '../../shared/types'

export interface IProps extends IRouteComponentProps {}

export interface IVariables {
    search: string
}

export interface IData {
    characters: ICharacters
    comics: IComics
    series: ISeriesList
}
