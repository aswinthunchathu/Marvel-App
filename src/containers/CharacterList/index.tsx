/*
    This is a container component which displays list of characters.
    @props{
        @withSpace: boolean (optional) -- if true, each tile will be rendered without any space in between
        @filter: IFilter (optional) -- when provided, list will be filtered by the given filter 
    }
*/

import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { CHARACTERS_LIMIT, CHARACTERS_URL } from '../../shared/constants'
import { getPageData, isMobile, getUpdatedPage } from '../../shared/util'
import { IData } from '../../shared/types'
import { IVariables, IProps } from './types'
import { FILTER_TYPE, ENUM_FILTER } from './enum'

import ErrorBoundary from '../../hoc/ErrorHandler'
import Characters from '../../components/CardList'

const characterList: FC<IProps> = props => {
    let query = FILTER_TYPE.get(ENUM_FILTER.DEFAULT)
    const variables: IVariables = {
        offset: 0,
        limit: CHARACTERS_LIMIT,
    }
    if (props.filter) {
        query = FILTER_TYPE.get(props.filter.type)
        variables.filterId = props.filter.value
    }

    return (
        <Query<IData, IVariables> query={query} variables={variables}>
            {({ loading, error, data, fetchMore }) => {
                const { pagination, data: generatedData } =
                    props.withSpace || isMobile()
                        ? getPageData(CHARACTERS_URL, CHARACTERS_LIMIT, data)
                        : getPageData(CHARACTERS_URL, CHARACTERS_LIMIT, data, '')

                return (
                    <ErrorBoundary error={error}>
                        <Characters
                            noSpace={props.withSpace ? false : true}
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

export { characterList as default, ENUM_FILTER }
