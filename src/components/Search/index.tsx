/*
    This is a dump component which renders tab view
    @props{
        id: string
        defaultActiveKey: string -- active tab by default
        tabs: ITab[] -- array of tab data
    }
*/

import React, { FC } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

import style from './search.module.scss'
import { IProps } from './types'

const search: FC<IProps> = props => {
    const css = [style['search'], props.className]

    const submit = (event: any) => {
        event.preventDefault()
        const searchKey = event.target.elements.txtSearch.value
        console.log(searchKey)
    }

    return (
        <Form className={css.join(' ')} onSubmit={submit}>
            <Form.Group controlId="app-search" className="m-0">
                <InputGroup className="mb-3">
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
    )
}

export default search
