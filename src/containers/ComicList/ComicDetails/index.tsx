/*
    This is a container component which displays details about a comic.
*/

import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { FETCH_COMIC_BY_ID } from '../../../shared/graphqlQuery'
import { getCardDetailsData } from '../../../shared/util'

import Tabs, { ITabProps } from '../../../components/Tabs'
import Comic from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'

import { ENUM_FILTER } from '../../CharacterList'

const Characters = lazy(() => import('../../CharacterList'))

const comicDetails: FC<IProps> = props => {
    const comicId = props.match.params.id
    const defaultTab = 'characters'
    const tabs: ITabProps[] = [
        {
            key: defaultTab,
            title: 'Characters',
            component: <Characters filter={{ type: ENUM_FILTER.COMIC_ID, value: comicId }} withSpace={true} />,
        },
    ]

    return (
        <Query<IData, IVariables>
            query={FETCH_COMIC_BY_ID}
            variables={{
                comicId,
            }}
        >
            {({ loading, error, data }) => {
                return (
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <Comic data={getCardDetailsData(data)}>
                                <Tabs id="tabComicDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </Comic>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export type IComicDetails = IProps
export default comicDetails
