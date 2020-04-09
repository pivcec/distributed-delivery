import React from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts";

const getFormattedData = (data) => {
  const numberOfEntries = data.cdn.length;
  const formattedData = [];
  let i;

  for (i = 0; i < numberOfEntries; i++) {
    const cdnBitrate = data.cdn[i][1];
    const ptpBitrate = data.p2p[i][1];
    const totalBitrate = cdnBitrate + ptpBitrate;

    formattedData.push({ total: totalBitrate });
  }

  return formattedData;
};

const Chart = ({ data, selectorWidth }) => {
  const formattedData = getFormattedData(data);
  return (
    <ResponsiveContainer
      width={selectorWidth}
      height={50}
      position={"absolute"}
      top={0}
    >
      <AreaChart data={formattedData}>
        <CartesianGrid horizontal={false} vertical={false} fill="#C6ECFF" />
        <Area type="monotone" dataKey="total" strokeWidth={0} fill="#1D874D" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  selectorWidth: PropTypes.number.isRequired,
};

export default Chart;
