/*
    This is a dump component which renders tab view
    @props{
        id: string
        defaultActiveKey: string -- active tab by default
        tabs: ITab[] -- array of tab data
    }
*/

import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, InputGroup, Button } from 'react-bootstrap'

import style from './search.module.scss'
import { IProps, IState } from './types'
import { SEARCH_KEY } from '../../shared/constants'

class Search extends Component<IProps, IState> {
    state = {
        isSearched: false,
        key: '',
    }

    onSubmit = (event: any) => {
        event.preventDefault()
        const key = event.target.elements.txtSearch.value
        if (key !== '') {
            this.setState({
                isSearched: true,
                key,
            })
            event.target.elements.txtSearch.value = ''
        }
    }

    componentDidUpdate(__: any, prevState: IState) {
        if (!prevState.isSearched && this.state.isSearched) {
            this.setState({
                isSearched: false,
            })
        }
    }

    render() {
        const css = [style['search'], this.props.className]

        return (
            <Fragment>
                <Form className={css.join(' ')} onSubmit={this.onSubmit}>
                    <Form.Group controlId="app-search" className="m-0">
                        <InputGroup>
                            <Form.Control size="lg" type="text" name="txtSearch" />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" type="submit">
                                    <div className={style['search-icon']}>
                                        <div className={style['search-icon__circle']} />
                                        <div className={style['search-icon__rectangle']} />
                                    </div>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
                {this.state.isSearched && <Redirect to={`${this.props.redirectTo}?${SEARCH_KEY}=${this.state.key}`} />}
            </Fragment>
        )
    }
}

export default Search
