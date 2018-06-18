let __id__ = 0

export class Message {
  type = 'primary'
  closable = false
  text = ''
  icon = ''
  constructor(options) {
    this.id = __id__ ++
    Object.assign(this, options)
  }
}
