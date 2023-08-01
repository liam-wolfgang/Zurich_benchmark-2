import { ResponsiveContainer, BarChart as Chart, Bar, Cell, XAxis, LabelList } from 'recharts';

const colours = {
  lightBlue: ['#26366A', '#5495cf', '#1fb1e6', '#2167ae'],
  darkBlue: ['#2167ae', '#5495cf', '#1fb1e6', '#91bfe3']
};

const formatLabel = str => {
  return str === 'Nothing' ? '0' 
    : str.includes('Less than') ? str.replace(/Less than (€[0-9]+)/, '< $1')
    : str.replace(/,00[0-1]/g, 'K');
};

const renderTick = ({ x, y, payload, isMobile }) => {
  const label = isMobile ? formatLabel(payload.value).replace(/\s|€/g, '') : formatLabel(payload.value);

  return (
    <g transform={`translate(${x - 1},${y})`}>
      <text dy={6} textAnchor="middle" fill="white" fontSize={isMobile ? '10px' : '12px'} fontFamily="Zurich Sans">
        {label}
      </text>
    </g>
  );
};

const renderLabel = ({ x, y, width, value, background, index }) => {
  return (
    <text
      x={(x + width / 2) + 1}
      y={y - 8}
      fontSize={16}
      fontWeight={700}
      fill={colours[background][index % colours[background].length]}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Zurich Sans"
    >
      {value.toLocaleString('en-GB', { style: 'percent' })}
    </text>
  );
};

export const BarChart = ({ dataset, background, isMobile }) => {
  return (
    <ResponsiveContainer>
      <Chart data={dataset} margin={{ top: 16 }}>
        <XAxis dataKey="label" 
          tick={props => renderTick({ ...props, isMobile })} 
          tickLine={false} 
          axisLine={false} 
          minTickGap={2} 
          interval={0} 
        />
        <Bar dataKey="value">
          <LabelList
            dataKey="value"
            position="top"
            content={props => renderLabel({ ...props, background })}
          />
          {dataset.map((data, i) => (
            <Cell key={i} fill={colours[background][i % colours[background].length]} />
          ))}
        </Bar>
      </Chart>
    </ResponsiveContainer>
  );
};