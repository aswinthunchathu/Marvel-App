/*
    This is a dump component which renders a card view
    @props{
        image: string
        alt: string
        text: string
        floatingLabel: boolean (optional)
        placeholderImage: string (optional)
    }
*/

import React, { FC } from 'react'

import style from './card.module.scss'
import { IProps } from './type'

import Image from '../Image'

const card: FC<IProps> = props => {
    let image: any = props.image
    const css = [style['card']]

    if (props.floatingLabel) {
        css.push(style['card-floating'])
    }

    return (
        <div className={css.join(' ')} title={props.text}>
            {props.floatingLabel ? (
                <div className={style['card-image']}>
                    <Image
                        src={props.image}
                        alt={props.alt}
                        className="img-fluid"
                        placeholder={props.placeholderImage ? props.placeholderImage : undefined}
                    />
                </div>
            ) : (
                <Image
                    src={image}
                    alt={props.alt}
                    className="img-fluid"
                    placeholder={props.placeholderImage ? props.placeholderImage : undefined}
                />
            )}
            <div className={style['card-content']}>{props.text}</div>
        </div>
    )
}

export default card
