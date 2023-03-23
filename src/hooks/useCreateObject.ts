import { useEffect, useState } from 'react'

import { mockData } from '../data/mock_data.json'

export const useCreateObject = () => {
    const [sortedArr, setSortedArr] = useState<object[]>([])
    const sortedObj = new Map()
    let count = 0

    for (let i = 0; i < mockData.length / 50; i++) {
        sortedObj.set(i, sortedArr.slice(count, count + 50))
        count += 50
    }

    return [sortedObj, setSortedArr] as const
}
