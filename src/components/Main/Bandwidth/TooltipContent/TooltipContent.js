import React from "react";
import moment from "moment";
import styled from "@emotion/styled";

const TooltipContainer = styled.div({
  backgroundColor: "#ffffff",
  padding: "10px",
  fontSize: "12px",
});

const TooltipLabelContainer = styled.div({
  paddingBottom: "10px",
  fontWeight: "bold",
});

const TooltipItem = styled.span`
  color: ${(props) => props.color};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : null)};
`;

const TooltipContentContainer = styled.div({
  paddingTop: "30px",
});

const getTotalAndSpikeReduction = (payload) => {
  const http = parseInt(payload[0].value);
  const ptp = parseInt(payload[1].value);
  const total = http + ptp;
  const spikeReduction = Math.ceil((ptp / total) * 100);
  return { total, spikeReduction };
};

const TooltipContent = (tooltipProps) => {
  const { label, payload } = tooltipProps;
  const totalAndSpikeReduction =
    payload.length > 0 ? getTotalAndSpikeReduction(payload) : null;
  return (
    <TooltipContainer>
      <TooltipLabelContainer>
        {moment.unix(label / 1000).format("ddd, MMMM DD, YYYY h:mm A")}
      </TooltipLabelContainer>
      {payload.map(({ name, value, stroke }) => (
        <div key={name}>
          <TooltipItem paddingRight={"10px"} color={stroke}>
            •
          </TooltipItem>
          <TooltipItem
            paddingRight={"10px"}
            color={"#333"}
          >{`${name}:`}</TooltipItem>
          <TooltipItem color={stroke}>{`${value}Gbps`}</TooltipItem>
        </div>
      ))}
      {totalAndSpikeReduction && (
        <TooltipContentContainer>
          <div>
            <TooltipItem paddingRight={"10px"} color={"#333"}>
              {"Total:"}
            </TooltipItem>
            <TooltipItem color={"#3FCB7E"}>
              {`${totalAndSpikeReduction.total}Gbps`}
            </TooltipItem>
          </div>
          <div>
            <TooltipItem paddingRight={"10px"} color={"#333"}>
              {"Spike reduction:"}
            </TooltipItem>
            <TooltipItem color={"#12A5ED"}>
              {`${totalAndSpikeReduction.spikeReduction}%`}
            </TooltipItem>
          </div>
        </TooltipContentContainer>
      )}
    </TooltipContainer>
  );
};

export default TooltipContent;
