import React from "react";
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
