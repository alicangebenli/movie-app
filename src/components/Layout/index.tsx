import React from "react";
import './style.scss'
import Link from "../Link";
interface Props {
    children : JSX.Element
}

export const Layout:React.FC<Props> = ({children}) => {
    return(
        <div className="layout">
            <div className="menu-list">
                <div className="menu-item logo">
                    Movie
                </div>
                <div className="menu-item">
                    <Link url={"/"}>
                        Home
                    </Link>
                </div>
                <div className="menu-item">
                    <Link url={"/favorites"}>
                        Favorites
                    </Link>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}