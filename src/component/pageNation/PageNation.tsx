import { PN } from '../../styles/order/pageNation'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useDispatch } from 'react-redux'
import { pageNumClick } from '../../store/slices/pageNationSlice'

const PageNation = () => {
    const dispatch = useDispatch()
    const [sortedObj, setSortedArr] = useCreateObject()

    const pageNumList = [...sortedObj.keys()]

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
