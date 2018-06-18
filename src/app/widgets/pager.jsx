import React, { Component } from 'react'

export const calculatePagerData = (page, total, pageSize, itemCount) => {
  const pageCount = Math.ceil(total / pageSize)
  if (page <= 0) page = 1
  if (page > pageCount) page = pageCount
  let first = 1
  let previous = page < 2 ? 1 : page - 1
  let next = page < pageCount ? page + 1 : pageCount
  let last = pageCount
  const pd = { items: [], pageCount, page, first, previous, last, next }
  if(total === 0) return pd
  let left = Math.ceil(itemCount / 2)
  let right = itemCount - left
  let start = page - left + 1
  let end = page + right
  if(start < 1) {
      end += 1 - start
      start = 1
  }
  if(end > pageCount) {
      start -= end - pageCount
      if(start < 1) start = 1
      end = pageCount
  }
  for(let i = start; i <= end; i ++) {
    pd.items.push(i)
  }
  return pd
}

/**
 * Props: page, pageSize, total, itemCount, onPageChangeRequest
 */
export class Pager extends Component {
  constructor(props) {
    super(props)
    this.pageSize = this.props.pageSize || 12
    this.itemCount = this.props.itemCount || 5
  }

  handlePagerItemClick = e => {
    const page = Number(e.currentTarget.dataset.page)
    if (this.props.page === page) return
    this.props.onPageChangeRequest && this.props.onPageChangeRequest(page)
  }

  render() {
    const { total, page } = this.props
    const pd = calculatePagerData(page, total, this.pageSize, this.itemCount)
    let firstClass = 'pager__item'
    let previousClass = 'pager__item'
    let nextClass = 'pager__item'
    let lastClass = 'pager__item'
    if (pd.page === 1) firstClass += ' pager__item--disabled'
    if (pd.page === pd.previous) previousClass += ' pager__item--disabled'
    if (pd.page === pd.next) nextClass += ' pager__item--disabled'
    if (pd.page === pd.pageCount) lastClass += ' pager__item--disabled'
    return (
      <div className="pager">
        <ul className="pager__in">
          <li className={firstClass}><a href="javascript:;" data-page="1" onClick={this.handlePagerItemClick}><i className="fa fa-angle-double-left"/></a></li>
          <li className={previousClass}><a href="javascript:;" data-page={pd.previous} onClick={this.handlePagerItemClick}><i className="fa fa-angle-left"/></a></li>
          {
            pd.items.map(p => {
              let classList = 'pager__item'
              if (page === p) classList += ' pager__item--active'
              return (
                <li className={classList} key={p}>
                  <a href="javascript:;" data-page={p} onClick={this.handlePagerItemClick}>{p}</a>
                </li>
              )
            })
          }
          <li className={nextClass}><a href="javascript:;" data-page={pd.next} onClick={this.handlePagerItemClick}><i className="fa fa-angle-right"/></a></li>
          <li className={lastClass}><a href="javascript:;" data-page={pd.last} onClick={this.handlePagerItemClick}><i className="fa fa-angle-double-right"/></a></li>
        </ul>
      </div>
    )
  }
}
