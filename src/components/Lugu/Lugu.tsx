import React from 'react';
import './Lugu.scss';

interface IProps {
    looPilt: string;
    handleClick: any;
    index: number
}

const Lugu: React.FC<IProps> = ({ looPilt, handleClick, index }) => {
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