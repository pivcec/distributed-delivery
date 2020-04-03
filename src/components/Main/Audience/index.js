import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center"
});

const getFormattedData = data => {
  return data.reduce((acc, audience) => {
    acc.push({ audience: audience[1] });
    return acc;
  }, []);
};

const Audience = ({ data }) => {
  const formattedData = getFormattedData(data.audience);
  return (
    <Container>
      <ResponsiveContainer width="75%" height={200}>
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <XAxis hide={true} />
          <YAxis axisLine={false} tickLine={false} />
          <Line
            type="monotone"
            dataKey="audience"
            stroke="#9A193E"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

Audience.propTypes = {
  data: PropTypes.object.isRequired
};

export default Audience;
