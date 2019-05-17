/*
    This is a container component which displays the search results
*/

import React, { FC } from 'react'
import qs from 'qs'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { IData } from '../../shared/types'
import { IVariables, IProps } from './types'
import SearchResults from '../../components/CardList'
import ErrorBoundary from '../../hoc/ErrorHandler'
import { getPageData } from '../../shared/util'
import { CHARACTERS_LIMIT, CHARACTERS_URL } from '../../shared/constants'
import { FETCH_CHARACTERS } from '../../shared/graphqlQuery'

const searchResults: FC<IProps> = props => {
    let query = FETCH_CHARACTERS
    const { key: search } = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    const variables: IVariables = {
        search,
    }

    return search !== '' && search !== undefined ? (
        <Query<IData, IVariables> query={query} variables={variables}>
            {({ loading, error, data, fetchMore }) => {
                const { pagination, data: generatedData } = getPageData(CHARACTERS_URL, CHARACTERS_LIMIT, data)

                return (
                    <ErrorBoundary error={error}>
                        <SearchResults
                            loading={loading}
                            data={generatedData}
                            pagination={pagination}
                            loadData={() => {
                                // fetchMore({
                                //     variables: {
                                //         ...variables,
                                //         offset:
                                //             data && data.container ? data.container.limit + data.container.offset : 0,
                                //     },
                                //     updateQuery: (prev, { fetchMoreResult }) => getUpdatedPage(prev, fetchMoreResult),
                                // })
                            }}
                        />
                    </ErrorBoundary>
                )
            }}
        </Query>
    ) : (
        <Redirect to="/" />
    )
}

export { searchResults as default }
