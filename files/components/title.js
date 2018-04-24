import React from 'react';
import P from 'prop-types';
import { StyledButton } from '../styled-components';

export const Title = (props) => {
  return (
    <StyledButton>
      {props.title}
    </StyledButton>
  );
}

Title.propTypes = {
  title: P.string
}