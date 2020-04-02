import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={50} position={"absolute"} top={0}>
      <AreaChart data={data}>
        <CartesianGrid horizontal={false} vertical={false} fill="#C6ECFF" />
        <Area type="monotone" dataKey="peak" strokeWidth={0} fill="#1D874D" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired
};

export default Chart;
