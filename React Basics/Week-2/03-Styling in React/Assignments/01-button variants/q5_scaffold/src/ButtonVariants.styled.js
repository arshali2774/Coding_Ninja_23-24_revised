import styled, { css } from 'styled-components';

export const ButtonView = styled.button`
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.filled &&
    css`
      background-color: ${props.bg};
      color: ${props.color};
      border: none;
    `}

  &:hover {
    background-color: #f0f0f0;
  }
`;
