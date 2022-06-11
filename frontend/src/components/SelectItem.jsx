import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectItem = (props) => {
  return (
    props.items.length > 0 ?
      <Select defaultValue={props.items[0].value} style={{ width: 120 }} onChange={props.handleChange}>
        {props.items.map((item) => <Option key={item.value} value={item.value}>{item.label}</Option>)}
      </Select>
      :
      ""
  )
}

export default SelectItem
