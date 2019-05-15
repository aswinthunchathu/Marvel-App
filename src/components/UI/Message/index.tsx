import React, { FC } from 'react'

import { IProps } from './types'
import style from './message.module.scss'

enum MESSAGE_TYPES {
    ERROR = 'error',
    NO_DATA = 'no-data',
    NO_MORE_DATA = 'no-more-data',
}

const error: FC<IProps> = props => {
    return <div className={style[props.type]}>{props.children}</div>
}

export { error as default, MESSAGE_TYPES }
