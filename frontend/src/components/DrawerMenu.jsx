import React from 'react';
import { Drawer } from 'antd';

const DrawerMenu = (props) => {
  return (
    <Drawer
      title={props.title}
      placement="left"
      onClose={() => props.setVisible(false)}
      visible={props.visible}
    >
      {props.items.map((item) => <p key={item.value}><a onClick={() => props.setValue(item.value)}>{item.label}</a></p>)}
    </Drawer>
  )
}

export default DrawerMenu
