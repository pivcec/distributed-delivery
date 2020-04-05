import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center",
});

const getFormattedData = (
  data,
  selectedStartTimestampKey,
  selectedEndTimestampKey
) => {
  const selectedStartTimestamp = selectedStartTimestampKey
    ? data[selectedStartTimestampKey][0]
    : null;
  const selectedEndTimestamp = selectedEndTimestampKey
    ? data[selectedEndTimestampKey][0]
    : null;

  return data.reduce((acc, audience) => {
    const timestamp = audience[0];
    const viewers = audience[1];

    if (!selectedStartTimestamp && !selectedEndTimestamp) {
      acc.push({ audience: viewers });
    } else if (
      selectedStartTimestamp &&
      !selectedEndTimestamp &&
      timestamp > selectedStartTimestamp
    ) {
      acc.push({ audience: viewers });
    } else if (
      !selectedStartTimestamp &&
      selectedEndTimestamp &&
      timestamp < selectedStartTimestamp
    ) {
      acc.push({ audience: viewers });
    } else if (
      selectedStartTimestamp &&
      selectedEndTimestamp &&
      timestamp > selectedStartTimestamp &&
      timestamp < selectedEndTimestamp
    ) {
      acc.push({ audience: viewers });
    }

    return acc;
  }, []);
};

function MemoizedAudience({
  data,
  selectedStartTimestampKey,
  selectedEndTimestampKey,
}) {
  const formattedData = getFormattedData(
    data.audience,
    selectedStartTimestampKey,
    selectedEndTimestampKey
  );
  return (
    <Container>
      <ResponsiveContainer width="75%" height={200}>
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
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
}

const Audience = memo(MemoizedAudience);

Audience.propTypes = {
  data: PropTypes.object.isRequired,
  selectedStartTimestampKey: PropTypes.number,
  selectedEndTimestampKey: PropTypes.number,
};

export default Audience;
