import React, { FC } from 'react'
import style from './navigation-items.module.scss'

import { IProps } from './types'
import NavigationItem from './NavigationItem'

const navigationItems: FC<IProps> = props => {
    return (
        <ul className={style['menu']}>
            <NavigationItem link="/" click={props.onLinkClick}>
                Characters
            </NavigationItem>
            <NavigationItem link="/comics" click={props.onLinkClick}>
                Comics
            </NavigationItem>
            <NavigationItem link="/series" click={props.onLinkClick}>
                Series
            </NavigationItem>
        </ul>
    )
}

export default navigationItems
