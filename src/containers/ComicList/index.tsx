import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { IVariables, IProps } from './types'
import { getPageData, getUpdatedPage } from '../../shared/util'

import { COMICS_LIMIT } from '../../shared/constants'

import Comics from '../../components/CardList'
import ErrorBoundary from '../../hoc/ErrorHandler'
import { IData } from '../../shared/types'
import { ENUM_FILTER, FILTER_TYPE } from './enum'

const comicList: FC<IProps> = props => {
    let query = FILTER_TYPE.get(ENUM_FILTER.DEFAULT)
    const variables: IVariables = {
        offset: 0,
        limit: COMICS_LIMIT,
    }
    if (props.filter) {
        query = FILTER_TYPE.get(props.filter.type)
        variables.filterId = props.filter.value
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
