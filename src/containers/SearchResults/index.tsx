/*
    This is a container component which displays the search results
*/

import React, { FC } from 'react'
import qs from 'qs'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'

import style from './search_results.module.scss'

import { IProps, IVariables, IData } from './types'
import { FETCH_SEARCH_RESULTS } from '../../shared/graphqlQuery'

const searchResults: FC<IProps> = props => {
    const { key: search } = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    let query = FETCH_SEARCH_RESULTS

    const variables: IVariables = {
        search,
    }

    return search ? (
        <div className={['container-fluid', style['search-results']].join(' ')}>
            <div className="row">
                <h2 className="col-12">
                    <div className={style['heading']}>{`Showing results for the search "${search}"`}</div>
                </h2>
            </div>
            <Query<IData, IVariables> query={query} variables={variables}>
                {({ loading, error, data, fetchMore }) => {
                    return <div />
                }}
            </Query>
        </div>
    ) : (
        <Redirect to="/" />
    )
}

export { searchResults as default }
