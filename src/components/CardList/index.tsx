/*
    This is a dump component which shows list of cards for the given input array
    @props{
        data: ICardData[] (optional)
        loadData: () => void -- load next set of data for infinite scrolling
        loading: boolean
        pagination: IPagination
        noSpace: boolean (optional) -- if true, renders cards without space in between
    }
*/
import React, { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'

import { IProps, ICardData } from './types'

import Card from '../UI/Card'
import InfinityScroller from '../../hoc/InfinityScroller'

const cardList: FC<IProps> = props => {
    const data = props.data && props.data.length > 0 ? props.data : []
    const elements =
        data.length > 0
            ? data.map(item => {
                  const card = (
                      <Card
                          floatingLabel={props.noSpace ? props.noSpace : false}
                          text={item.text}
                          image={item.image}
                          alt={item.text}
                          placeholderImage={item.placeholderImage}
                      />
                  )

                  return (
                      <CSSTransition timeout={1200} classNames="fade" key={item.id}>
                          <div
                              className={
                                  props.noSpace
                                      ? 'col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 px-0'
                                      : 'col-6 col-sm-4 col-md-2 col-lg-3 col-xl-2 mb-4'
                              }
                          >
                              {item.link ? (
                                  <Link to={item.link} className="text-decoration-none d-block h-100">
                                      {card}
                                  </Link>
                              ) : (
                                  card
                              )}
                          </div>
                      </CSSTransition>
                  )
              })
            : []

    const container = (
        <div className="container-fluid">
            {elements.length > 0 && props.children}
            <TransitionGroup component="div" className="row">
                {elements}
            </TransitionGroup>
        </div>
    )

    return (
        <div className="w-100">
            {props.infinityScrolling ? (
                <InfinityScroller
                    loading={props.loading}
                    data={data}
                    loadData={props.loadData}
                    pagination={props.pagination}
                >
                    {container}
                </InfinityScroller>
            ) : (
                container
            )}
        </div>
    )
}

export type ICardData = ICardData
export type ICardList = IProps
export default cardList
