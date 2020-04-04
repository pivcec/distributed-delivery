import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center",
});

const getGb = (bits) => {
  const kilobits = bits / 1024;
  const megabits = kilobits / 1024;
  const gigabits = megabits / 1024;
  return gigabits.toFixed(2);
};

const getFormattedData = (
  data,
  leftSelectedTimestamp,
  rightSelectedTimestamp
) => {
  const numberOfEntries = data.cdn.length;
  const formattedData = [];
  let i;

  for (i = 0; i < numberOfEntries; i++) {
    const cdnTimestamp = data.cdn[i][0];
    const cdnBitrate = data.cdn[i][1];
    const ptpTimestamp = data.p2p[i][0];
    const ptpBitrate = data.p2p[i][1];

    if (cdnTimestamp === ptpTimestamp) {
      formattedData.push({
        date: cdnTimestamp,
        http: getGb(cdnBitrate),
        ptp: getGb(ptpBitrate),
      });
    }
  }

  return formattedData;
};

function MemoizedBandwidth({
  data,
  leftSelectedTimestamp,
  rightSelectedTimestamp,
}) {
  const formattedData = getFormattedData(
    data,
    leftSelectedTimestamp,
    rightSelectedTimestamp
  );
  return (
    <Container>
      <ResponsiveContainer width="75%" height={200}>
        <AreaChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => moment.unix(tick / 1000).format("DD. MMM")}
          />
          <YAxis />
          <Tooltip />
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
          <ReferenceLine
            y={308880047560}
            label="Max"
            stroke="#3FCB7E"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={208880047560}
            label="Max HTTP"
            stroke="#9A193E"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Bandwidth = memo(MemoizedBandwidth);

Bandwidth.propTypes = {
  data: PropTypes.object.isRequired,
  leftSelectedTimestamp: PropTypes.string,
  rightSelectedTimestamp: PropTypes.string,
};

export default Bandwidth;
