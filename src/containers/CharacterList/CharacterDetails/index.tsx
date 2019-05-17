/*
    This is a container component which displays details about a character.
*/

import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { FETCH_CHARACTER_BY_ID } from '../../../shared/graphqlQuery'
import { getCardDetailsData } from '../../../shared/util'

import Tabs, { ITabProps } from '../../../components/Tabs'
import Character from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'
import { ENUM_FILTER as COMIC_FILTER_TYPE } from '../../ComicList'
import { ENUM_FILTER as SERIES_FILTER_TYPE } from '../../SeriesList'

const Comics = lazy(() => import('../../ComicList'))
const Series = lazy(() => import('../../SeriesList'))

const characterDetails: FC<IProps> = props => {
    const characterId = props.match.params.id

    const defaultTab = 'comics'
    const tabs: ITabProps[] = [
        {
            key: defaultTab,
            title: 'Comics',
            component: (
                <Comics
                    filter={{
                        type: COMIC_FILTER_TYPE.CHARACTER_ID,
                        value: characterId,
                    }}
                />
            ),
        },
        {
            key: 'series',
            title: 'Series',
            component: (
                <Series
                    filter={{
                        value: characterId,
                        type: SERIES_FILTER_TYPE.CHARACTER_ID,
                    }}
                />
            ),
        },
    ]

    return (
        <Query<IData, IVariables>
            query={FETCH_CHARACTER_BY_ID}
            variables={{
                characterId: characterId,
            }}
        >
            {({ loading, error, data }) => {
                return (
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <Character data={getCardDetailsData(data)} showAsBackgroundImage={true}>
                                <Tabs id="tabCharacterDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </Character>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export type ICharacterDetails = IProps
export default characterDetails
