import { PN } from '../../styles/order/pageNation'
import { data_slice } from '../../utils/pageDataUtil'
import { useDispatch } from 'react-redux'
import { pageNumClick } from '../../store/slices/pageNationSlice'

const PageNation = () => {
    const dispatch = useDispatch()

    const pageNumList = [...data_slice().keys()]

    const handlePageNum = (pageNumber: number) => dispatch(pageNumClick(pageNumber))

    return (
        <PN.Box>
            <PN.ol>
                {pageNumList.map((element) => (
                    <PN.li key={element}>
                        <PN.button onClick={() => handlePageNum(element)}>{element + 1}</PN.button>
                    </PN.li>
                ))}
            </PN.ol>
        </PN.Box>
    )
}

export default PageNation
