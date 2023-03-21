import { Routes, Route } from 'react-router-dom'
import OrderListPage from './component/Page/OrderListPage'
import GlobalStyle from './styles/global-styles'
import { AppLayout } from './styles/layout/AppLayout'

function App() {
    return (
        <>
            <GlobalStyle />
            <AppLayout>
                <Routes>
                    <Route path="/" element={<OrderListPage />} />
                </Routes>
            </AppLayout>
        </>
    )
}

export default App
