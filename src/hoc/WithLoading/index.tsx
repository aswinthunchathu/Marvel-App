/*
    This is an higher order component to modify the wrapped component to indicate loading
    @props{
        children: ReactNode
        fetching: boolean
}
    }
*/
import React, { FC, Fragment } from 'react'

import { IProps } from './type'
import Loader from '../../components/UI/Loader'

const withLoading: FC<IProps> = props => {
    return <Fragment>{props.fetching ? <Loader /> : props.children}</Fragment>
}

export default withLoading
