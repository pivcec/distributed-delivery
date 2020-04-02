import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";

import data from "../../../dummyData/bandwidth";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center"
});

const ticks = data.reduce((acc, { name }) => {
  if (!acc.includes(name)) {
    acc.push(name);
  }
  return acc;
}, []);

const Bandwidth = () => {
  return (
    <Container>
      <ResponsiveContainer width="75%" height={200}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <XAxis dataKey="name" ticks={ticks} />
          <YAxis />
          <Tooltip />
          <ReferenceLine
            y={9800}
            label="Max"
            stroke="#3FCB7E"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={7000}
            label="Max HTTP"
            stroke="#9A193E"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="http"
            stackId="1"
            strokeWidth={2}
            stroke="#9A193E"
            fill="#9A193E"
          />
          <Area
            type="monotone"
            dataKey="ptp"
            stackId="1"
            strokeWidth={2}
            stroke="#12A5ED"
            fill="#12A5ED"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Bandwidth;
