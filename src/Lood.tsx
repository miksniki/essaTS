import React from 'react';
import Lugu from './Lugu';

const Lood: React.FC<any> = ({ playlist, handleClick }) => {
    return (
        <div>
            <div>
                {
                playlist.map(((lugu:any, i:number) => {
                    return (
                        <Lugu 
                            key={lugu.looPilt} 
                            looPilt={lugu.looPilt}
                            handleClick={handleClick}
                            index={i}
                        />
                    )
                }))}
            </div>
        </div>
    )
}

export default Lood;