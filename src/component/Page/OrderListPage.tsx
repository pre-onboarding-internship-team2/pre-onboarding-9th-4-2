import { PageLayout } from '../../styles/layout/PageLayout'
import OrderTable from '../order/OrderTable'
import PageNation from '../pageNation/PageNation'

const OrderListPage = () => {
    return (
        <PageLayout>
            <OrderTable />
            <PageNation />
        </PageLayout>
    )
}

export default OrderListPage
