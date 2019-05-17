/*
    This is a container component which displays details about a series.
*/

import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { FETCH_SERIES_BY_ID } from '../../../shared/graphqlQuery'

import Tabs, { ITabProps } from '../../../components/Tabs'
import SingleSeries from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'
import { ENUM_FILTER as CHARACTER_FILTER_TYPE } from '../../CharacterList'
import { ENUM_FILTER as COMICS_FILTER_TYPE } from '../../ComicList'
import { getCardDetailsData } from '../../../shared/util'

const Characters = lazy(() => import('../../CharacterList'))
const Comics = lazy(() => import('../../ComicList'))

const seriesDetails: FC<IProps> = props => {
    const seriesId = props.match.params.id
    const defaultTab = 'characters'
    const tabs: ITabProps[] = [
        {
            key: defaultTab,
            title: 'Characters',
            component: (
                <Characters filter={{ type: CHARACTER_FILTER_TYPE.SERIES_ID, value: seriesId }} withSpace={true} />
            ),
        },
        {
            key: 'comics',
            title: 'Comics',
            component: <Comics filter={{ type: COMICS_FILTER_TYPE.SERIES_ID, value: seriesId }} />,
        },
    ]

    return (
        <Query<IData, IVariables>
            query={FETCH_SERIES_BY_ID}
            variables={{
                seriesId,
            }}
        >
            {({ loading, error, data }) => {
                return (
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <SingleSeries data={getCardDetailsData(data)}>
                                <Tabs id="tabComicDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </SingleSeries>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export type ISeriesDetails = IProps
export default seriesDetails
