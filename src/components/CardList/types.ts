import { IPagination } from '../../shared/types'

export interface ICardData {
    id: string
    text: string
    image: string
    placeholderImage?: string
    link?: string
}

export interface IProps {
    data?: ICardData[]
    loadData: any
    loading: boolean
    pagination: IPagination
    noSpace?: boolean
}
