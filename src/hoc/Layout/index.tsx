import React, { FC } from 'react'

import Header from '../../components/Header'
import style from './layout.module.scss'
import { IProps } from './type'

const layout: FC<IProps> = props => {
    return (
        <div className={style['layout']}>
            <Header />
            <main className={style['main']}>{props.children}</main>
        </div>
    )
}

export default layout
