import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

export const PageButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #bfc4c9;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #bbc1c9;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #9fa3a8;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
