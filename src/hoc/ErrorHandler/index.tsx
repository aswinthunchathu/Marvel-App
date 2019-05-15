import React, { Component } from 'react'

import { IProps } from './type'
import Message, { MESSAGE_TYPES } from '../../components/UI/Message'
import { GENERIC_ERROR } from '../../shared/constants'

class ErrorBoundary extends Component<IProps> {
    hasError: any

    componentDidCatch() {
        this.setState({
            hasError: true,
        })
    }

    render() {
        if (this.props.error || this.hasError) {
            return <Message type={MESSAGE_TYPES.ERROR}>{GENERIC_ERROR}</Message>
        }

        return this.props.children
    }
}

export default ErrorBoundary
