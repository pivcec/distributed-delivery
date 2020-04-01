import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Bandwidth from "./Bandwidth";
import Audience from "./Audience";
import RangeSelector from "./RangeSelector/";
import TrafficSelector from "./TrafficSelector";

const Container = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

const Main = () => {
  const [selectedTraffic, setSelectedTraffic] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    if ((selectedTraffic, selectedStartDate, selectedEndDate)) {
      console.log("fetch data");
    }
  }, [selectedTraffic, selectedStartDate, selectedEndDate]);

  return (
    <Container>
      <TrafficSelector />
      <Bandwidth />
      <Audience />
      <RangeSelector />
    </Container>
  );
};

export default Main;
