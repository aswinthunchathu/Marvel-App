/*
    This is a container component which displays the search results
*/

import React, { FC } from 'react'
import { IProps } from './types'
import qs from 'qs'

const searchResults: FC<IProps> = props => {
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    })

    return <div>{query['key']}</div>
}

export { searchResults as default }
