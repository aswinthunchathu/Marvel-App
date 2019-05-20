/*
    This is a container component which displays the search results
*/

import React, { FC } from 'react'
import qs from 'qs'
import { Redirect, Link } from 'react-router-dom'

import style from './search_results.module.scss'

import { IProps } from './types'
import Characters, { ENUM_FILTER as CHARACTER_FILTER } from '../../containers/CharacterList'
import Comics, { ENUM_FILTER as COMIC_FILTER } from '../../containers/ComicList'
import Series, { ENUM_FILTER as SERIES_FILTER } from '../../containers/SeriesList'

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

            <div className="row mb-3">
                <div className="col-12">
                    <div className="row">
                        <Characters
                            limit={6}
                            infinityScrolling={false}
                            withSpace={true}
                            filter={{
                                type: CHARACTER_FILTER.NAME_STARTS_WITH,
                                value: search,
                            }}
                        >
                            <div className={style['header']}>
                                Characters
                                <Link to={`/?search=${search}`} className={style['show-more']}>
                                    Show more
                                </Link>
                            </div>
                        </Characters>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <div className="row">
                        <Comics
                            limit={6}
                            infinityScrolling={false}
                            filter={{
                                type: COMIC_FILTER.TITLE_STARTS_WITH,
                                value: search,
                            }}
                        >
                            {' '}
                            <div className={style['header']}>
                                Comics
                                <Link to={`/comics?search=${search}`} className={style['show-more']}>
                                    Show more
                                </Link>
                            </div>
                        </Comics>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <Series
                            limit={6}
                            infinityScrolling={false}
                            filter={{
                                type: SERIES_FILTER.TITLE_STARTS_WITH,
                                value: search,
                            }}
                        >
                            <div className={style['header']}>
                                Series
                                <Link to={`/series?search=${search}`} className={style['show-more']}>
                                    Show more
                                </Link>
                            </div>
                        </Series>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
    )
}

export { searchResults as default }
