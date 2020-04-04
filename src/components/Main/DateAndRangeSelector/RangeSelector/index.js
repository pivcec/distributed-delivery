import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDebounce } from "use-lodash-debounce";
import throttle from "lodash.throttle";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Range from "./Range/";
import Chart from "./Chart/";
import Handle from "./Handle/";

const Container = styled.div({ width: "60%", position: "relative" });

const useResize = (ref) => {
  const [selectorWidth, setSelectorWidth] = useState(0);
  const [selectorLeftEdge, setSelectorLeftEdge] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const rect = ref.current.getBoundingClientRect();
      const { width, x } = rect;
      setSelectorWidth(width);
      setSelectorLeftEdge(x);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return { selectorWidth, selectorLeftEdge };
};

const RangeSelector = ({ bandwidthData, updateSelectedTimestamp }) => {
  const [spaceBetweenDataPoints, setSpaceBetweenDataPoints] = useState(null);
  const [leftHandlePosition, setLeftHandlePosition] = useState(0);
  const debouncedLeftHandlePosition = useDebounce(leftHandlePosition, 500);
  const [rightHandlePosition, setRightHandlePosition] = useState(0);
  const debouncedRightHandlePosition = useDebounce(rightHandlePosition, 500);
  const ref = useRef();
  const { selectorWidth, selectorLeftEdge } = useResize(ref);

  const handleLeftPositionUpdate = (e) => {
    if (e.clientX) {
      const newLeftHandlePosition =
        ((e.clientX - selectorLeftEdge) / selectorWidth) * 100;
      if (newLeftHandlePosition < 100 && newLeftHandlePosition > 0) {
        throttledSetLeftHandlePosition(newLeftHandlePosition);
      }
    }
  };

  const handleRightPositionUpdate = (e) => {
    if (e.clientX) {
      const newRightHandlePosition =
        ((selectorWidth - (e.clientX - selectorLeftEdge)) / selectorWidth) *
        100;
      if (newRightHandlePosition < 100 && newRightHandlePosition > 0) {
        throttledSetRightHandlePosition(newRightHandlePosition);
      }
    }
  };

  const throttledSetLeftHandlePosition = throttle(setLeftHandlePosition, 300);

  const throttledSetRightHandlePosition = throttle(setRightHandlePosition, 300);

  const getSelectedTimestamp = (
    spaceBetweenDataPoints,
    selectorWidth,
    selectorLeftEdge,
    handlePosition,
    position
  ) => {
    console.log("spaceBetweenDataPoints", spaceBetweenDataPoints);
    console.log("selectorWidth", selectorWidth);
    console.log("selectorLeftEdge", selectorLeftEdge);
    console.log("handlePosition", handlePosition);
    console.log("position", position);
  };

  useEffect(() => {
    if (!selectorWidth || !bandwidthData) return;

    setSpaceBetweenDataPoints(selectorWidth / bandwidthData.cdn.length);
  }, [selectorWidth, bandwidthData]);

  useEffect(() => {
    if (
      !spaceBetweenDataPoints ||
      !selectorWidth ||
      !selectorLeftEdge ||
      !debouncedLeftHandlePosition
    )
      return;

    getSelectedTimestamp(
      spaceBetweenDataPoints,
      selectorWidth,
      selectorLeftEdge,
      debouncedLeftHandlePosition,
      "start"
    );
  }, [
    spaceBetweenDataPoints,
    selectorWidth,
    selectorLeftEdge,
    debouncedLeftHandlePosition,
  ]);

  useEffect(() => {
    if (
      !spaceBetweenDataPoints ||
      !selectorWidth ||
      !selectorLeftEdge ||
      !debouncedRightHandlePosition
    )
      return;

    getSelectedTimestamp(
      spaceBetweenDataPoints,
      selectorWidth,
      selectorLeftEdge,
      debouncedRightHandlePosition,
      "end"
    );
  }, [
    spaceBetweenDataPoints,
    selectorWidth,
    selectorLeftEdge,
    debouncedRightHandlePosition,
  ]);

  return (
    <Container ref={ref}>
      {bandwidthData && <Chart data={bandwidthData} />}
      <Range
        leftRangePosition={leftHandlePosition}
        rightRangePosition={rightHandlePosition}
      />
      <>
        <Handle
          position={"left"}
          updateHandlePosition={handleLeftPositionUpdate}
          handlePosition={leftHandlePosition}
        />
        <Handle
          position={"right"}
          updateHandlePosition={handleRightPositionUpdate}
          handlePosition={rightHandlePosition}
        />
      </>
    </Container>
  );
};

RangeSelector.propTypes = {
  bandwidthData: PropTypes.object,
  updateSelectedTimestamp: PropTypes.func.isRequired,
};

export default RangeSelector;
