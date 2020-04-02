import React from "react";
import styled from "@emotion/styled";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts";

import data from "../../../../../dummyData/chart";

const Chart = () => {
  return (
    <ResponsiveContainer width="60%" height={50}>
      <AreaChart data={data}>
        <CartesianGrid horizontal={false} vertical={false} fill="#C6ECFF" />
        <Area type="monotone" dataKey="peak" strokeWidth={0} fill="#1D874D" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
