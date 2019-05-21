/*
    This is a dump component which renders app sidebar
    @props{
        click: function (optional) -- function that controls hide or show sidebar in mobile view
    }
*/

import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import style from './sidebar.module.scss'
import logo from '../../../assets/images/logo.svg'

import Search from '../../Search'

const sidebar: FC = props => {
    return (
        <div className={style['sidebar']}>
            <Link to="/" className={style['brand-holder']}>
                <img src={logo} alt="logo" className={style['logo']} />
            </Link>
            {props.children}
            <div className="mt-auto">
                <Search className={['mb-5', style['search-dt']].join(' ')} redirectTo="/search" />
                <div className={style['copy-write-mark']}>Data provided by Marvel. © 2014 Marvel</div>
            </div>
        </div>
    )
}

export default sidebar
