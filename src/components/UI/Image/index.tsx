/*
    This is a dump component which renders an image
    @props{
        src: string
        alt: string
        className: string (optional)
        placeholder: string (optional)
    }
*/

import React, { Component } from 'react'
import style from './image.module.scss'
import { IProps } from './type'
import placeHolder from '../../../assets/images/placeholder.png'

class Image extends Component<IProps> {
    state = {
        isLoaded: false,
    }

    onLoad = () => {
        this.setState({
            isLoaded: true,
        })
    }

    render() {
        const css = ['position-relative', 'text-center', style['bg']]
        let backgroundImage = ''

        if (this.state.isLoaded) {
            backgroundImage = `url(${this.props.src})`
        } else {
            css.push(style['bg-blurred'])
            backgroundImage = `url(${this.props.placeholder ? this.props.placeholder : placeHolder})`
        }

        return (
            <div
                className={css.join(' ')}
                style={{
                    backgroundImage,
                }}
            >
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    onLoad={this.onLoad}
                    className={[this.props.className, style['hide']].join(' ')}
                />
            </div>
        )
    }
}

export type IImage = IProps
export default Image
