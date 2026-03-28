import React from "react";
import {
LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid
} from "recharts";

function AdvancedAnalytics({disasters}){

const data=disasters.map((d,i)=>({
time:i,
intensity:d.intensity
}));

return(

<div className="analytics">

<LineChart width={600} height={250} data={data}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="time"/>
<YAxis/>
<Tooltip/>
<Line dataKey="intensity" stroke="#ff4d4d"/>
</LineChart>

</div>

);

}

export default AdvancedAnalytics;