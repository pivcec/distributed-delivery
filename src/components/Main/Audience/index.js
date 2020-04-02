import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

import data from "../../../dummyData/audience";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center"
});

const Audience = () => {
  return (
    <Container>
      <ResponsiveContainer width="75%" height={200}>
        <LineChart
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
      </ResponsiveContainer>
    </Container>
  );
};

export default Audience;
