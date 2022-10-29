import React from "react";
import style from './style.module.scss';

interface Props {
    id: number,
    title: string,
    image: string,
    description: string
}

const Card: React.FC<Props> = ({id, title, image, description}) => {
    return (
        <div className={style.card} style={{backgroundImage: image}} key={id}>
            <img className={style.image} src={image} alt="test"/>
            <div className={style.title}>{title}</div>
        </div>
    )
}

export default Card