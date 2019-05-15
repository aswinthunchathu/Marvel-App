import { ICardData } from '../types'

export interface ICardDetails extends ICardData {
    description: string
}

export interface IProps {
    data?: ICardDetails
    showAsBackgroundImage?: boolean
}
