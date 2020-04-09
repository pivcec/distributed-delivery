import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { Rect } from "react-konva";
import handle from "../../../../../assets/handle.png";
import MaskedArea from "./MaskedArea/MaskedArea";

const handleWidth = 10;
const doubleHandleWidth = handleWidth * 2;

const Handle = ({
  leftOrRight,
  updateTrackedHandlePosition,
  selectorWidth,
  otherTrackedHandlePosition,
}) => {
  const [x, setX] = useState(0);
  const [fillPatternImage, setFillPatternImage] = useState(null);

  const checkBoundariesLeftHandle = (x, otherTrackedHandlePosition) => {
    if (x < 0) {
      return 0;
    } else if (
      otherTrackedHandlePosition &&
      x > otherTrackedHandlePosition - doubleHandleWidth
    ) {
      return otherTrackedHandlePosition - doubleHandleWidth;
    }
    return x;
  };

  const checkBoundariesRightHandle = (x, otherTrackedHandlePosition) => {
    if (x > selectorWidth - handleWidth) {
      return selectorWidth - handleWidth;
    } else if (x < otherTrackedHandlePosition + handleWidth) {
      return otherTrackedHandlePosition + handleWidth;
    }
    return x;
  };

  const getNewHandlePosition = (x, leftOrRight, otherTrackedHandlePosition) => {
    if (leftOrRight === "left") {
      const newPosition = checkBoundariesLeftHandle(
        x,
        otherTrackedHandlePosition
      );
      setX(newPosition);
      return newPosition;
    }
    const newPosition = checkBoundariesRightHandle(
      x,
      otherTrackedHandlePosition
    );
    setX(newPosition + handleWidth);
    return newPosition;
  };

  const debouncedUpdateHandlePosition = useCallback(
    debounce(updateTrackedHandlePosition, 500),
    []
  );

  useEffect(() => {
    debouncedUpdateHandlePosition(x);
  }, [x, debouncedUpdateHandlePosition]);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      setFillPatternImage(image);
    };
    image.src = handle;
  }, []);

  const dragBoundFunc = (pos) => {
    const newHandlePosition = getNewHandlePosition(
      pos.x,
      leftOrRight,
      otherTrackedHandlePosition
    );
    return {
      x: newHandlePosition,
      y: 10,
    };
  };

  return (
    <>
      <MaskedArea
        x={x}
        leftOrRight={leftOrRight}
        selectorWidth={selectorWidth}
        handleWidth={handleWidth}
      />
      {leftOrRight === "left" && (
        <Rect
          x={0}
          y={10}
          draggable={true}
          width={10}
          height={30}
          dragBoundFunc={dragBoundFunc}
          stroke={"#333"}
          strokeWidth={1}
          fillPatternImage={fillPatternImage}
        />
      )}
      {leftOrRight === "right" && (
        <Rect
          x={selectorWidth - handleWidth}
          y={10}
          draggable={true}
          width={10}
          height={30}
          dragBoundFunc={dragBoundFunc}
          stroke={"#333"}
          strokeWidth={1}
          fillPatternImage={fillPatternImage}
        />
      )}
    </>
  );
};

Handle.propTypes = {
  leftOrRight: PropTypes.string.isRequired,
  updateTrackedHandlePosition: PropTypes.func.isRequired,
  selectorWidth: PropTypes.number.isRequired,
  otherTrackedHandlePosition: PropTypes.number.isRequired,
};

export default Handle;
