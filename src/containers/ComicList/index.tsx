/*
    This is a container component which displays list of comics.
    @props{
        @filter: IFilter (optional) -- when provided, list will be filtered by the given filter 
    }
*/

import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { getPageData, getUpdatedPage } from '../../shared/util'
import { COMICS_LIMIT, COMICS_URL } from '../../shared/constants'
import { IData } from '../../shared/types'
import { IVariables, IProps } from './types'
import { ENUM_FILTER, FILTER_TYPE } from './enum'

import Comics from '../../components/CardList'
import ErrorBoundary from '../../hoc/ErrorHandler'

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
                const { pagination, data: generatedData } = getPageData(COMICS_URL, COMICS_LIMIT, data)

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

export type IComicList = IProps
export { comicList as default, ENUM_FILTER }
