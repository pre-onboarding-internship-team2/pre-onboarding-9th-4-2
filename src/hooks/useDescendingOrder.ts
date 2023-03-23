import { SetStateAction, useState } from 'react'

import { mockData } from '../data/mock_data.json'

export const useDescendingOrder = () => {
    const [keyword, setKeyword] = useState<string>('')
    const [sortedArr, setSortedArr] = useState([...mockData])

    switch (keyword) {
        case 'transaction_time': {
            sortedArr.sort((a, b) => {
                return (
                    new Date(b.transaction_time).valueOf() - new Date(a.transaction_time).valueOf()
                )
            })
            break
        }
        case 'id': {
            sortedArr.sort((a, b) => {
                return b.id - a.id
            })
            break
        }
    }

    return [sortedArr, setKeyword] as const
}
