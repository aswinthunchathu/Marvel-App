import React, { FC } from 'react'
import style from './loader.module.scss'

const loader: FC = () => {
    return (
        <div className="text-center w-100" key={0}>
            <div className={style['loader']}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default loader
