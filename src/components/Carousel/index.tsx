import React from "react";
import "./style.scss";
import {default as C} from 'react-bootstrap/Carousel';

interface Props {
    imageList: string[]
}

const Carousel: React.FC<Props> = ({imageList}) => {
    if (!Array.isArray(imageList) || imageList.length === 0) {
        return <></>;
    }
    return (
        <C>
            {imageList.map((image, index) => {
                return (
                    <C.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt="First slide"
                        />
                    </C.Item>
                )
            })}
        </C>
    )
}

export default Carousel