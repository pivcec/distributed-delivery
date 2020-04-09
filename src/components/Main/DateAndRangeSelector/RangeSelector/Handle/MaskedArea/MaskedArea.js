import React from "react";
import PropTypes from "prop-types";
import { Rect } from "react-konva";

const MaskedArea = ({ x, leftOrRight, selectorWidth, handleWidth }) => {
  const halfOfHandleWidth = handleWidth / 2;
  return (
    <>
      {leftOrRight === "left" && (
        <Rect
          x={0}
          y={0}
          width={x === 0 ? 0 : x + halfOfHandleWidth}
          height={50}
          fill={"#ffff"}
          opacity={0.4}
        />
      )}
      {leftOrRight === "right" && (
        <Rect
          x={x === 0 ? x : x - halfOfHandleWidth}
          y={0}
          width={x === 0 ? x : selectorWidth - x}
          height={50}
          fill={"#ffff"}
          opacity={0.4}
        />
      )}
    </>
  );
};

MaskedArea.propTypes = {
  x: PropTypes.number.isRequired,
  leftOrRight: PropTypes.string.isRequired,
  selectorWidth: PropTypes.number.isRequired,
  handleWidth: PropTypes.number.isRequired,
};

export default MaskedArea;
