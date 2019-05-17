import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { ICardDetails } from '../../../components/CardList/CardDetails/types'
import { ITab } from '../../../components/Tabs/types'
import { FETCH_SERIES_BY_ID } from '../../../shared/graphqlQuery'

import Tabs from '../../../components/Tabs'
import SingleSeries from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'
import { ENUM_FILTER as CHARACTER_FILTER_TYPE } from '../../CharacterList/enum'
import { ENUM_FILTER as COMICS_FILTER_TYPE } from '../../ComicList/enum'

const Characters = lazy(() => import('../../CharacterList'))
const Comics = lazy(() => import('../../ComicList'))

const seriesDetails: FC<IProps> = props => {
    const seriesId = props.match.params.id

    return (
        <Query<IData, IVariables>
            query={FETCH_SERIES_BY_ID}
            variables={{
                seriesId,
            }}
        >
            {({ loading, error, data }) => {
                let series: ICardDetails | any = null

                if (data && data.container && data.container.results && data.container.results.length > 0) {
                    series = {
                        id: data.container.results[0].id,
                        text: data.container.results[0].title,
                        image: `${data.container.results[0].thumbnail.path}/portrait_incredible.${
                            data.container.results[0].thumbnail.extension
                        }`,
                        description: data.container.results[0].description,
                    }
                }

                const defaultTab = 'characters'
                const tabs: ITab[] = [
                    {
                        key: defaultTab,
                        title: 'Characters',
                        component: (
                            <Characters
                                filter={{ type: CHARACTER_FILTER_TYPE.SERIES_ID, value: seriesId }}
                                withSpace={true}
                            />
                        ),
                    },
                    {
                        key: 'comics',
                        title: 'Comics',
                        component: <Comics filter={{ type: COMICS_FILTER_TYPE.SERIES_ID, value: seriesId }} />,
                    },
                ]

                return (
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <SingleSeries data={series}>
                                <Tabs id="tabComicDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </SingleSeries>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export default seriesDetails
