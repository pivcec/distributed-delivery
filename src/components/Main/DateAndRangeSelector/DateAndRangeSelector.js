import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import DateSelector from "./DateSelector/DateSelector";
import RangeSelector from "./RangeSelector/RangeSelector";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: "50px";
  box-shadow: 0 -5px 10px -5px #aaa;
  flex-wrap: wrap;
`;

const DateAndRangeSelector = ({
  bandwidthData,
  selectedStartDate,
  selectedEndDate,
  updateSelectedDate,
  updateSelectedTimestampKey,
}) => {
  return (
    <Container>
      <DateSelector
        position={"start"}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
      <RangeSelector
        bandwidthData={bandwidthData}
        updateSelectedTimestampKey={updateSelectedTimestampKey}
      />
      <DateSelector
        position={"end"}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
    </Container>
  );
};

DateAndRangeSelector.propTypes = {
  bandwidthData: PropTypes.object,
  selectedStartDate: PropTypes.object.isRequired,
  selectedEndDate: PropTypes.object.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  updateSelectedTimestampKey: PropTypes.func.isRequired,
};

export default DateAndRangeSelector;
