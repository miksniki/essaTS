import React from 'react';
import './Lugu.scss';

type Props = {
    looPilt: string;
    looNimi: string;
    laulja: string
    handleClick: any;
    index: number
}

const Lugu: React.FC<Props> = ({ looNimi, laulja, looPilt, handleClick, index }) => {
    return (
        <div>
           <img 
                src={looPilt} 
                className="pildike" 
                alt="pildike" 
                onClick={handleClick} 
                data-index={index}
           />
           <div className="wrapper">
                <p 
                    onClick={handleClick}
                    data-index={index}
                >
                {laulja} - {looNimi}
                </p>
           </div>
        </div>
    )
}

export default Lugu;