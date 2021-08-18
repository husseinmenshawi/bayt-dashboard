import { memo, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    label,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
        {`${label}: ${payload.value}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const PieChartGraph = ({ data = [], color = "#212529", label }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pieData, setPieData] = useState([]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (data.length != 0) {
      const newData = [];
      data.forEach((x) => {
        if (data[0].country) {
          newData.push({
            name: x.country,
            value: x.numberOfUsers,
          });
        }
        if (data[0].name) {
          newData.push({
            name: x.name,
            value: x.sale,
          });
        }
      });
      setPieData(newData);
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={450} height={450}>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape({ ...props, label })}
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={color}
          dataKey={"value"}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default memo(PieChartGraph);
