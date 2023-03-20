import React from 'react';
import * as S from '../styles/Table.styles';

import Pagination from 'components/Pagination';

export default function Table() {
  return (
    <S.TableContainer>
      <S.Thead>
        <tr>
          <th>주문번호</th>
          <th>거래시간</th>
          <th>주문처리상태</th>
          <th>고객번호</th>
          <th>고객이름</th>
          <th>가격</th>
        </tr>
      </S.Thead>
      <S.Tbody>
        <tr>
          <td>1</td>
          <td>2023-03-07 17:39:50</td>
          <td>true</td>
          <td>15</td>
          <td>Holmes Howard</td>
          <td>$5.61</td>
        </tr>
      </S.Tbody>
    </S.TableContainer>
  );
}
