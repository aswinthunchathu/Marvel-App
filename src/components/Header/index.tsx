/*
    This is a dump component which renders app header
    @state{
        open: boolean -- controls opening and closing of side menu in mobile views
    }
*/

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import style from './header.module.scss'
import logo from '../../assets/images/logo-mobile.png'

import Sidebar from './Sidebar'
import NavigationItems from './NavigationItems'
import { isMobile } from '../../shared/util'
import { IState } from './types'
import Search from '../Search'

class Header extends Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            open: false,
        }
    }

    toggleSideBar = () => {
        if (isMobile()) {
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
                <Search className={style['search-mb']} redirectTo="/search" />
                <CSSTransition in={this.state.open} timeout={300} classNames="slide-left">
                    <Fragment>
                        <Sidebar>
                            <NavigationItems onLinkClick={this.toggleSideBar} />
                        </Sidebar>
                        {this.state.open && <div className={style['sidebar-drop']} onClick={this.toggleSideBar} />}
                    </Fragment>
                </CSSTransition>
                <Link to="/" className={style['brand-holder']}>
                    <img src={logo} alt="logo" />
                </Link>
            </header>
        )
    }
}

export default Header
