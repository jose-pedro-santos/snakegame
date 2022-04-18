import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Menu.css"


export function Menu() {
    const [visible, setVisible] = useState(true)
    const [username, setUsername] = useState("")
    const [score, setScore] = useState("")
    const [scores, setScores] = useState([])
    const [fields, setFields] = useState({
        username: "",
        score: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        // console.log("yo")
        getUsername()
    }, [])

    async function getUsername() {
        // console.log(localStorage.getItem("token"))
        const res = await fetch('/username', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })

        const responseJson = await res.json({});
        // console.log(responseJson)
        setUsername(responseJson.username)
        await getScore(responseJson.username)
        await getScores(responseJson.username)
    }

    async function getScore(username) {
        console.log(fields)
        const res = await fetch('/user/highest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        })
        if (scores === undefined) {
            return 0
        }
        const responseJson = await res.json({});
        // console.log(responseJson)
        setScore(responseJson.score)
    }


    async function getScores(username) {
        // console.log(localStorage.getItem("token"))
        const res = await fetch('/user/lastfive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        })

        const responseJson = await res.json({});
        // console.log(responseJson)
        setScores(responseJson.scores)
    }

    return (
        <div>
            <div>
                <span className="back">
                    <button className="backbutton" onClick={() => navigate("/")}></button>
                </span>
                <h1 className="titlemenu">SNAKE</h1>
                {
                    !visible ? <button className="close" onClick={() => setVisible(s => !s)}></button>
                        : ""
                }
                <div>
                    {
                        visible ?
                            <div className="main">
                                <div className="usernamecontainer">
                                    <p className="username"> <img className="snakeimg" src={require("./image.png")} width="130" height="130" /> HELLO, {username}! </p>
                                </div><div className="play">
                                    <button onClick={() => setVisible(st => !st)} className="playbutton">
                                        <div className="playtext">
                                            PLAY
                                        </div>
                                    </button>
                                </div>

                                <div className="scores">
                                    <p>Your highest score is <span>{score}</span>!</p>
                                    <p>Your latest scores are <br></br>{scores ? scores.map(e => e.score).join(', ') : 0}!</p>
                                </div>
                            </div>
                            : ""
                    }
                </div>
                <div>
                    {
                        !visible ? <Map /> : ""
                    }
                </div>
            </div>
        </div >
    )
}



const Map = () => {

    const navigate = useNavigate()

    return (
        <div className="containerMap">
            <h2 className="selectM">SELECT MAP</h2>
            <div className="containermaps">
                <div className="maps">
                    <button className="map1" onClick={() => navigate("/play1")}>BORDERLESS</button>
                    <button className="map2" onClick={() => navigate("/play2")}>BORDER</button>
                    <button className="map3" onClick={() => navigate("/play3")}>BORDERLESS & OBSTACLES</button>
                    <button className="map4" onClick={() => navigate("/play4")}>BORDER & OBSTACLES</button>
                </div>
            </div>
        </div>
    )
}


// const Difficulty = () => {
//     return (
//         <div>
//             <h2 className="selectM">Select Difficulty</h2>
//             <div className="containerdif">
//                 <div className="difficulty">
//                     <button className="easy">EASY</button>
//                     <button className="medium">MEDIUM</button>
//                     <button className="hard">HARD</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Menu;
