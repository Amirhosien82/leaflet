import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: start;
  direction: rtl;
  gap: 10px;
  padding: 15px;
`;

const NavLinkStyled = styled(NavLink)`
  font-weight: 700;
  transition: all 0.2s;
  &:first-child {
    color: #5efd5e;
    &.active {
      color: #0ad20a;
    }
  }
  &:nth-child(2) {
    color: #665efd;
    &.active {
      color: #170ad2;
    }
  }
`;

function Headers() {
  return (
    <HeaderStyled>
      <NavLinkStyled to="/leaflet">React-Leaflet</NavLinkStyled>
      <NavLinkStyled to="/recharts">Recharts</NavLinkStyled>
    </HeaderStyled>
  );
}

export default Headers;
