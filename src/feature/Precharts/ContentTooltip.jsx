import { memo } from "react";
import styled from "styled-components";

const Content = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px #eee solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
const Title = styled.h3`
  font-size: 20px;
`;

const ContentTooltip = memo(function ContentTooltip({ payload }) {
  return (
    <Content>
      <Title>{payload?.city}</Title>
      <Title>population:{payload?.population.toLocaleString()}</Title>
    </Content>
  );
});

export default ContentTooltip;
