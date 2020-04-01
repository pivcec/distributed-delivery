import React from "react";
import styled from "@emotion/styled";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from "recharts";

const data = [
  {
    name: "2nd Nov",
    ptp: 7000,
    http: 300
  },
  {
    name: "2nd Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "2nd Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "3rd Nov",
    ptp: 3000,
    http: 1398
  },
  {
    name: "3rd Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "3rd Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "4th Nov",
    ptp: 2000,
    http: 9800
  },
  {
    name: "4th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "4th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "5th Nov",
    ptp: 7000,
    http: 5000
  },
  {
    name: "5th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "5th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "6th Nov",
    ptp: 1890,
    http: 4800
  },
  {
    name: "6th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "6th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "7th Nov",
    ptp: 2390,
    http: 3800
  },
  {
    name: "7th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "7th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "8th Nov",
    ptp: 3490,
    http: 4300
  },
  {
    name: "8th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "8th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "9th Nov",
    ptp: 4000,
    http: 2400
  },
  {
    name: "9th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "9th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "10th Nov",
    ptp: 3000,
    http: 1398
  },
  {
    name: "10th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "10th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "11th Nov",
    ptp: 2000,
    http: 9800
  },
  {
    name: "11th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "11th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "12th Nov",
    ptp: 2780,
    http: 3908
  },
  {
    name: "12th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "12th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "13th Nov",
    ptp: 1890,
    http: 4800
  },
  {
    name: "13th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "13th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "14th Nov",
    ptp: 2390,
    http: 3800
  },
  {
    name: "14th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "14th Nov",
    ptp: 5000,
    http: 100
  },
  {
    name: "15th Nov",
    ptp: 3490,
    http: 4300
  },
  {
    name: "15th Nov",
    ptp: 6000,
    http: 200
  },
  {
    name: "15th Nov",
    ptp: 5000,
    http: 100
  }
];

const Container = styled.div({
  flex: 1
});

const Bandwidth = () => {
  return (
    <Container>
      <AreaChart
        width={1400}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <XAxis
          dataKey="name"
          ticks={[
            "2nd Nov",
            "3rd Nov",
            "4th Nov",
            "5th Nov",
            "6th Nov",
            "7th Nov",
            "8th Nov",
            "9th Nov",
            "10th Nov",
            "11th Nov",
            "12th Nov",
            "13th Nov",
            "14th Nov",
            "15th Nov"
          ]}
        />
        <YAxis />
        <Tooltip />
        <ReferenceLine
          y={7000}
          label="Max PTP"
          stroke="#8884d8"
          strokeDasharray="3 3"
        />
        <Area
          type="monotone"
          dataKey="ptp"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <ReferenceLine
          y={9800}
          label="Max HTTP"
          stroke="#82ca9d"
          strokeDasharray="3 3"
        />
        <Area
          type="monotone"
          dataKey="http"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </Container>
  );
};

export default Bandwidth;
