import { ReactNode } from 'react'
import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom'

export interface ITab {
    key: string
    title: string
    component: ReactNode
}

export interface IProps extends IRouteComponentProps {
    id: string
    defaultActiveKey: string
    tabs: ITab[]
}
