import { useNavigate } from "react-router-dom"
import { SnakeNoBorder } from "./Borderless.js"
import styles from './grid.module.css';


export function Borderless() {

    let navigate = useNavigate()

    return (
        <div>
            <h1 className={styles.titlemap}>SNAKE</h1>
            <span className={styles.back}>
                <button className={styles.backbutton} onClick={() => navigate("/home")}></button>
            </span>
            <div>
                <SnakeNoBorder />
            </div>

        </div>
    )
}