import { mockData } from '../data/mock_data.json'
import { DescendingOrderUtilType, SortedDataUtilType } from './type'

export const data_slice = (data?: SortedDataUtilType[] | undefined) => {
    const result = new Map()
    const sortedData: [] | SortedDataUtilType[] = data === undefined ? mockData : data
    let count = 0

    for (let i = 0; i < mockData.length / 50; i++) {
        result.set(i, sortedData.slice(count, count + 50))
        count += 50
    }

    return result
}

export const data_date_descendingOrder = () => {
    const sortedData = [...mockData]

    sortedData.sort((a: DescendingOrderUtilType, b: DescendingOrderUtilType) => {
        return new Date(b.transaction_time).valueOf() - new Date(a.transaction_time).valueOf()
    })

    return sortedData
}
