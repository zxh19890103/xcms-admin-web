import React from 'react'

import { Panel } from '../widgets/panel.jsx'
import { ToolTip } from '../widgets/tooltip.jsx'
import { Checkbox } from '../widgets/checkbox.jsx'
import { Select } from '../widgets/select.jsx'
import { RadioButtonGroup } from '../widgets/radioButton.jsx'
import { CheckboxGroup, Checker } from '../widgets/checkboxGroup.jsx'
import { DatePicker } from '../widgets/datepicker.jsx'
import { Modal } from '../widgets/modal.jsx'
import { TabGroup } from '../widgets/tab.jsx'
import { Pager } from '../widgets/pager.jsx'
import { Alert, AlertGroup } from '../widgets/alert.jsx'

import { toggleValueInArray } from '../utils'

export default class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: {
        alert: {
          hidden: true
        }
      },
      yesOrNo: false,
      selectedItems: ['nadal', 'singhi'],
      selectedValue: 'nadal',
      form: {
        selected: ''
      },
      pager: {
        page: 1
      },
      table: {
        all: false,
        data: [
          { id: 'nadal', name: 'Nadal', age: 32, gender: 'Male' },
          { id: 'singhi', name: 'Singhi', age: 30, gender: 'Male' },
          { id: 'fredeler', name: 'Fredeler', age: 40, gender: 'Female' }
        ]
      }
    }
  }

  // #1
  _renderButtons() {
    return (
    <Panel title="按钮" type="lite">
      <button type="button" className="btn btn--default">默认</button>
      &nbsp;
      <button type="button" className="btn btn--primary">默认</button>
      &nbsp;
      <button type="button" className="btn btn--danger">危险</button>
      &nbsp;
      <button type="button" className="btn btn--warning">警告</button>
      &nbsp;
      <button type="button" className="btn btn--success">安全</button>
      &nbsp;
      <button type="button" className="btn btn--success btn--small">安全</button>
      <br/>
      <br/>
      <div className="btnGroup">
        <button type="button" className="btn btn--success">你好啊</button>
        <button type="button" className="btn btn--success">你好啊</button>
        <button type="button" className="btn btn--success">你好啊</button>
      </div>
    </Panel>
    )
  }

  // #2
  _renderAlerts() {
    return (
    <Panel title="Alert">
      <Alert type="success" icon="fa fa-bell" text="Alert is here, please pay a little your atention on this panel."/>
    </Panel>
    )
  }

  // #3
  _renderLabels() {
    return (
    <Panel title="Label" type="dark">
      <label className="label label--default">Default</label>
      <label className="label label--success">Success</label>
      <label className="label label--primary">Primary</label>
      <label className="label label--danger">Danger</label>
      <label className="label label--warning">Warning</label>
      <label className="label label--lite">Lite</label>
      <label className="label label--dark">Dark</label>
    </Panel>
    )
  }

  toggleTableRowSelect = e => {
    this.setState(prevState => {
      const table = prevState.table
      if (e.all) {
        table.all = !table.all
        table.data.forEach(row => {
          row.__selected = table.all
        })
      } else {
        e.__selected = !e.__selected
      }
      return { table }
    })
  }

  // #4
  _renderTables() {
    return (
    <Panel title="表格" type="primary">
      <table className="table">
        <thead>
          <tr>
            <th className="checkCell"><Checker data={{ all: true }} value={this.state.table.all} onChangeRequest={this.toggleTableRowSelect}/></th>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.table.data.map(item => {
              return (
                <tr key={item.id}>
                  <td className="checkCell"><Checker data={item} value={item.__selected} onChangeRequest={this.toggleTableRowSelect}/></td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </Panel>
    )
  }

  handleYesOrNo = () => {
    this.setState(prevState => {
      return { yesOrNo: !prevState.yesOrNo }
    })
  }

  handleItemSelect = (e) => {
    this.setState(prevState => {
      toggleValueInArray(e, prevState.selectedItems)
      return { selectedItems: prevState.selectedItems }
    })
  }

  handleItemChecked = (e) => {
    this.setState({ selectedValue: e })
  }

  handleSelectChange = (e) => {
    this.setState(prevState => {
      prevState.form.selected = e
      return { form: prevState.form }
    })
  }

  // #5
  _renderForms() {
    return (
    <Panel title="表单" type="warning">
      <form className="form">
        <div className="formGroup">
          <label className="formGroup__label">
            标题<ToolTip type="hover" body="Toloo Blue bird. This is my home, pls dont step in."/>
          </label>
          <div className="formGroup__control formGroup__control--invalid">
            <input type="text" placeholder="请输入标题"/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">内容</label>
          <div className="formGroup__control formGroup__control--valid">
            <textarea placeholder="请输入内容"/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">是否</label>
          <div className="formGroup__control">
            <Checkbox value={this.state.yesOrNo} onChangeRequest={this.handleYesOrNo}/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">单选</label>
          <div className="formGroup__control">
            <Select onChangeRequest={this.handleSelectChange} placeholder="请选择啊" value={this.state.form.selected} options={[{ text: '篮球', value: 'basketball' }, { text: '足球', value: 'football' }, { text: '台球', value: 'billiards' }]}/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">单选框</label>
          <div className="formGroup__control formGroup__control--valid">
            <RadioButtonGroup onChangeRequest={this.handleItemChecked} value={this.state.selectedValue} options = {[{ text: '纳达尔', value: 'nadal' }, { text: '费德勒', value: 'federle' }, { text: '猩猩', value: 'singhi' }]} itemWidth="120px"/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">复选框</label>
          <div className="formGroup__control formGroup__control--valid">
            <CheckboxGroup onChangeRequest={this.handleItemSelect} value={this.state.selectedItems} options={[{ text: '纳达尔', value: 'nadal' }, { text: '费德勒', value: 'federle' }, { text: '猩猩', value: 'singhi' }]} itemWidth="120px"/>
          </div>
        </div>
        <div className="formGroup">
          <label className="formGroup__label">日期</label>
          <div className="formGroup__control">
            <DatePicker minView="d" format="YYYY-MM-DD"/>
          </div>
        </div>
      </form>
    </Panel>
    )
  }

  // #6
  _renderGrids() {
    return (
    <Panel title="珊格">
      <div className="grid">
        <div className="grid__col--4" style={ {backgroundColor:'#abc'}}>
          grid__col--4
        </div>
        <div className="grid__col--12" style={{backgroundColor:'#789'}}>
          grid__col--12
        </div>
        <div className="grid__col--8" style={{backgroundColor:'#567'}}>
          grid__col--8
        </div>
        <div className="grid__col--8" style={{backgroundColor:'#345'}}>
          grid__col--8
        </div>
      </div>
    </Panel>
    )
  }

  // #7
  _renderModals() {
    return (
    <Panel title="模态窗口" type="success">
      <div>
        <a onClick={this.toggleModal} href="javascript:;">Alert</a>
      </div>
      <Modal title="你好" isOpen={!this.state.modal.alert.hidden} onCancelRequest={this.cancelSaving} onCloseRequest={this.toggleModal} onConfirmRequest={this.saveSomething}>
        <p>
          经历成功和磨难之后，崔永元更老练成熟了。但成熟未必全是好事，成熟从来具有两面性。也许，人们更喜爱初出茅庐、带些稚气的崔永元。
          继因公开反对转基因食品而与多方论战之后，崔永元又一次站到了舆论的中心。
          起因是电影《手机2》要开拍，2003年上映的《手机》，讲述了著名主持人严守一出轨的故事，严守一的背景设定、经历都与崔永元高度相似，被不少观众视作影射现实之作。
        </p>
      </Modal>
    </Panel>
    )
  }

  // #8
  _renderTabs() {
    const options = [
      { text: '商品介绍', value: 'goodsdesc' },
      { text: '规格与包装', value: 'specandpack' },
      { text: '售后保障', value: 'saled' }
    ]
    return (
      <Panel title="Tab" type="dark">
        <TabGroup options={options}>
          <div>
            由于 React的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
          </div>
          <div>
          这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机。
          React主要用于构建UI。你可以在React里传递多种类型的参数，如声明代码，帮助你渲染出UI、也可以是静态的HTML DOM元素、也可以传递动态变量、甚至是可交互的应用组件。
          </div>
          <div>
          1.声明式设计：React采用声明范式，可以轻松描述应用。
          2.高效：React通过对DOM的模拟，最大限度地减少与DOM的交互。
          3.灵活：React可以与已知的库或框架很好地配合。
          </div>
        </TabGroup>
      </Panel>
    )
  }

  handlePage = e => {
    this.setState({
      pager: { page: e }
    })
  }

  // #9
  _renderPager() {
    return (
      <Panel title="Pager" type="warning">
        <Pager page={this.state.pager.page} total={120} pageSize={12} itemCount={6} onPageChangeRequest={this.handlePage}/>
      </Panel>
    )
  }

  render() {
    return (
      <div className="panelGroup">
        {this._renderAlerts()}
        {this._renderPager()}
        {this._renderTabs()}
        {this._renderButtons()}
        {this._renderForms()}
        {this._renderGrids()}
        {this._renderLabels()}
        {this._renderModals()}
        {this._renderTables()}
      </div>
    )
  }

  // #region modal
  toggleModal = () => {
    this.setState(prevState => {
      prevState.modal.alert.hidden = !prevState.modal.alert.hidden
      return prevState
    })
  }

  saveSomething = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1 * 1000)
    })
  }

  cancelSaving = () => {
    // todo.....
    return null
  }
  // #endregion
}
