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
  const [selectedTrafficId, setSelectedTrafficId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const updateSelectedDate = (startOrEnd, newDate) => {
    console.log("update selected");
  };

  useEffect(() => {
    if ((selectedTrafficId, selectedStartDate, selectedEndDate)) {
      console.log("fetch data");
    }
  }, [selectedTrafficId, selectedStartDate, selectedEndDate]);

  return (
    <Container>
      <TrafficSelector selectedTrafficTitle={"traffic one"} />
      <Bandwidth />
      <Audience />
      <RangeSelector
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
    </Container>
  );
};

export default Main;
