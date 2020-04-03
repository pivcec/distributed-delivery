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

const BandwidthLoader = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
});

const Main = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(2017, 10, 1)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date(2017, 10, 16)
  );
  const [bandwidthData, setBandwidthData] = useState(null);
  const [audienceData, setAudienceData] = useState(null);

  const updateSelectedDate = (startOrEnd, newDate) => {
    console.log("update selected");
  };

  useEffect(() => {
    const getAuthToken = async () => {
      const body = {
        identifiant: "urtoob",
        password: "ToobRU"
      };

      const response = await apiPost("auth", body);

      const { data, status } = response;

      if (status === 200) {
        Cookie.set("authToken", data);
      } else {
        console.warn("get auth token failed with", status);
      }

      if (status === 403 || status === 200) {
        setUserIsLoggedIn(true);
      }
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    if (!userIsLoggedIn || !selectedStartDate || !selectedEndDate) return;

    const authToken = JSON.parse(Cookie.get("authToken"));

    const getBandwidthData = async () => {
      const body = {
        ...authToken,
        from: selectedStartDate.valueOf(),
        to: selectedEndDate.valueOf()
      };

      const response = await apiPost("bandwidth", body);

      const { data, status } = response;

      if (status === 200) {
        setBandwidthData(data);
      }
    };

    getBandwidthData();
  }, [userIsLoggedIn, selectedStartDate, selectedEndDate]);

  return (
    <Container>
      <TrafficSelector selectedTrafficTitle={"traffic one"} />
      {!bandwidthData && (
        <BandwidthLoader>loading bandwidth chart...</BandwidthLoader>
      )}
      {bandwidthData && <Bandwidth data={bandwidthData} />}
      <Audience />
      <DateAndRangeSelector
        bandwidthData={bandwidthData}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
    </Container>
  );
};

export default Main;
