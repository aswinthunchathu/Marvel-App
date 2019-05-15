import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { IVariables, IProps } from './types'
import { getPageData, getUpdatedPage } from '../../shared/util'

import { COMICS_LIMIT } from '../../shared/constants'
import { FETCH_COMICS, FETCH_COMICS_BY_CHARACTER_ID, FETCH_COMICS_BY_SERIES_ID } from '../../shared/graphqlQuery'

import Comics from '../../components/CardList'
import ErrorBoundary from '../../hoc/ErrorHandler'
import { IData } from '../../shared/types'

const comicList: FC<IProps> = props => {
    let query = FETCH_COMICS
    const variables: IVariables = {
        offset: 0,
        limit: COMICS_LIMIT,
    }

    if (props.characterId) {
        query = FETCH_COMICS_BY_CHARACTER_ID
        variables.characterId = props.characterId
    } else if (props.seriesId) {
        query = FETCH_COMICS_BY_SERIES_ID
        variables.seriesId = props.seriesId
    }

    return (
        <Query<IData, IVariables> query={query} variables={variables}>
            {({ loading, error, data, fetchMore }) => {
                const { pagination, data: generatedData } = getPageData('/comics', COMICS_LIMIT, data)

                return (
                    <ErrorBoundary error={error}>
                        <Comics
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

export default comicList
