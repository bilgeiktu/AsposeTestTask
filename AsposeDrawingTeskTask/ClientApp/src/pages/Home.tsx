import React, {FC} from 'react';
import { Steps, message } from 'antd';
import ComponentsBySteps from "../components/ComponentsBySteps";
import {ArrowLeftOutlined, ArrowRightOutlined, RedoOutlined} from "@ant-design/icons";

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];

const Home:FC = () => {

    const { Step } = Steps;

    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    }
    return (
        <div style={{height:"100%",width:"100%",textAlign:"center"}}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            <ComponentsBySteps value={current}/>
                {current < steps.length - 1 && (
                        <ArrowRightOutlined  onClick={()=>next()}  className={"arrow-button-right hover-fx"} style={{fontSize:36}}/>
                )}
                {current === steps.length - 1 && (
                    <RedoOutlined className={"arrow-button-retry hover-fx"}  style={{fontSize:36}} onClick={() => setCurrent(0)} />
                )}
                {current > 0 && (
                        <ArrowLeftOutlined  className={"arrow-button-left hover-fx"} onClick={()=>prev()} style={{fontSize:36}}/>
                )}
        </div>
    );
};

export default Home;