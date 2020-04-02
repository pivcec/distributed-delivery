import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div({
  textAlign: "end",
  flex: 0.25
});

const SelectWrapper = styled.div({
  marginTop: "0.5em",
  marginRight: "2em",
  display: "inline-block",
  border: "2px solid #333",
  borderRadius: "5px",
  overflow: "hidden"
});

const Select = styled.select({
  backgroundColor: "#fff",
  padding: "0.7em",
  border: "0px",
  outline: "none"
});

const TrafficSelector = ({ selectedTrafficTitle }) => {
  return (
    <Container>
      <SelectWrapper>
        <Select value={selectedTrafficTitle}>
          <option value="volvo">traffic one</option>
          <option value="saab">traffic two</option>
          <option value="mercedes">traffic three</option>
          <option value="audi">traffic four</option>
        </Select>
      </SelectWrapper>
    </Container>
  );
};

TrafficSelector.propTypes = {
  SelectedTrafficTitle: PropTypes.string
};

export default TrafficSelector;
