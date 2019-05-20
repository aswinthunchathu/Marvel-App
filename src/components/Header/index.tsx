/*
    This is a dump component which renders app header
    @state{
        open: boolean -- controls opening and closing of side menu in mobile views
    }
*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import style from './header.module.scss'
import logo from '../../assets/images/logo-mobile.png'

import Sidebar from './Sidebar'
import NavigationItems from './NavigationItems'
import { isMobile } from '../../shared/util'
import { IState } from './types'

class Header extends Component<{}, IState> {
    isMobile: boolean = false

    constructor(props: {}) {
        super(props)
        this.isMobile = isMobile()
        this.state = {
            open: !this.isMobile,
        }
    }

    toggleSideBar = () => {
        if (this.isMobile) {
            this.setState(prev => ({
                open: !prev.open,
            }))
        }
    }

    render() {
        const css = ['container-fluid', style['header']]
        return (
            <header className={css.join(' ')}>
                <div className={style['hamburger-menu']}>
                    <input type="checkbox" onChange={this.toggleSideBar} checked={this.state.open} />
                    <span />
                    <span />
                    <span />
                </div>

                <CSSTransition in={this.state.open} timeout={300} classNames="slide-left" unmountOnExit>
                    <Sidebar click={this.toggleSideBar}>
                        <NavigationItems onLinkClick={this.toggleSideBar} />
                    </Sidebar>
                </CSSTransition>
                <Link to="/" className={style['brand-holder']}>
                    <img src={logo} alt="logo" />
                </Link>
            </header>
        )
    }
}

export default Header
