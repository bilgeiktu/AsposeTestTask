import React, { FC, useEffect, useState } from 'react';
import {Select,Form,Row,Col} from 'antd'

const {Option} = Select;
const {Item} = Form;

type Props = {
    keys:string[]
    keyProps: (keyProps:string[]) => void
    graph: (name:string) => void

}

const GraphOptions:FC<Props> = (props:Props) => {
    const [xProp,setXprop] = useState('')
    const [yProp,setYprop] = useState('')
    const [graphName,setGrapName] = useState('')

    useEffect(()=>{
        props.keyProps([xProp,yProp])
    },[xProp,yProp])

    useEffect(()=>{
        props.graph(graphName)
    })
    
    return (
        <div>
            <Row>
            <Col span={4} offset={7}>
            <Item label="Graph"  labelCol={{span:4}} wrapperCol={{span:1}}>
           <Select value={graphName} style={{minWidth:150,textAlign:"left"}} onChange={setGrapName}>
            <Option key={"1"} value="linear">Linear</Option>
            <Option key={"2"} value="pieChart">Piechart</Option>
           </Select>
           </Item>
                </Col>
                <Col span={4} offset={0}>
            <Item label="x"  labelCol={{span:1}} wrapperCol={{span:1}}>
           <Select value={xProp} style={{minWidth:150,textAlign:"left"}} onChange={setXprop}>
            {props.keys.filter(x=>x!==yProp).map((k,index)=><Option key={k+index} value={k}>{k}</Option>)}
           </Select>
           </Item>
                </Col>
           <Col span={4}>
           <Item label="y" wrapperCol={{span:1}}>
           <Select value={yProp} style={{minWidth:150,textAlign:"left"}}  onChange={setYprop}>
            {props.keys.filter(y=>y!==xProp).map((k,index)=><Option key={k+index} value={k}>{k}</Option>)}
           </Select>
           </Item>
           </Col>
           </Row>
        </div>
    );
};

export default GraphOptions;