import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  top: 0;
  left: ${props => props.left};
  right: ${props => props.right};
  position: absolute;
  z-index: 11;
  height: 100%;
  width: 1%;
  display: flex;
  align-items: center;
`;

const HandleSquare = styled.div({
  height: "50%",
  width: "100%",
  backgroundColor: "white"
});

const Handle = ({ position, handlePosition, updateHandlePosition }) => {
  const leftPosition = position === "left" ? `${handlePosition}%` : null;
  const rightPosition = position === "right" ? `${handlePosition}%` : null;
  return (
    <Container left={leftPosition} right={rightPosition}>
      <HandleSquare onDrag={updateHandlePosition} />
    </Container>
  );
};

Handle.propTypes = {
  position: PropTypes.string.isRequired,
  handlePosition: PropTypes.number.isRequired,
  updateHandlePosition: PropTypes.func.isRequired
};

export default Handle;
