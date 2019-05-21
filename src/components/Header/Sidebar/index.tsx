/*
    This is a dump component which renders app sidebar
    @props{
        click: function (optional) -- function that controls hide or show sidebar in mobile view
    }
*/

import React, { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { IProps } from './types'
import style from './sidebar.module.scss'
import logo from '../../../assets/images/logo.svg'

import Search from '../../Search'
import { isMobile } from '../../../shared/util'

const sidebar: FC<IProps> = props => {
    return (
        <Fragment>
            <div className={style['sidebar']}>
                <Link to="/" className={style['brand-holder']}>
                    <img src={logo} alt="logo" className={style['logo']} />
                </Link>
                {props.children}
                <div className="mt-auto">
                    {!isMobile() && <Search className="mb-5" redirectTo="/search" />}
                    <div className={style['copy-write-mark']}>Data provided by Marvel. © 2014 Marvel</div>
                </div>
            </div>
            <div className={style['sidebar-drop']} onClick={props.click} />
        </Fragment>
    )
}

export type ISidebar = IProps
export default sidebar
