import { mockData } from '../data/mock_data.json'

export const data_slice = () => {
    const result = new Map()
    let count = 0

    for (let i = 0; i < mockData.length / 50; i++) {
        result.set(i, mockData.slice(count, count + 50))
        count += 50
    }

    return result
}
