import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled.div``;

export function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <h1>Welcome to shared-ui!</h1>
    </StyledHeader>
  );
}

export default Header;
