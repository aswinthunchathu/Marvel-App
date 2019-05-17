import { ReactNode } from 'react'
import { IPagination } from '../../shared/types'

export interface IProps {
    loadData: () => void
    data: any[]
    pagination: IPagination
    children: ReactNode
    loading: boolean
}

export interface IState {
    showPill: boolean
}
