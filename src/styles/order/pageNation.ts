import styled from 'styled-components'

export const PN = {
    Box: styled.div`
        margin-top: 20px;
    `,
    ol: styled.ol`
        display: flex;
    `,
    li: styled.li`
        width: 20px;
        height: 20px;
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }
    `,
    button: styled.button`
        width: inherit;
        height: inherit;
    `,
}
