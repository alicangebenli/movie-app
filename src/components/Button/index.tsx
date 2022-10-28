import React from "react";
import styles from "./style.module.scss"
interface Props {
    onClick: any,
    text:string
}

const Button: React.FC<Props> = ({onClick,text}) => {
    return (
        <>
            <a className={styles.button} onClick={(event) => {
                event.preventDefault();
                onClick();
            }}>
                {text}
            </a>
        </>
    )
}

export default Button