import { createSelector } from 'reselect'
import { connect } from 'react-redux'

export const makeAction = (type, payload, error = false) => {
  return {
    type,
    payload,
    error
  }
}

/**
 * ***********程序分析**************
 * 开始遍历 data，定义空对象 getters
 * A. 循环体，接收字符串Key
 *  1.  获得Key对应的值V
 *  2.  当getters[Key]存在时，返回getters[Key]
 *  3.  如果V是function，将此function写入getters，并返回函数
 *     否则，开始遍历V.deps，
 *        如果元素是字符串S，执行A，提供字符串S为参数，返回执行结果
 *        如果元素是function，不处理
 *      生成一个函数数组，以这个数组为参数，用reselect生成一个selector，将selector写入getters
 */

 /**
  * 作用：将属性定义（data）转换为props
  * 注意：定义一个选择器的时候，可以依赖选择器，但不能依赖选择器工厂函数（make为true）
  */
class Getters {

  constructor(data) {
    this.data = data
    this._getters = {}
  }

  toProps(state, props) {
    const _props = {}
    Object.keys(this.data).forEach(key => {
      const val = this.data[key]
      let getter = this.get(key)
      getter.make && (getter = getter())
      _props[key] = getter(state, props)
    })
    return _props
  }

  get(key) {
    if (this._getters[key]) return this._getters[key]
    const def = this.data[key]
    const t = typeof def
    if (t === 'function') {
      const getter = createSelector([def], value => value)
      this._getters[key] = getter
      return getter
    } else {
      // For input-selectors of createSelector
      def._getterDeps = []
      for (const dep of def.deps) {
        if (typeof dep === 'string') {
          def._getterDeps.push(this.get(dep))
        } else {
          def._getterDeps.push(dep)
        }
      }
      let getter = null
      if (def.make) {
        getter = () => createSelector(def._getterDeps, def.combiner)
        getter.make = true
      } else {
        getter = createSelector(def._getterDeps, def.combiner)
      }
      this._getters[key] = getter
      return getter
    }
  }
}

/**
 * 作用：生成容器组件的参数
 * @param {*} data: { key: (state, props) => { return ... }, key2: { deps: [], combiner: (...deps) => {} } }
 * @param {*} methods: { (state, props) => { return ... } }
 */
class ContainerArg {

  constructor(def) {
    this.data = def.data || {}
    this.methods = def.methods || {}
    this.getters = new Getters(this.data)
  }

  stateToProps() {
    return (state, props) => {
      return this.getters.toProps(state, props)
    }
  }

  dispatchToProps() {
    return (dispatch, props) => {
      const _props = {}
      Object.keys(this.methods).forEach(key => {
        _props[key] = (...args) => { this.methods[key](dispatch, props, ...args) }
      })
      return _props
    }
  }
}

/**
 * 作用：创建一个Redux Container
 * @param {*} view 视图组件
 * @param {*} cArgDef connect函数的参数定义
 */
const createContainer = (view, cArgDef) => {
  const cArg = new ContainerArg(cArgDef)
  return connect(
    cArg.stateToProps(),
    cArg.dispatchToProps()
  )(view)
}

export {
  ContainerArg,
  createContainer
}
