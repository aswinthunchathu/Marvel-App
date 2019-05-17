import React, { FC } from 'react'
import { Query } from 'react-apollo'

import { CHARACTERS_LIMIT } from '../../shared/constants'
import { IVariables, IProps } from './types'
import { getPageData, isMobile, getUpdatedPage } from '../../shared/util'

import ErrorBoundary from '../../hoc/ErrorHandler'
import Characters from '../../components/CardList'
import { IData } from '../../shared/types'
import { FILTER_TYPE, ENUM_FILTER } from './enum'

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
                        ? getPageData('/characters', CHARACTERS_LIMIT, data)
                        : getPageData('/characters', CHARACTERS_LIMIT, data, '')

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

export default characterList
