import * as React from 'react';

type Quantity = number;

const Counter = () => {

    // Local State
    const [ quantity, setQuantity ] = React.useState<Quantity>(0);

    return (
        <div>
            <p>{ quantity }</p>
            <button type="button" className="button" onClick={ () => setQuantity(quantity - 1) }>-</button>
            <button type="button" className="button" onClick={ () => setQuantity(quantity + 1) }>+</button>
        </div>
    )
}

export default Counter;