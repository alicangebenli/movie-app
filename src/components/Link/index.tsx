import React from "react";
import {Link as L} from "react-router-dom";
import styles from "./style.module.scss"
interface Props {
    children:JSX.Element | string,
    url:string,
    onClick?: any
}

const Link:React.FC<Props> = ({children,url, onClick= ()=>{}}) => {
    return (
        <L to={url} className={styles.link} onClick={onClick}>
            {children}
        </L>
    )
}

export default Link