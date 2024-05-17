// reusable.styled.js
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.bg};
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;
`;

export const Container = styled.div`
  display: flex;
  flex: ${(props) => props.flex || 1};
  flex-direction: column;
  gap: 10px;
`;
