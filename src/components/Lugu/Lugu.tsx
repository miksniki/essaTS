import React from 'react';
import './Lugu.scss';

type Props = {
    looPilt: string;
    handleClick: any;
    index: number
}

const Lugu: React.FC<Props> = ({ looPilt, handleClick, index }) => {
    return (
        <div>
           <img 
                src={looPilt} 
                className="pildike" 
                alt="pildike" 
                onClick={handleClick} 
                data-index={index}
           />
        </div>
    )
}

export default Lugu;