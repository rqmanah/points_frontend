import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieChartComponent = ({ data, colors }: any) => {
  const Data = data;

  const COLORS = colors;
  return (
    <div className=" d-flex justify-content-center">
      <PieChart width={400} height={400}>
        <Pie
          data={Data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_: any, index: any) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
