import * as React from 'react';

interface Count {
    quantity: number
}

const Counter = () => {

    const count: Count = {
        quantity: 10
    }

    return (
        <div>{ count.quantity }</div>
    )
}

export default Counter;