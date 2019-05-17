/*
    This is a dump component which renders a message
    @props{
         type: MESSAGE_TYPES -- type of message
    }
*/

import React, { FC } from 'react'

import { IProps } from './types'
import style from './message.module.scss'
import { MESSAGE_TYPES } from './enum'

const error: FC<IProps> = props => {
    return <div className={style[props.type]}>{props.children}</div>
}

export { error as default, MESSAGE_TYPES }
