import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { IVariables, IProps } from './types'
import { getPageData, getUpdatedPage } from '../../shared/util'

import { SERIES_LIMIT } from '../../shared/constants'
import { FETCH_SERIES, FETCH_SERIES_BY_CHARACTER_ID } from '../../shared/graphqlQuery'

import Series from '../../components/CardList'
import ErrorBoundary from '../../hoc/ErrorHandler'
import { IData } from '../../shared/types'

const seriesList: FC<IProps> = props => {
    let query = FETCH_SERIES
    const variables: IVariables = {
        offset: 0,
        limit: SERIES_LIMIT,
    }

    if (props.characterId) {
        query = FETCH_SERIES_BY_CHARACTER_ID
        variables.characterId = props.characterId
    }

    return (
        <Query<IData, IVariables> query={query} variables={variables}>
            {({ loading, error, data, fetchMore }) => {
                const { pagination, data: generatedData } = getPageData('/series', SERIES_LIMIT, data)

                return (
                    <ErrorBoundary error={error}>
                        <Series
                            loading={loading}
                            data={generatedData}
                            pagination={pagination}
                            loadData={() => {
                                fetchMore({
                                    variables: {
                                        ...variables,
                                        offset:
                                            data && data.container ? data.container.limit + data.container.offset : 0,
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => getUpdatedPage(prev, fetchMoreResult),
                                })
                            }}
                        />
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export default seriesList
