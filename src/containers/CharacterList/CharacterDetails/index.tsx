/*
    This is a container component which displays details about a character.
*/

import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { ICardDetails } from '../../../components/CardList/CardDetails/types'
import { FETCH_CHARACTER_BY_ID } from '../../../shared/graphqlQuery'

import Tabs from '../../../components/Tabs'
import Character from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'
import { ITab } from '../../../components/Tabs/types'
import { ENUM_FILTER as COMIC_FILTER_TYPE } from '../../ComicList'
import { ENUM_FILTER as SERIES_FILTER_TYPE } from '../../SeriesList'

const Comics = lazy(() => import('../../ComicList'))
const Series = lazy(() => import('../../SeriesList'))

const characterDetails: FC<IProps> = props => {
    const characterId = props.match.params.id

    return (
        <Query<IData, IVariables>
            query={FETCH_CHARACTER_BY_ID}
            variables={{
                characterId: characterId,
            }}
        >
            {({ loading, error, data }) => {
                let character: ICardDetails | any = null

                if (data && data.container && data.container.results && data.container.results.length > 0) {
                    character = {
                        id: data.container.results[0].id,
                        text: data.container.results[0].title,
                        image: `${data.container.results[0].thumbnail.path}/portrait_incredible.${
                            data.container.results[0].thumbnail.extension
                        }`,
                        description: data.container.results[0].description,
                    }
                }

                const defaultTab = 'comics'
                const tabs: ITab[] = [
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
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <Character data={character} showAsBackgroundImage={true}>
                                <Tabs id="tabCharacterDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </Character>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export default characterDetails
