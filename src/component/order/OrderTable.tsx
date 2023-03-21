import OrderDataListItem from './OrderDataListItem'

import { useSelector } from 'react-redux'

import { data_slice } from '../../utils/pageDataUtil'
import { T } from '../../styles/order/orderPage'

import { RootState } from '../../store/store'

const OrderTable = () => {
    const num = useSelector((state: RootState) => state.pageNation.pageNumber)
    const productDataList: object[] = Object.values(data_slice().get(num))

    return (
        <T.table>
            <T.thead>
                <T.tr>
                    <T.th>
                        <T.button>주문번호</T.button>
                    </T.th>
                    <T.th>
                        <T.button>거래시간</T.button>
                    </T.th>
                    <T.th>
                        <T.button>주문처리상태</T.button>
                    </T.th>
                    <T.th>
                        <T.button>고객번호</T.button>
                    </T.th>
                    <T.th>
                        <T.button>고객이름</T.button>
                    </T.th>
                    <T.th>
                        <T.button>가격</T.button>
                    </T.th>
                </T.tr>
            </T.thead>
            <T.tbody>
                {productDataList.map((element: any) => (
                    <OrderDataListItem key={element.id} data={element} />
                ))}
            </T.tbody>
        </T.table>
    )
}

export default OrderTable

// map 함수에서 any 타입을 넣지 않으면 에러가 나는데 도대체 왜 나는지 모르겠음

// 50개씩 나눠서 배열에 저장
// key 값은 page 번호
