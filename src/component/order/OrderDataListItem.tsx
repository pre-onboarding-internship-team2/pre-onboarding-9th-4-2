import { T } from '../../styles/order/orderPage'

const OrderDataList = ({ data }: any) => {
    return (
        <T.tr>
            <T.td>{data.id}</T.td>
            <T.td>{data.transaction_time}</T.td>
            <T.td>{data.status ? '성공' : '실패'}</T.td>
            <T.td>{data.customer_id}</T.td>
            <T.td>{data.customer_name}</T.td>
            <T.td>{data.currency}</T.td>
        </T.tr>
    )
}

export default OrderDataList
