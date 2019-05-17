/*
    This is a dump component which render 1 navigation link
    @props{
        click: function (optional) -- function that controls hide or show sidebar in mobile view
        children: ReactNode
        link: string -- url
    }
*/

import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import style from './navigation-item.module.scss'

import { IProps } from './type'

const navigationItem: FC<IProps> = props => {
    return (
        <li className={style['link']}>
            <NavLink to={props.link} onClick={props.click} activeClassName={style['active']} exact>
                {props.children}
                <span className={style['underline']} />
            </NavLink>
        </li>
    )
}

export default navigationItem
