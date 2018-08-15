import React from 'react'
import { Form, Input, Select } from 'antd'

interface FormItem {
  key: string,
  initialValue: any,
  type: 'input' | 'select'
}
interface FormMapProps {
  items: Array<FormItem>
}
export default class FormMap extends React.Component {
  static defaultProps = {
    length: Infinity
  }
  state: {
    previewVisible: boolean // 预览图片 Modal 的 Visible 属性
    previewImage: string // 预览图片的 url
    fileList: Array<any>
  }
  props: FormMapProps

  getItemByType = (item) => {
    const { type, configs } = item
    let FieldItem

    switch (type) {
      case 'Input':
        FieldItem = <Input  {...configs} />
        break
      case 'Select':
        FieldItem = <Select  {...configs} />
        break
      default:
        FieldItem = <Input  {...configs} />
    }

    return FieldItem
  }
  renderItem = item => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { key, initialValue, FormItemConfigs } = item

    return (
      <Form.Item
        {...FormItemConfigs}
      >
        {
          getFieldDecorator(key, {
            initialValue: initialValue || undefined,
          })(
            this.getItemByType(item)
          )}
      </Form.Item>
    )
  }

  renderForm = () => {
    const { items } = this.props
    return items.map(item => {
      return (
        <React.Fragment key={item.key}>
          {this.renderItem(item)}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    )
  }
}




