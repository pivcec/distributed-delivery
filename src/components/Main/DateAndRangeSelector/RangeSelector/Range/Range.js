import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const SelectedRange = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: ${(props) => props.leftPosition}%;
  right: ${(props) => props.rightPosition}%;
  bottom: 0;
  background-color: rgb(225, 232, 237, 0.7);
`;

const Range = ({ leftRangePosition, rightRangePosition }) => {
  const leftPercentFromRight = 100 - leftRangePosition;
  const rightPercentFromLeft = 100 - rightRangePosition;
  return (
    <>
      <SelectedRange leftPosition={0} rightPosition={leftPercentFromRight} />
      <SelectedRange rightPosition={0} leftPosition={rightPercentFromLeft} />
    </>
  );
};

Range.propTypes = {
  leftRangePosition: PropTypes.number.isRequired,
  rightRangePosition: PropTypes.number.isRequired,
};

export default Range;
