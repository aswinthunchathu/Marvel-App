/*
    This is a container component which displays the search results
*/

import React, { FC } from 'react'
import qs from 'qs'
import { Redirect, Link } from 'react-router-dom'

import style from './search_results.module.scss'

import { IProps } from './types'

const searchResults: FC<IProps> = props => {
    const { key: search } = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    return search ? (
        <div className={['container-fluid', style['search-results']].join(' ')}>
            <div className="row">
                <h2 className="col-12">
                    <div className={style['heading']}>{`Showing results for the search "${search}"`}</div>
                </h2>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
    )
}

export { searchResults as default }
