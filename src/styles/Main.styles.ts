import styled, { css } from 'styled-components/macro';

export const MainTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-right: 20px;
`;

export const FilterWrap = styled.div`
  display: flex;
  align-items: center;

  & span {
    font-size: 1.3rem;
  }
`;
export const Select = styled.select`
  height: 25px;
  margin: 0 20px 0 10px;
  border: 1px solid ${(props) => props.theme.colors.GREY_100};
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  height: 25px;
  padding: 2px 5px;
  margin: 0 10px 0 10px;
  border: 1px solid ${(props) => props.theme.colors.GREY_100};
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  height: 25px;
  whidth: 100%;
  padding: 2px 10px;
  border: none;
  font-size: 1.3rem;
  background-color: ${(props) => props.theme.colors.ORANGE};
  color: ${(props) => props.theme.colors.WHITE};
  border-radius: 5px;
`;
