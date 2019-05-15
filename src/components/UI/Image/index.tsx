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
        const css = [this.props.className, style['animation']]
        const cssPlaceholder = [style['image-placeholder'], style['animation']]

        if (this.state.isLoaded) {
            css.push(style['show'])
            cssPlaceholder.push(style['hide'])
        } else {
            cssPlaceholder.push(style['show'])
            css.push(style['hide'])
        }

        return (
            <div className="position-relative">
                <img src={this.props.src} alt={this.props.alt} onLoad={this.onLoad} className={css.join(' ')} />
                <img
                    className={cssPlaceholder.join(' ')}
                    src={this.props.placeholder ? this.props.placeholder : placeHolder}
                    alt="placeholder"
                />
            </div>
        )
    }
}

export default Image
