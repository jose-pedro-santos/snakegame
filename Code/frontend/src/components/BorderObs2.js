import { useNavigate } from "react-router-dom"
import { SnakeMapBorder } from "./BorderObs.js"
import styles from './grid.module.css';


export function BorderObs() {

    let navigate = useNavigate()

    return (
        <div>
            <h1 className={styles.titlemap}>SNAKE</h1>
            <span className={styles.back}>
                <button className={styles.backbutton} onClick={() => navigate("/home")}></button>
            </span>
            <div>
                <SnakeMapBorder />
            </div>

        </div>
    )
}