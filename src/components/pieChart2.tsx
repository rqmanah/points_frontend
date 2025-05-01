import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "المبيعات", value: 35000 },
  { name: "الصافي", value: 20000 },
  { name: "كود الخصم ", value: 5000 },
  { name: "الضريبة", value: 8000 },
  { name: "شركة المدفوعات", value: 7000 },
];

const COLORS = ["#717ff5", "#7469B6", "#AD88C6", "#E1AFD1", "#FFA62F"];

const PieChartComponent2 = () => {
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
