import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CSSTransition } from 'react-transition-group'

import Pill from '../../components/UI/Pill'
import { IProps, IState } from './types'
import Loader from '../../components/UI/Loader'
import Message, { MESSAGE_TYPES } from '../../components/UI/Message'
import { NO_MORE_DATA } from '../../shared/constants'

class InfinityScroller extends Component<IProps, IState> {
    timer: any

    state = {
        showPill: false,
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.data.length !== prevProps.data.length) {
            clearTimeout(this.timer)
            this.setState(
                {
                    showPill: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            showPill: false,
                        })
                    }, 4000)
                }
            )
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <Fragment>
                <InfiniteScroll
                    dataLength={this.props.data.length}
                    next={this.props.loadData}
                    hasMore={this.props.loading || this.props.pagination.total > this.props.data.length}
                    loader={<Loader />}
                    endMessage={<Message type={MESSAGE_TYPES.NO_MORE_DATA}>{NO_MORE_DATA}</Message>}
                >
                    {this.props.children}
                </InfiniteScroll>

                <CSSTransition mountOnEnter unmountOnExit in={this.state.showPill} timeout={750} classNames="slide-in">
                    <Pill text={`Showing ${this.props.data.length} of ${this.props.pagination.total}`} key="pill" />
                </CSSTransition>
            </Fragment>
        )
    }
}

export default InfinityScroller
