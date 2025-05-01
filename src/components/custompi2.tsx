import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieChartComponent2 = ({ val1, val2 }: any) => {
  const data = [
    { name: "ايجابي", value: val1 },
    { name: "سلبي ", value: val2 },
  ];

  const COLORS = ["#38E54D", "#FF1E00"];
  return (
    <div className=" d-flex justify-content-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent2;
