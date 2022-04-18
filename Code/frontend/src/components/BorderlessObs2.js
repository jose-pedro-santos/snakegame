import { useNavigate } from "react-router-dom"
import { SnakeMap3 } from "./BorderlessObs.js"
import styles from './grid.module.css';


export function BorderlessObs() {

    let navigate = useNavigate()

    return (
        <div>
            <h1 className={styles.titlemap}>SNAKE</h1>
            <span className={styles.back}>
                <button className={styles.backbutton} onClick={() => navigate("/home")}></button>
            </span>
            <div>
                <SnakeMap3 />
            </div>

        </div>
    )
}