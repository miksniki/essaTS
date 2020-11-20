import React from 'react';
import Lugu from '../Lugu/Lugu';

import './Lood.scss';

type Props = {
    playlist: any[];
    handleClick: any;
}

const Lood: React.FC<Props> = ({ playlist, handleClick }) => {
    return (
        <div className="lood">
            <div>
                {
                playlist.map(((lugu:any, i:number) => {
                    return (
                        <Lugu 
                            key={lugu.looPilt} 
                            looNimi={lugu.looNimi}
                            laulja={lugu.laulja}
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