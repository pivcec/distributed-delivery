import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import styled from "@emotion/styled";
import { apiPost } from "../../api/";
import Bandwidth from "./Bandwidth";
import Audience from "./Audience";
import DateAndRangeSelector from "./DateAndRangeSelector";
import TrafficSelector from "./TrafficSelector";

const Container = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

const Main = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const updateSelectedDate = (startOrEnd, newDate) => {
    console.log("update selected");
  };

  useEffect(() => {
    const getAuthToken = async () => {
      const response = await apiPost("auth", {
        identifiant: "urtoob",
        password: "ToobRU"
      });
      if (response !== 403) {
        Cookie.set("authToken", response);
      }
      setUserIsLoggedIn(true);
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    if (!userIsLoggedIn || !selectedStartDate || !selectedEndDate) return;

    const authToken = Cookie.get("authToken");
    console.log("authToken", authToken);
    console.log("fetch data");
  }, [userIsLoggedIn, selectedStartDate, selectedEndDate]);

  return (
    <Container>
      <TrafficSelector selectedTrafficTitle={"traffic one"} />
      <Bandwidth />
      <Audience />
      <DateAndRangeSelector
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
    </Container>
  );
};

export default Main;
