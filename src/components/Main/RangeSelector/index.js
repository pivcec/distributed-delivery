import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import DateSelector from "./DateSelector";
import Range from "./Range/";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: "50px";
  box-shadow: 0 -5px 10px -5px #aaa;
  flex-wrap: wrap;
`;

const RangeSelector = ({
  selectedStartDate,
  selectedEndDate,
  updateSelectedDate
}) => {
  return (
    <Container>
      <DateSelector
        type={"start"}
        selectedDate={selectedStartDate}
        updateSelectedDate={updateSelectedDate}
      />
      <Range />
      <DateSelector
        type={"end"}
        selectedDate={selectedEndDate}
        updateSelectedDate={updateSelectedDate}
      />
    </Container>
  );
};

RangeSelector.propTypes = {
  selectedStartDate: PropTypes.object.isRequired,
  selectedEndDate: PropTypes.object.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
};

export default RangeSelector;
