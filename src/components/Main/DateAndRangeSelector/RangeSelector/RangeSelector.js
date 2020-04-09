import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Chart from "./Chart/Chart";
import Handle from "./Handle/Handle";

const Container = styled.div({
  height: "50px",
  width: "60%",
  position: "relative",
  marginLeft: "10px",
  marginRight: "10px",
});

const StageContainer = styled.div({
  position: "absolute",
  height: "50px",
  top: 0,
});

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

const RangeSelector = ({ bandwidthData, updateSelectedTimestampKey }) => {
  const [pixelsBetweenDataPoints, setPixelsBetweenDataPoints] = useState(null);
  const [trackedLeftHandlePosition, setTrackedLeftHandlePosition] = useState(0);
  const [trackedRightHandlePosition, setTrackedRightHandlePosition] = useState(
    0
  );
  const ref = useRef();
  const { selectorWidth, selectorLeftEdge } = useResize(ref);

  const handleLeftTrackedPositionUpdate = (newLeftHandlePosition) => {
    setTrackedLeftHandlePosition(newLeftHandlePosition);
  };

  const handleRightTrackedPositionUpdate = (newRightHandlePosition) => {
    setTrackedRightHandlePosition(newRightHandlePosition);
  };

  const getSelectedTimestampKey = useCallback(
    (pixelsBetweenDataPoints, selectorWidth, handlePosition, position) => {
      const selectedTimestampKey = Math.round(
        handlePosition / pixelsBetweenDataPoints
      );

      updateSelectedTimestampKey(position, selectedTimestampKey);
    },
    [updateSelectedTimestampKey]
  );

  useEffect(() => {
    if (!selectorWidth || !bandwidthData) return;

    setPixelsBetweenDataPoints(selectorWidth / bandwidthData.cdn.length);
  }, [selectorWidth, bandwidthData]);

  useEffect(() => {
    if (
      !pixelsBetweenDataPoints ||
      !selectorWidth ||
      trackedLeftHandlePosition === null
    )
      return;

    getSelectedTimestampKey(
      pixelsBetweenDataPoints,
      selectorWidth,
      trackedLeftHandlePosition,
      "start"
    );
  }, [
    pixelsBetweenDataPoints,
    selectorWidth,
    trackedLeftHandlePosition,
    getSelectedTimestampKey,
  ]);

  useEffect(() => {
    if (
      !pixelsBetweenDataPoints ||
      !selectorWidth ||
      trackedRightHandlePosition === null
    )
      return;

    getSelectedTimestampKey(
      pixelsBetweenDataPoints,
      selectorWidth,
      trackedRightHandlePosition,
      "end"
    );
  }, [
    pixelsBetweenDataPoints,
    selectorWidth,
    trackedRightHandlePosition,
    getSelectedTimestampKey,
  ]);

  return (
    <Container ref={ref}>
      {bandwidthData && selectorWidth && (
        <Chart data={bandwidthData} selectorWidth={selectorWidth} />
      )}
      {selectorWidth && (
        <StageContainer>
          <Stage width={selectorWidth} height={50}>
            <Layer>
              <Handle
                leftOrRight={"left"}
                updateTrackedHandlePosition={handleLeftTrackedPositionUpdate}
                selectorWidth={selectorWidth}
                otherTrackedHandlePosition={trackedRightHandlePosition}
              />
              <Handle
                leftOrRight={"right"}
                updateTrackedHandlePosition={handleRightTrackedPositionUpdate}
                selectorWidth={selectorWidth}
                otherTrackedHandlePosition={trackedLeftHandlePosition}
              />
            </Layer>
          </Stage>
        </StageContainer>
      )}
    </Container>
  );
};

RangeSelector.propTypes = {
  bandwidthData: PropTypes.object,
  updateSelectedTimestampKey: PropTypes.func.isRequired,
};

export default RangeSelector;
