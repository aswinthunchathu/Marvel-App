import { IPagination } from '../../shared/types'

export interface ICardData {
    id: string
    text: string
    image: string
    placeholderImage?: string
    link?: string
}

// export interface IProps {
//     data?: ICardData[]
//     noSpace?: boolean
//     infiniteScrolling?: boolean
//     loadData?: () => void
//     loading: boolean
//     pagination: IPagination
// }

export type IProps =
    | {
          data?: ICardData[]
          noSpace?: boolean
          infiniteScrolling: true
          loadData: () => void
          loading: boolean
          pagination: IPagination
      }
    | {
          data?: ICardData[]
          noSpace?: boolean
          infiniteScrolling: false
      }
