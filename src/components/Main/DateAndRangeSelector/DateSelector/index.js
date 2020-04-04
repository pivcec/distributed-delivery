import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";

const Container = styled.div({});

const DateSelector = ({
  type,
  selectedStartDate,
  selectedEndDate,
  updateSelectedDate
}) => {
  const day = 60 * 60 * 24 * 1000;
  const startDatePlusOne = new Date(selectedStartDate.getTime() + day);
  const endDateMinusOne = new Date(selectedEndDate.getTime() - day);

  const handleUpdateSelectedDate = date => {
    updateSelectedDate(type, date);
  };

  return (
    <Container>
      {type === "start" && (
        <DatePicker
          selected={selectedStartDate}
          maxDate={endDateMinusOne}
          onChange={handleUpdateSelectedDate}
          dateFormat={"dd MMMM yyyy"}
        />
      )}
      {type === "end" && (
        <DatePicker
          selected={selectedEndDate}
          minDate={startDatePlusOne}
          onChange={handleUpdateSelectedDate}
          dateFormat={"dd MMMM yyyy"}
        />
      )}
    </Container>
  );
};

DateSelector.propTypes = {
  type: PropTypes.string.isRequired,
  selectedStartDate: PropTypes.object.isRequired,
  selectedEndDate: PropTypes.object.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
};

export default DateSelector;
