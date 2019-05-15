import React, { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { IProps } from './types'
import style from './sidebar.module.scss'
import logo from '../../../assets/images/logo.svg'

const sidebar: FC<IProps> = props => {
    return (
        <Fragment>
            <div className={style['sidebar']}>
                <Link to="/" className={style['brand-holder']}>
                    <img src={logo} alt="logo" className={style['logo']} />
                </Link>
                {props.children}
                <div className={style['copy-write-mark']}>Data provided by Marvel. © 2014 Marvel</div>
            </div>
            <div className={style['sidebar-drop']} onClick={props.click} />
        </Fragment>
    )
}

export default sidebar
