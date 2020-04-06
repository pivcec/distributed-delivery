import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  top: 0;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  position: absolute;
  z-index: 11;
  height: 100%;
  width: 10px;
  display: flex;
  align-items: center;
`;

const HandleSquare = styled.div({
  height: "50%",
  width: "100%",
  backgroundColor: "white",
  border: "1px solid #A1AEB8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HandleLines = styled.div({
  height: "80%",
  width: "30%",
  borderRight: "1px solid #A1AEB8",
  borderLeft: "1px solid #A1AEB8",
});

const Handle = ({ position, handlePosition, updateHandlePosition }) => {
  const leftPosition = position === "left" ? `${handlePosition}%` : null;
  const rightPosition = position === "right" ? `${handlePosition}%` : null;

  return (
    <Container left={leftPosition} right={rightPosition}>
      <HandleSquare onDrag={updateHandlePosition}>
        <HandleLines />
      </HandleSquare>
    </Container>
  );
};

Handle.propTypes = {
  position: PropTypes.string.isRequired,
  handlePosition: PropTypes.number.isRequired,
  updateHandlePosition: PropTypes.func.isRequired,
};

export default Handle;
