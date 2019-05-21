/*
    This is a container component which displays the search results
*/

import React, { FC, Fragment } from 'react'
import qs from 'qs'
import { Redirect, Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import style from './search_results.module.scss'
import { CHARACTERS_URL, SEARCH_LIMIT } from '../../shared/constants'
import { IProps, IVariables, IData } from './types'
import { FETCH_SEARCH_RESULTS } from '../../shared/graphqlQuery'
import { getPageData } from '../../shared/util'

import ErrorBoundary from '../../hoc/ErrorHandler'
import WithLoading from '../../hoc/WithLoading'
import SearchResults from '../../components/CardList'

const searchResults: FC<IProps> = props => {
    const { key: search } = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    let query = FETCH_SEARCH_RESULTS

    const variables: IVariables = {
        search,
    }

    return search ? (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <h2 className="col-12">
                        <div className={style['heading']}>{`Showing results for the search "${search}"`}</div>
                    </h2>
                </div>
            </div>
            <Query<IData, IVariables> query={query} variables={variables}>
                {({ loading, error, data, fetchMore }) => {
                    let UI = []

                    if (data) {
                        for (let key in data) {
                            const container = data[key as keyof typeof data]
                            const transformedData = {
                                container,
                            }
                            const { data: generatedData } = getPageData(CHARACTERS_URL, 0, transformedData)
                            UI.push(
                                <Fragment key={key}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <h2 className="col-12">
                                                <div className={style['header']}>
                                                    {key}
                                                    {container && container.total > SEARCH_LIMIT && (
                                                        <Link to={`/${key}`} className={style['show-more']}>
                                                            Show More
                                                        </Link>
                                                    )}
                                                </div>
                                            </h2>
                                        </div>
                                    </div>
                                    <SearchResults data={generatedData} infiniteScrolling={false} />
                                </Fragment>
                            )
                        }
                    }

                    return (
                        <ErrorBoundary error={error}>
                            <WithLoading fetching={loading}>{UI}</WithLoading>
                        </ErrorBoundary>
                    )
                }}
            </Query>
        </Fragment>
    ) : (
        <Redirect to="/" />
    )
}

export { searchResults as default }
