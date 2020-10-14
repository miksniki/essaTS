import React from 'react';
import './ValitudLugu.scss';

const ValitudLugu: React.FC<any> = ({ lugu }) => {
    return (
        <div>
            <img src={lugu.looPilt} alt='pildike'/>
        </div>
    )
}

export default ValitudLugu;