export function increment(num) {
    return {
        type: 'INCREMENT',
        data: num
    }
}

export function decrement(num) {
    return {
        type: 'DECREMENT',
        data: num
    }
}