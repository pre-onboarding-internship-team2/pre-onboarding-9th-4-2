import { useState } from 'react'

export const useSort = () => {
    const [isSort, setIsSort] = useState(false)

    const handleSort = () => {
        setIsSort((prev) => !prev)
    }

    return [isSort, handleSort] as const
}
