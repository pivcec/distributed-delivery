import React from "react";
import styled from "@emotion/styled";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [
  {
    uv: 4000,
    amt: 2400
  },
  {
    uv: 3000,
    amt: 2210
  },
  {
    uv: 2000,
    amt: 2290
  },
  {
    uv: 2780,
    amt: 2000
  },
  {
    uv: 1890,
    amt: 2181
  },
  {
    uv: 2390,
    amt: 2500
  },
  {
    uv: 3490,
    amt: 2100
  }
];

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center"
});

const Audience = () => {
  return (
    <Container>
      <LineChart
        width={1400}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <XAxis hide={true} />
        <YAxis axisLine={false} tickLine={false} />
        <Line type="monotone" dataKey="uv" stroke="#9A193E" dot={false} />
      </LineChart>
    </Container>
  );
};

export default Audience;
