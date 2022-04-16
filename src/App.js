import React from "react";
import "./App.css";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    ZAxis,
    Legend,
    Bar,
    Label,
    ScatterChart,
    Scatter,
    CartesianGrid,
} from "recharts";
import moment from 'moment';

const App = () => {
    const data = [
        { name: "Actividad completa", users: 3000, fill: '#9A46CE', color: '#9A46CE'},
        { name: "Actividad incompleta", users: 15000, fill: '#BDBDBD', color: '#676767'},
    ];

    const data_bar = [
        { name: "Average", users: 30000, fill: '#9A46CE', color: '#9A46CE'},
        { name: "Me", users: 15000, fill: '#0072CE', color: '#676767'},
    ];

    const data_bar_vert = [
        { name: "Average", time: 28, fill: '#9A46CE'},
        { name: "Me", time: 15, fill: '#0072CE'},
    ];

    const data_mult_bar = [
        { name: "nº de vistas", group: 30000, me: 25000},
        { name: "nº de contribuciones", group: 15000, me: 20000},
    ];

    //const dates_as_int = ["02/15/2022", "02/17/2022", "02/20/2022", "02/21/2022", "02/02/2022", "02/05/2022", "02/10/2022"];
    const dates_as_int = ["15/02/2022", "17/02/2022", "20/02/2022", "21/02/2022", "02/02/2022", "05/02/2022", "10/02/2022"];

    for(const i in dates_as_int){
        const s = dates_as_int[i].split("/")
        dates_as_int[i] = s[1]+"/"+s[0]+"/"+s[2]
    }

    const dates = dates_as_int.map(date => new Date(date).getTime());

    const data_scatter_group = [
        { x: dates[0], y: 1, z: 400},
        { x: dates[2], y: 2, z: 400},
        { x: dates[3], y: 3, z: 400},
    ];

    const data_scatter_me = [
        { x: dates[4], y: 1, z: 180},
        { x: dates[5], y: 1, z: 180},
        { x: dates[6], y: 1, z: 180},
        { x: dates[2], y: 2, z: 180},
        { x: dates[3], y: 3, z: 180},
    ];

    const tooltip = {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: '500',
        opacity: '0.9',
        border: '1px solid black',
        borderRadius: '3px',
        paddingLeft:'10px',
        paddingRight:'10px',
    };

    const customYAxisTicks = (value) => {
        if (value === 1) return "vistas";
        if (value === 2) return "entregas";
        if (value === 3) return "evaluaciones";
        else return " ";
    };

    const customTooltip = ({ active, payload, label}) => {
        if (active && payload && payload.length) {
            if (label === 'Average'){
                return (
                    <div className="custom-tooltip" style={tooltip}>
                        <g style={{"display": "flex", "flex-direction": "row", "gap": "10px"}}>
                            <img style={{"display": "block", "margin": "auto"}} src={"https://file.rendit.io/n/GF9KRU3erqN1IPVGkjUB.png"} alt={"people"}/>
                            <p className="label">{` : ${payload[0].value} vistas`}</p>
                        </g>

                    </div>
                );
            }else{
                return (
                    <div className="custom-tooltip" style={tooltip}>
                        <g style={{"display": "flex", "flex-direction": "row", "gap": "10px"}}>
                            <svg style={{"display": "block", "margin": "auto auto"}} width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                            </svg>
                            <p className="label">{` : ${payload[0].value} vistas`}</p>
                        </g>
                    </div>
                );
            }
        }
        return null;
    };
    const customMultiTooltip = ({ active, payload, label}) => {
        if (active && payload && payload.length) {
            const sublabel = label.split(' ').pop();
            return (
                <div className="custom-tooltip" style={tooltip}>
                    <g style={{"display": "flex", "flex-direction": "row", "gap": "10px"}}>
                        <svg style={{"display": "block", "margin": "auto auto"}} width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                        </svg>
                        <p className="label">{` : ${payload[0].value} ${sublabel}`}</p>
                    </g>
                    <g style={{"display": "flex", "flex-direction": "row", "gap": "10px"}}>
                        <img style={{"display": "block", "margin": "auto"}} src={"https://file.rendit.io/n/GF9KRU3erqN1IPVGkjUB.png"} alt={"people"}/>
                        <p className="label">{` : ${payload[1].value} ${sublabel}`}</p>
                    </g>
                </div>
            );
        }
        return null;
    };
    const customScatterTooltip = ({ active, payload}) => {
        if (active && payload && payload.length) {
            if (payload[2].value === 400){
                return (
                    <div className="custom-tooltip" style={tooltip}>
                        <g style={{"display": "flex", "flex-direction": "row", "margin-top": "10px"}}>
                            <img style={{"display": "block", "margin": "auto"}} src={"https://file.rendit.io/n/GF9KRU3erqN1IPVGkjUB.png"} alt={"people"}/>
                        </g>
                        <p className="label" style={{"color": "#9A46CE"}}>{`${customYAxisTicks(payload[1].value)}`}</p>
                        <p className="label" style={{"color": "#9A46CE"}}>{`${moment(payload[0].value).format('DD/MM/YY')}`}</p>
                    </div>
                );
            }else{
                return (
                    <div className="custom-tooltip" style={tooltip}>
                        <g style={{"display": "flex", "flex-direction": "row", "margin-top": "10px"}}>
                            <svg style={{"display": "block", "margin": "auto auto"}} width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                            </svg>
                        </g>
                        <p className="label" style={{"color": "#0072CE"}}>{`${customYAxisTicks(payload[1].value)}`}</p>
                        <p className="label" style={{"color": "#0072CE"}}>{`${moment(payload[0].value).format('DD/MM/YY')}`}</p>
                    </div>
                );
            }
        }
        return null;
    };

    const renderCustomizedScatterLegend = () => {
        return (
            <g style={{"display": "flex", "flex-direction": "row", "margin": "0 0 0 0"}}>
                <img style={{"display": "block", "margin": "auto"}} src={"https://file.rendit.io/n/GF9KRU3erqN1IPVGkjUB.png"} alt={"people"}/>
                <svg style={{"display": "block", "margin": "0 auto"}} width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                </svg>
            </g>
        );
    };
    const renderCustomizedLegend = () => {

        return (
            <g style={{"display": "flex", "flex-direction": "column", "gap": "13px"}}>
                <img style={{"display": "block", "margin": "auto"}} src={"https://file.rendit.io/n/GF9KRU3erqN1IPVGkjUB.png"} alt={"people"}/>
                <svg style={{"display": "block", "margin": "0 auto"}} width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                </svg>
            </g>
        );
    };

    const renderCustomizedLabel = (props) => {

        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, outerRadius, fill, color, percent, name } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 20) * cos;
        const my = cy + (outerRadius + 20) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        if(percent>0.5){
            return (
                <g>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                        {`${(percent * 100).toFixed(2)}%`}
                    </text>
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                    <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
                    <text x={ex + (cos >= 0 ? 1 : -1) * 24} y={ey} textAnchor={textAnchor} fill={color}>{`${name}`}</text>
                    <svg x={ex + (cos >= 0 ? 1 : -1) * 15 -6} y={ey-12} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 6.5C8.29563 6.5 9.75 5.04563 9.75 3.25C9.75 1.45437 8.29563 0 6.5 0C4.70437 0 3.25 1.45437 3.25 3.25C3.25 5.04563 4.70437 6.5 6.5 6.5ZM6.5 8.125C4.33062 8.125 0 9.21375 0 11.375V13H13V11.375C13 9.21375 8.66938 8.125 6.5 8.125Z" fill="#0072CE"/>
                    </svg>
                </g>
            );
        }else{
            return (
                <g>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                        {`${(percent * 100).toFixed(2)}%`}
                    </text>
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                    <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={color}>{`${name}`}</text>
                </g>
            );
        }


    };

  return (
      <div style={{ textAlign: "center", height: "300px"}}>
        <h1>Students Activity</h1>
        <div className="App">
          <PieChart width={600} height={500}>
            <Pie
                dataKey="users"
                isAnimationActive={true}
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={1}
                label={renderCustomizedLabel}
            >
            </Pie>
          </PieChart>
          <BarChart
              width={300}
              height={300}
              data={data_bar}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
              barSize={60}
          >
            <XAxis
                dataKey="name"
                tick={{fill: 'rgba(255,255,255,0)'}}
                tickLine={false}
                padding={{ left: 20, right: 10 }}
            >
                <Label value={"nº de vistas"} offset={10} position={"InsideBottom"}/>
            </XAxis>
            <YAxis />
            <Tooltip content={customTooltip} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
            <Legend content={renderCustomizedLegend} wrapperStyle={{top: 100, left: 200}}/>
            <Bar dataKey="users" animationDuration="1600" legendType={"none"}/>
          </BarChart>
          <BarChart
            width={500}
            height={300}
            data={data_mult_bar}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
            barSize={60}
          >
            <XAxis
                dataKey="name"
                tick={{fill: '#000'}}
                tickLine={false}
                padding={{ left: 20, right: 10 }}
            />
            <YAxis />
            <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.4)' }} content={customMultiTooltip}/>
            <Legend content={renderCustomizedLegend} wrapperStyle={{top: 100, left: 300}}/>
            <Bar dataKey="me" animationDuration="1600" fill={"#0072CE"}/>
            <Bar dataKey="group" animationDuration="1600" fill={"#9A46CE"}/>
          </BarChart>
          <BarChart
            width={350}
            height={300}
            data={data_bar_vert}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
            barSize={60}
            layout={'vertical'}
          >
            <XAxis type={"number"} />
            <YAxis dataKey="name" type="category"
                   padding={{ top: 20, bottom: 10 }}
                   tick={{fill: 'rgba(255,255,255,0)'}}
                   tickLine={false}>
                <Label value={"días"} offset={10} position={"InsideBottom"} angle={-90} textAnchor="end"/>
            </YAxis>
            <Tooltip content={customTooltip} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
            <Legend content={renderCustomizedLegend} wrapperStyle={{top: 100, left: 235}}/>
            <Bar dataKey="time" animationDuration="1600" legendType={"none"} layout={'vertical'}/>
          </BarChart>
          <ScatterChart
            width={680}
            height={250}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 40,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="x"
                   type="number"
                   scale={"time"}
                   domain = {['auto', 'auto']}
                   tickFormatter = {(unixTime) => moment(unixTime).format('DD/MM/YY')}/>
            <YAxis type="number" dataKey="y" allowDecimals={false} tickCount={4}
                   tickFormatter={customYAxisTicks}/>
            <ZAxis type="number" dataKey="z" range={[180, 400]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={customScatterTooltip}/>
            <Legend content={renderCustomizedScatterLegend} wrapperStyle={{bottom: 5}}/>
            <Scatter data={data_scatter_group} fill="#9A46CE" shape="circle" stroke={"#000"} legendType={"none"}/>
            <Scatter data={data_scatter_me} fill="#0072CE" shape="circle" stroke={"#000"} legendType={"none"}/>
        </ScatterChart>
        </div>
      </div>
  );
};

export default App;
