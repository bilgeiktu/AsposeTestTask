import React, {FC, useEffect, useState} from 'react';
import {message, Steps, Upload} from "antd";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {InboxOutlined} from "@ant-design/icons";
import Canvas from "./Canvas";
import GraphOptions from './GraphOptions';

type StepsProps = {
    value: number
}


const ComponentsBySteps: FC<StepsProps> = ({value}) => {

    const {Dragger} = Upload;
    
   const [data,setData] = useState<any[]>()
   const [keys,setKeys] = useState<string[]>([])
   const [keysProps,setKeyProps] = useState<string[]>([])
    const [graph,setGraph] = useState<string>('')
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://localhost:44387/File/FileUpload',
    };

    const onChange = (info: UploadChangeParam) => {
        const {status} = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        const response = info.file.response
       if(response){
         setData(JSON.parse(response.array[0]))
       }
    
    }

    const beforeUpload = (file: RcFile) => {
        const isCSV = file.type === 'text/csv' || 'application/vnd.ms-excel';
        if (!isCSV) {
            message.error(`${file.name} is not a csv file`);
        }
        return isCSV || Upload.LIST_IGNORE;
    }

    useEffect(()=>{
        if(data)
      setKeys(Object.keys(data[0]))
      console.log(keys);
    },[data])

    return (
        <div style={{marginTop:50}}> {(() => {
            switch (value) {
                case 0:
                    return (<Dragger {...props} style={{width: '50%', margin: "auto"}} onChange={onChange}
                                    beforeUpload={beforeUpload}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>)
                case 1:
                    return keys.length>0?<GraphOptions keys={keys} keyProps={(items:string[])=>setKeyProps(items)} graph={(name:string)=>setGraph(name)}/>:<></>
                case 2:
                    return data&&keys?<Canvas graphType={graph} propKey1={keysProps[0]} propKey2={keysProps[1]} data={data.filter((d,i)=>i<=40)}/>:<></>
                default:
                    return <></>
            }
        })()}
        </div>
    )
}

export default ComponentsBySteps;