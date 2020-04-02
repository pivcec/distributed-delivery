import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: 0;
  background-color: rgb(225, 232, 237, 0.7);
`;

const Range = ({ leftRangePosition, rightRangePosition }) => {
  return <Container left={leftRangePosition} right={rightRangePosition} />;
};

Range.propTypes = {
  leftRangePosition: PropTypes.number.isRequired,
  rightRangePosition: PropTypes.number.isRequired
};

export default Range;
