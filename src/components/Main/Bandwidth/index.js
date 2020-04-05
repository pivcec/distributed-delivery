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

const TooltipContainer = styled.div({
  backgroundColor: "#ffffff",
  padding: "10px",
  fontSize: "12px",
});

const TooltipLabelContainer = styled.div({
  paddingBottom: "10px",
  fontWeight: "bold",
});

const TooltipItem = styled.span`
  color: ${(props) => props.color};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : null)};
`;

const TooltipContentContainer = styled.div({
  paddingTop: "30px",
});

const getGb = (bits) => {
  const kilobits = bits / 1024;
  const megabits = kilobits / 1024;
  const gigabits = megabits / 1024;
  return gigabits.toFixed(2);
};

const getFormattedData = (
  data,
  selectedStartTimestampKey,
  selectedEndTimestampKey
) => {
  const numberOfEntries = data.cdn.length;
  const formattedData = [];
  let i;

  for (i = 0; i < numberOfEntries; i++) {
    const cdnTimestamp = data.cdn[i][0];
    const cdnBitrate = data.cdn[i][1];
    const ptpBitrate = data.p2p[i][1];
    const selectedStartTimestamp = selectedStartTimestampKey
      ? data.cdn[selectedStartTimestampKey][0]
      : null;
    const selectedEndTimestamp = selectedEndTimestampKey
      ? data.cdn[selectedEndTimestampKey][0]
      : null;

    if (!selectedStartTimestamp && !selectedEndTimestamp) {
      formattedData.push({
        date: cdnTimestamp,
        http: getGb(cdnBitrate),
        ptp: getGb(ptpBitrate),
      });
    } else if (
      selectedStartTimestamp &&
      !selectedEndTimestamp &&
      cdnTimestamp > selectedStartTimestamp
    ) {
      formattedData.push({
        date: cdnTimestamp,
        http: getGb(cdnBitrate),
        ptp: getGb(ptpBitrate),
      });
    } else if (
      !selectedStartTimestamp &&
      selectedEndTimestamp &&
      cdnTimestamp < selectedEndTimestamp
    ) {
      formattedData.push({
        date: cdnTimestamp,
        http: getGb(cdnBitrate),
        ptp: getGb(ptpBitrate),
      });
    } else if (
      selectedStartTimestamp &&
      selectedEndTimestamp &&
      cdnTimestamp > selectedStartTimestamp &&
      cdnTimestamp < selectedEndTimestamp
    ) {
      formattedData.push({
        date: cdnTimestamp,
        http: getGb(cdnBitrate),
        ptp: getGb(ptpBitrate),
      });
    }
  }

  return formattedData;
};

const getMaximumThroughput = (formattedData) => {
  return formattedData.reduce((acc, { http, ptp }) => {
    const total = parseInt(http) + parseInt(ptp);
    if (total > acc) {
      acc = total;
    }
    return acc;
  }, 0);
};

const getMaximumCDN = (formattedData) => {
  return formattedData.reduce((acc, { http }) => {
    if (http > acc) {
      acc = http;
    }
    return acc;
  }, 0);
};

const getTotalAndSpikeReduction = (payload) => {
  const http = parseInt(payload[0].value);
  const ptp = parseInt(payload[1].value);
  const total = http + ptp;
  const spikeReduction = Math.ceil((ptp / total) * 100);
  return { total, spikeReduction };
};

function MemoizedBandwidth({
  data,
  selectedStartTimestampKey,
  selectedEndTimestampKey,
}) {
  const formattedData = getFormattedData(
    data,
    selectedStartTimestampKey,
    selectedEndTimestampKey
  );

  const maximumThroughput = getMaximumThroughput(formattedData);

  const maximumCDN = getMaximumCDN(formattedData);

  const getTooltipContent = (tooltipProps) => {
    const { label, payload } = tooltipProps;
    const totalAndSpikeReduction =
      payload.length > 0 ? getTotalAndSpikeReduction(payload) : null;
    return (
      <TooltipContainer>
        <TooltipLabelContainer>
          {moment.unix(label / 1000).format("ddd, MMMM DD, YYYY h:mm A")}
        </TooltipLabelContainer>
        {payload.map(({ name, value, stroke }) => (
          <div key={name}>
            <TooltipItem paddingRight={"10px"} color={stroke}>
              •
            </TooltipItem>
            <TooltipItem
              paddingRight={"10px"}
              color={"#333"}
            >{`${name}:`}</TooltipItem>
            <TooltipItem color={stroke}>{`${value}Gbps`}</TooltipItem>
          </div>
        ))}
        {totalAndSpikeReduction && (
          <TooltipContentContainer>
            <div>
              <TooltipItem paddingRight={"10px"} color={"#333"}>
                {"Total:"}
              </TooltipItem>
              <TooltipItem color={"#3FCB7E"}>
                {`${totalAndSpikeReduction.total}Gbps`}
              </TooltipItem>
            </div>
            <div>
              <TooltipItem paddingRight={"10px"} color={"#333"}>
                {"Spike reduction:"}
              </TooltipItem>
              <TooltipItem color={"#12A5ED"}>
                {`${totalAndSpikeReduction.spikeReduction}%`}
              </TooltipItem>
            </div>
          </TooltipContentContainer>
        )}
      </TooltipContainer>
    );
  };

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
          <Tooltip content={getTooltipContent} />
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
            y={maximumThroughput}
            label={{
              position: "top",
              value: `Maximum throughput: ${maximumThroughput} Gbps`,
            }}
            stroke="#3FCB7E"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={maximumCDN}
            label={{
              position: "top",
              value: `Maximum CDN contribution: ${maximumCDN} Gbps`,
            }}
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
  selectedStartTimestampKey: PropTypes.number,
  selectedEndTimestampKey: PropTypes.number,
};

export default Bandwidth;
