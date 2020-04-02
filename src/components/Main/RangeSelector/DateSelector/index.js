import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";

const Container = styled.div({});

const DateSelector = ({ type, selectedDate, updateSelectedDate }) => {
  return (
    <Container>
      <DatePicker
        selected={selectedDate}
        onChange={updateSelectedDate}
        dateFormat={"dd MMMM yyyy"}
      />
    </Container>
  );
};

DateSelector.propTypes = {
  type: PropTypes.string.isRequired,
  selectedDate: PropTypes.object.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
};

export default DateSelector;
