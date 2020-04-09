import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center",
});

const Title = styled.div({
  color: "#333",
  margin: "10px",
});

const checkIfKeyExistsInData = (data, key) => {
  if (data.length - 1 >= key) {
    return data[key][0];
  }
  return null;
};

const getFormattedData = (
  data,
  selectedStartTimestampKey,
  selectedEndTimestampKey
) => {
  const selectedStartTimestamp = selectedStartTimestampKey
    ? checkIfKeyExistsInData(data, selectedStartTimestampKey)
    : null;
  const selectedEndTimestamp = selectedEndTimestampKey
    ? checkIfKeyExistsInData(data, selectedEndTimestampKey)
    : null;

  return data.reduce((acc, audience) => {
    const timestamp = audience[0];
    const viewers = audience[1];

    if (!selectedStartTimestamp && !selectedEndTimestamp) {
      acc.push({ audience: viewers, date: timestamp });
    } else if (
      selectedStartTimestamp &&
      !selectedEndTimestamp &&
      timestamp > selectedStartTimestamp
    ) {
      acc.push({ audience: viewers, date: timestamp });
    } else if (
      !selectedStartTimestamp &&
      selectedEndTimestamp &&
      timestamp < selectedEndTimestamp
    ) {
      acc.push({ audience: viewers, date: timestamp });
    } else if (
      selectedStartTimestamp &&
      selectedEndTimestamp &&
      timestamp > selectedStartTimestamp &&
      timestamp < selectedEndTimestamp
    ) {
      acc.push({ audience: viewers, date: timestamp });
    }

    return acc;
  }, []);
};

const renderLegend = () => {
  return <Title>CONCURRENT VIEWERS</Title>;
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
          <Legend content={renderLegend} verticalAlign={"top"} />

          <XAxis
            dataKey="date"
            tickFormatter={(tick) => moment.unix(tick / 1000).format("DD. MMM")}
          />
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
