import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Link } from 'react-router-dom';

import styled from 'styled-components';
import { fetchHome, selectAllHome } from './home.slice';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: pink;
`;

export function Home(props: HomeProps) {
  const state = useSelector(selectAllHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return <StyledHome>{JSON.stringify(state)}</StyledHome>;
}

export default Home;
