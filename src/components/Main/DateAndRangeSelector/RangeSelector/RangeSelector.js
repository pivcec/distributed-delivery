import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDebounce } from "use-lodash-debounce";
import throttle from "lodash.throttle";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Range from "./Range/Range";
import Chart from "./Chart/Chart";
import Handle from "./Handle/Handle";

const Container = styled.div({
  width: "60%",
  position: "relative",
  marginLeft: "10px",
  marginRight: "10px",
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
  const [leftHandlePosition, setLeftHandlePosition] = useState(0);
  const [rightHandlePosition, setRightHandlePosition] = useState(0);
  const debouncedLeftHandlePosition = useDebounce(leftHandlePosition, 500);
  const debouncedRightHandlePosition = useDebounce(rightHandlePosition, 500);
  const ref = useRef();
  const { selectorWidth, selectorLeftEdge } = useResize(ref);

  const handleLeftPositionUpdate = (e) => {
    if (e.clientX) {
      const newLeftHandlePosition = e.clientX - selectorLeftEdge;
      if (
        newLeftHandlePosition > 0 &&
        newLeftHandlePosition < selectorWidth - rightHandlePosition
      ) {
        throttledSetLeftHandlePosition(newLeftHandlePosition);
      }
    }
  };

  const handleRightPositionUpdate = (e) => {
    if (e.clientX) {
      const newRightHandlePosition =
        selectorWidth - (e.clientX - selectorLeftEdge);
      if (
        newRightHandlePosition > 0 &&
        newRightHandlePosition < selectorWidth - leftHandlePosition
      ) {
        throttledSetRightHandlePosition(newRightHandlePosition);
      }
    }
  };

  const throttledSetLeftHandlePosition = throttle(setLeftHandlePosition, 300);

  const throttledSetRightHandlePosition = throttle(setRightHandlePosition, 300);

  const getSelectedTimestampKey = useCallback(
    (pixelsBetweenDataPoints, selectorWidth, handlePosition, position) => {
      const handlePositionFromLeftEdge =
        position === "start" ? handlePosition : selectorWidth - handlePosition;

      const selectedTimestampKey = Math.round(
        handlePositionFromLeftEdge / pixelsBetweenDataPoints
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
      !debouncedLeftHandlePosition
    )
      return;

    getSelectedTimestampKey(
      pixelsBetweenDataPoints,
      selectorWidth,
      debouncedLeftHandlePosition,
      "start"
    );
  }, [
    pixelsBetweenDataPoints,
    selectorWidth,
    debouncedLeftHandlePosition,
    getSelectedTimestampKey,
  ]);

  useEffect(() => {
    if (
      !pixelsBetweenDataPoints ||
      !selectorWidth ||
      !debouncedRightHandlePosition
    )
      return;

    getSelectedTimestampKey(
      pixelsBetweenDataPoints,
      selectorWidth,
      debouncedRightHandlePosition,
      "end"
    );
  }, [
    pixelsBetweenDataPoints,
    selectorWidth,
    debouncedRightHandlePosition,
    getSelectedTimestampKey,
  ]);

  return (
    <Container ref={ref}>
      {bandwidthData && <Chart data={bandwidthData} />}
      {selectorWidth && (
        <>
          <Range
            leftRangePosition={(leftHandlePosition / selectorWidth) * 100}
            rightRangePosition={(rightHandlePosition / selectorWidth) * 100}
          />
          <Handle
            position={"left"}
            updateHandlePosition={handleLeftPositionUpdate}
            handlePosition={((leftHandlePosition - 5) / selectorWidth) * 100}
          />
          <Handle
            position={"right"}
            updateHandlePosition={handleRightPositionUpdate}
            handlePosition={((rightHandlePosition - 5) / selectorWidth) * 100}
          />
        </>
      )}
    </Container>
  );
};

RangeSelector.propTypes = {
  bandwidthData: PropTypes.object,
  updateSelectedTimestampKey: PropTypes.func.isRequired,
};

export default RangeSelector;
