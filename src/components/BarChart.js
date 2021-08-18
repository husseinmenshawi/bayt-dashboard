import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const BarChartGraph = ({
  data = [],
  xDataKey = "country",
  yDataKey = "numberOfUsers",
  color = "#212529",
}) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} />
        <YAxis dataKey={yDataKey} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey={yDataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(BarChartGraph);
