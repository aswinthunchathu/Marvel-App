/*
    This is a dump component which renders a pill
    @props{
          text: string
    }
*/

import React, { FC } from 'react'
import style from './pill.module.scss'

import { IProps } from './type'

const pill: FC<IProps> = props => {
    return (
        <div className={style['pill']}>
            <div>{props.text}</div>
        </div>
    )
}

export default pill
