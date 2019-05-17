import React, { FC, lazy } from 'react'
import { Query } from 'react-apollo'

import { IProps, IData, IVariables } from './types'
import { ICardDetails } from '../../../components/CardList/CardDetails/types'
import { ITab } from '../../../components/Tabs/types'
import { FETCH_COMIC_BY_ID } from '../../../shared/graphqlQuery'

import Tabs from '../../../components/Tabs'
import Comic from '../../../components/CardList/CardDetails'
import ErrorBoundary from '../../../hoc/ErrorHandler'
import WithLoading from '../../../hoc/WithLoading'

import { ENUM_FILTER } from '../../CharacterList/enum'

const Characters = lazy(() => import('../../CharacterList'))

const characterDetails: FC<IProps> = props => {
    const comicId = props.match.params.id

    return (
        <Query<IData, IVariables>
            query={FETCH_COMIC_BY_ID}
            variables={{
                comicId,
            }}
        >
            {({ loading, error, data }) => {
                let comic: ICardDetails | any = null

                if (data && data.container && data.container.results && data.container.results.length > 0) {
                    comic = {
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
                            <Characters filter={{ type: ENUM_FILTER.COMIC_ID, value: comicId }} withSpace={true} />
                        ),
                    },
                ]

                return (
                    <ErrorBoundary error={error}>
                        <WithLoading fetching={loading}>
                            <Comic data={comic}>
                                <Tabs id="tabComicDetails" defaultActiveKey={defaultTab} tabs={tabs} {...props} />
                            </Comic>
                        </WithLoading>
                    </ErrorBoundary>
                )
            }}
        </Query>
    )
}

export default characterDetails
