/*
    This is a dump component which renders tab view
    @props{
        id: string
        defaultActiveKey: string -- active tab by default
        tabs: ITab[] -- array of tab data
    }
*/

import React, { FC, Suspense } from 'react'
import { Tab, TabContainer, Tabs } from 'react-bootstrap'
import qs from 'qs'

import './tabs.scss'
import { IProps, ITab } from './types'
import Loader from '../UI/Loader'

const tabs: FC<IProps> = props => {
    let selectedTab = props.defaultActiveKey
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    if (Object.keys(query).length > 0) {
        selectedTab = query['tab']
    }

    const onTabChange = (selectedTab: string) => {
        props.history.push(`${props.history.location.pathname}?tab=${selectedTab}`)
    }

    return (
        <TabContainer>
            <Tabs defaultActiveKey={selectedTab} id={props.id} onSelect={onTabChange} mountOnEnter unmountOnExit>
                {props.tabs.map(tab => (
                    <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
                        <div className="row">
                            <Suspense fallback={<Loader />}>{tab.component}</Suspense>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </TabContainer>
    )
}

export type ITabProps = ITab
export default tabs
