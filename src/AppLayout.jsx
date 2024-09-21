import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Headers from "./Headers";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

function AppLayout() {
  return (
    <Container>
      <Headers />
      <Page>
        <Outlet />
      </Page>
    </Container>
  );
}

export default AppLayout;
