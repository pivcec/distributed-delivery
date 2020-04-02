import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import Range from "./Range/";
import Chart from "./Chart/";
import Handle from "./Handle/";

import data from "../../../../dummyData/chart";

const Container = styled.div({ width: "60%", position: "relative" });

const useResize = ref => {
  const [selectorWidth, setSelectorWidth] = useState(0);
  const [selectorLeftEdge, setSelectorLeftEdge] = useState(0);
  const [selectorRightEdge, setSelectorRightEdge] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const rect = ref.current.getBoundingClientRect();
      const { width, x } = rect;
      setSelectorWidth(width);
      setSelectorLeftEdge(x);
      setSelectorRightEdge(x + width);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return { selectorWidth, selectorLeftEdge, selectorRightEdge };
};

const RangeSelector = () => {
  const [spaceBetweenDataPoints, setSpaceBetweenDataPoints] = useState(null);
  const [leftHandlePosition, setLeftHandlePosition] = useState(0);
  const [rightHandlePosition, setRightHandlePosition] = useState(0);
  const ref = useRef();
  const { selectorWidth, selectorLeftEdge, selectorRightEdge } = useResize(ref);

  const handleLeftHandlePositionUpdate = e => {
    if (e.clientX) {
      const newLeftHandlePosition =
        ((e.clientX - selectorLeftEdge) / selectorWidth) * 100;
      if (newLeftHandlePosition < 100 && newLeftHandlePosition > 0) {
        setLeftHandlePosition(newLeftHandlePosition);
      }
    }
  };

  const handleRightHandlePositionUpdate = e => {
    if (e.clientX) {
      const newRightHandlePosition =
        ((selectorWidth - (e.clientX - selectorLeftEdge)) / selectorWidth) *
        100;
      if (newRightHandlePosition < 100 && newRightHandlePosition > 0) {
        setRightHandlePosition(newRightHandlePosition);
      }
    }
  };

  useEffect(() => {
    setSpaceBetweenDataPoints(selectorWidth / data.length);
  }, [selectorWidth, data]);

  return (
    <Container ref={ref}>
      <Chart data={data} />
      <Range
        leftRangePosition={leftHandlePosition}
        rightRangePosition={rightHandlePosition}
      />
      <>
        <Handle
          position={"left"}
          updateHandlePosition={handleLeftHandlePositionUpdate}
          handlePosition={leftHandlePosition}
        />
        <Handle
          position={"right"}
          updateHandlePosition={handleRightHandlePositionUpdate}
          handlePosition={rightHandlePosition}
        />
      </>
    </Container>
  );
};

export default RangeSelector;
