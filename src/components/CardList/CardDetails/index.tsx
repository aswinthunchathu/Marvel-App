/*
    This is a dump component which shows details about the selected card
    @props{
        data: ICardDetails (optional)
        showAsBackgroundImage: boolean -- if true, renders the given image as background image
    }
*/

import React, { FC } from 'react'
import { Jumbotron } from 'react-bootstrap'

import { IProps, ICardDetails } from './types'
import style from './card-details.module.scss'

import Message, { MESSAGE_TYPES } from '../../UI/Message'
import Image from '../../UI/Image'
import { GENERIC_ERROR } from '../../../shared/constants'

const cardDetails: FC<IProps> = props => {
    return props.data ? (
        <div
            className={style['container']}
            style={
                props.showAsBackgroundImage === true
                    ? {
                          backgroundImage: `url(${props.data.image})`,
                      }
                    : {}
            }
        >
            <div className={style['bg-gradient']}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Jumbotron fluid className={style['jumbotron-style']}>
                                <div className="row">
                                    <h1 className="col-12">{props.data.text}</h1>
                                </div>
                                <div className="row align-items-center">
                                    {!props.showAsBackgroundImage && (
                                        <div className="col-6 col-sm-5 col-lg-3 col-xl-2 justify-content-center mx-auto mb-5 mb-lg-0">
                                            <Image
                                                className="img-fluid"
                                                src={props.data.image}
                                                alt={props.data.text}
                                                placeholder={props.data.image}
                                            />
                                        </div>
                                    )}
                                    <div
                                        className={
                                            props.showAsBackgroundImage === true
                                                ? 'col-12'
                                                : 'col-12 col-sm-7 col-lg-9 col-xl-10'
                                        }
                                    >
                                        <p>
                                            {props.data.description
                                                ? props.data.description
                                                : 'No description available'}
                                        </p>
                                    </div>
                                </div>
                            </Jumbotron>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 tab-style">{props.children}</div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Message type={MESSAGE_TYPES.ERROR}>{GENERIC_ERROR}</Message>
    )
}

export type ICardDetails = ICardDetails
export type ICardData = IProps
export default cardDetails
