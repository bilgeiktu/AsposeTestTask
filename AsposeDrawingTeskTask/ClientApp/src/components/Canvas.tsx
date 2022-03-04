import React, {FC, useEffect, useRef} from 'react';


type Props = {
    data:any[],
    propKey1:string,
    propKey2:string,
    graphType?:string
}


const Canvas:FC<Props> = (props:Props) => {
    console.log(props.graphType)
    const {data} = props
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas&&props.graphType === "linear") {
            canvas.height = window.innerHeight*0.6;
            canvas.width =  window.innerWidth*0.8;
            const {height,width} = canvas
            const c = canvas?.getContext('2d')
            if (c) {
                c.beginPath()
                c.moveTo(0,0)
                c.lineTo(0,window.innerHeight*0.5)
                c.lineTo(width,window.innerHeight*0.5)
                c.lineTo(width,0)
                c.stroke()
                c.beginPath()
                c.moveTo(0,height/2)            
               data.forEach((item,index)=> {
                   const x = 40*index;
                   const y = height/2-parseInt(item[props.propKey2])*100
                   c.lineTo(x,y)
                   c.font = "12px Arial";
                   c.fillText(item[props.propKey1], x-5, 480);

                   if(parseInt(item[props.propKey2])>0){
                       c.fillRect(x-3,y-3,6,6)
                       c.fillText(item[props.propKey2], x-5, y-10);
                   }
                  else
                     c.fillText(item[props.propKey2], x-5, y+20);
                   c.fillRect(x-3,y-3,6,6)
               })
                c.stroke()

            }
        }
        if(canvas&&props.graphType==="pieChart"){
            var ctx = canvas.getContext("2d");
            canvas.height = window.innerHeight*0.6;
            canvas.width =  window.innerWidth*0.8;
  var colors = ['#4CAF50', '#00BCD4', '#E91E63', '#FFC107', '#9E9E9E', '#CDDC39', '#18FFFF', '#F44336', '#FFF59D', '#6D4C41'];
  var angles = [Math.PI * 0.3 , Math.PI * 0.7, Math.PI * 0.2, Math.PI * 0.4, Math.PI * 0.4];
  var offset = 10;
  var beginAngle = 0;
  var endAngle = 0;
  var offsetX, offsetY, medianAngle;
  const c = canvas?.getContext('2d')
  for(var i = 0; i < angles.length; i = i + 1) {
    beginAngle = endAngle;
    endAngle = endAngle + angles[i];
    medianAngle = (endAngle + beginAngle) / 2;
    offsetX = Math.cos(medianAngle) * offset;
    offsetY = Math.sin(medianAngle) * offset;
    if(c){
    c.beginPath();
    c.fillStyle = colors[i % colors.length];
    c.moveTo(200 + offsetX, 200 + offsetY);
    c.arc(200 + offsetX, 200 + offsetY, 120, beginAngle, endAngle);
    c.lineTo(200 + offsetX, 200 + offsetY);
    c.stroke();
    c.fill();
    }
  }
        }
    },[data])
    return (
           <canvas ref={canvasRef} id="myCanvas"/>
    );
};

export default Canvas;