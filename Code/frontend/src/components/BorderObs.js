// Snake Game A Verção Mais Recente
// Mapa não Simétrico Com Border

/*  <-------------------------------------------->
                Nota Inportante

                para mudar o CSS das DIVs:
            - Snake
            - Principal
            - Mapa

        Fazer a className das divs ser igual ao seu
        conteudo
    <-------------------------------------------->
 */


import React, { Component } from "react";
import { cloneElement } from "react/cjs/react.development";
import styles from './grid.module.css';


const HEIGTH = 18;
const WIDTH = 40;
const LEFT_KEY = 37;
const RIGTH_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
// let pattern = ((i === 1 && (j === 17 || j === 16 || j === 15 || j === 14 || j === 13 || j === 12 || j === 11) ) && (j === 17 && (i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7)));

// const mapa = [{
//     x: 5,
//     y: 5,
// }]



const getRandom = () => {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGTH),
    }
};


const matriz = () => new Array(WIDTH).fill(0).map(() => new Array(HEIGTH).fill("content" /* "#cff6bf" */));
// DarkBlue
// Cornsilk
// YellowGreen

const initialState = {
    matriz: matriz(),
    // snake: [[1,2],[2,2],[3,2]],
    mapa: [
        { x: 32, y: 2, }, { x: 33, y: 2, }, { x: 24, y: 2, }, { x: 25, y: 2, }, { x: 26, y: 2, }, { x: 30, y: 2, }, { x: 27, y: 2, }, { x: 28, y: 2, }, { x: 29, y: 2, }, { x: 31, y: 2, },

        { x: 33, y: 9, }, { x: 33, y: 3, }, { x: 33, y: 4, }, { x: 33, y: 5, }, { x: 33, y: 6, }, { x: 33, y: 7, }, { x: 33, y: 8, }, { x: 33, y: 10, },

        { x: 13, y: 15, }, { x: 12, y: 15, }, { x: 11, y: 15, }, { x: 14, y: 15, }, { x: 15, y: 15, }, { x: 16, y: 15, }, { x: 7, y: 15, }, { x: 8, y: 15, }, { x: 9, y: 15, }, { x: 10, y: 15, }, { x: 18, y: 15, }, { x: 17, y: 15, }, { x: 20, y: 15, }, { x: 19, y: 15, }, { x: 15, y: 15, }, { x: 16, y: 15, }, { x: 7, y: 15, }, { x: 8, y: 15, }, { x: 9, y: 15, }, { x: 10, y: 15, },

        { x: 24, y: 8, }, { x: 25, y: 8, }, { x: 26, y: 8, }, { x: 23, y: 8, }, { x: 27, y: 8, }, { x: 28, y: 8, }, { x: 21, y: 8, }, { x: 22, y: 8, },

        { x: 4, y: 6, }, { x: 4, y: 7, }, { x: 4, y: 8, }, { x: 4, y: 9, }, { x: 4, y: 10, }, { x: 4, y: 11, }, { x: 4, y: 12, }, { x: 4, y: 13, },
    ],
    snake2: [
        {
            x: 1,
            y: 4,
        },
        {
            x: 2,
            y: 4,
        },

        {
            x: 3,
            y: 4,
        },
    ],
    // layout:[
    //     {
    //         x:0,
    //         y:0,
    //     }
    // ],
    food: getRandom(),
    direction: RIGTH_KEY,
    speed: 100,
    score: 0,
    gameover: false,
};


export class SnakeMapBorder extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    // componentDidMount() {
    //     this.drawMap();
    // }

    newScore = async () => {
        // console.log(localStorage.getItem("token"))
        const res = await fetch('/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                score: this.state.score
            })
        })
    }

    componentDidMount() {
        // this.drawMap();
        this.interval = setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.changeDirection;
        // document.addEventListener("keydown", this.changeDirection);
        // return () => document.removeEventListener("keydown", this.changeDirection);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.gameover === true) return;
        // this.drawMap();
        this.isCollapsed();
        this.Eaten();
        if (this.state.speed !== prevState.speed) {
            clearInterval(this.interval)
            this.interval = setInterval(this.moveSnake, this.state.speed);
        }
    }


    Eaten() {
        let snakeCopy = [...this.state.snake2];
        let head = { ...snakeCopy[snakeCopy.length - 1] };
        let food = this.state.food;
        if ((head.x === food.x) && (head.y === food.y)) {
            while (this.state.mapa.some(e => e.x === food.x && e.y === food.y)) this.setState({ food: getRandom() })
            snakeCopy.push(head);
            this.setState({
                snake2: snakeCopy,
                food: getRandom(),
                // speed: this.state.speed > 10 ? Math.round(this.state.speed * 0.95) : this.state.speed,
                score: this.state.score += 50,
            })
            console.log(this.state.speed)
        }
    }

    isCollapsed = () => {
        let copyMap = this.state.mapa;
        let snakeCopy = this.state.snake2;
        let head = { ...snakeCopy[snakeCopy.length - 1] }
        for (let i = 0; i < this.state.snake2.length - 3; i++) {
            if (((head.x === snakeCopy[i].x) && (head.y === snakeCopy[i].y))) {
                this.setState({
                    gameover: true,
                })
                this.newScore()
                // alert("Game Over " + `${copyScore * snakeCopy.length * this.state.speed}` );
                // if (document.onkeydown = )
                // this.setState(initialState);
                // this.setState({
                //     score: (this.state.snake2.length * this.state.speed) + this.state.score
                // })
            }
        }
        for (let i = 0; i < copyMap.length; i++) {
            if (((head.x === copyMap[i].x) && (head.y === copyMap[i].y))) {
                this.setState({
                    gameover: true,
                })
                this.newScore()
            }
        }

        if (head.x >= WIDTH) {
            this.setState({
                gameover: true,
            })
            this.newScore()
        }
        if (head.x < 0) {
            this.setState({
                gameover: true,
            })
            this.newScore()
        }
        if (head.y >= HEIGTH) {
            this.setState({
                gameover: true,
            })
            this.newScore()
        }
        if (head.y < 0) {
            this.setState({
                gameover: true,
            })
            this.newScore()
        }

    }


    moveSnake = () => {
        // let snakeCopy = [...this.state.snake]
        // let head = [snakeCopy[snakeCopy.length - 1][0], snakeCopy[snakeCopy.length - 1][1]];
        let snakeCopy = [...this.state.snake2]
        let head = { ...snakeCopy[snakeCopy.length - 1] };

        switch (this.state.direction) {
            case LEFT_KEY: head.x += -1; break;
            case RIGTH_KEY: head.x += 1; break;
            case DOWN_KEY: head.y += 1; break;
            case UP_KEY: head.y += -1; break;
            default: return;
        }
        // if (head.x >= WIDTH) {
        //     this.setState({
        //         gameover: true,
        //     })
        // }
        // if (head.x < 0) {
        //     this.setState({
        //         gameover: true,
        //     })
        // }
        // if (head.y >= HEIGTH) {
        //     this.setState({
        //         gameover: true,
        //     })
        // }
        // if (head.y < 0) {
        //     this.setState({
        //         gameover: true,
        //     })
        // }


        if (this.state.gameover === true) return
        snakeCopy.push(head)
        snakeCopy.shift()
        this.setState({
            snake2: snakeCopy,
            head: head
        });
        this.update();
    }

    // Função que vai desanhar o mapa
    // drawMap = () => {
    //     let grid = matriz()
    //         for(let i = 0; i < this.state.mapa.length; i++){
    //             grid[this.state.mapa[i].x][this.state.mapa[i].y] = "black"
    //         }
    //         this.setState({
    //             matriz: grid
    //         })

    // }

    update() {
        // let grid = matriz()
        // for(let k = 0; k < this.state.snake2.length ; k++){
        //     // if (grid.length > this.state.snake2[k].x )
        //     grid[this.state.snake2[k].x][this.state.snake2[k].y] = "snake" /* "DarkSeaGreen" */; // Vai Pintar no Grid A Snake nas posições que são iguais
        //     this.setState({
        //         matriz: grid
        //     })
        // } 

        // if ((this.state.snake2[k].x === this.state.food.x) &&(this.state.snake2[k].y === this.state.food.y )) {
        //     this.setState({
        //         food: getRandom()
        //     })
        // }
        // for (let i = 0; i < this.state.mapa.length; i++){
        //     grid[this.state.mapa[i].x][this.state.mapa[i].y] = "block" /* "black" */
        // }
        // for (let i = 0; i < this.state.snake2.length - 2; i++) {
        //     if ((this.state.snake2[i].x === this.state.food.x) && (this.state.snake2[i].y === this.state.food.y) ) {
        //         this.setState({
        //             food: getRandom()
        //         })
        //         return
        //     }
        // }
        //     grid[this.state.food.x][this.state.food.y] = "fruit" /* `MediumAquaMarine` */ /* DarkSeaGreen */
        //     this.setState({
        //         matriz: grid
        //     })
        //Pintar A Comida
        for (let i = 0; i < this.state.mapa.length; i++) {
            if ((this.state.mapa[i].x === this.state.food.x) && (this.state.mapa[i].y === this.state.food.y)) {
                this.setState({
                    food: getRandom()
                })
                return
            }
        }

    }

    changeDirection = ({ keyCode }) => {
        let direction = this.state.direction;
        switch (keyCode) {
            case LEFT_KEY:
                direction = (direction === RIGTH_KEY) ? RIGTH_KEY : LEFT_KEY;
                break;
            case RIGTH_KEY:
                direction = (direction === LEFT_KEY) ? LEFT_KEY : RIGTH_KEY;
                break;
            case UP_KEY:
                direction = (direction === DOWN_KEY) ? DOWN_KEY : UP_KEY;
                break;
            case DOWN_KEY:
                direction = (direction === UP_KEY) ? UP_KEY : DOWN_KEY;
                break;
            default: break;
        }
        this.setState({
            direction: direction
        });
    }

    render() {
        const snakeCopy = [...this.state.snake2]
        const snakeCopy2 = snakeCopy.slice(0, -1)
        const head = { ...snakeCopy[snakeCopy.length - 1] };
        const init = initialState;
        const playboard = this.state.matriz.map((l, i) =>
        (<div key={i} >{l.map((c, j) => {
            if (snakeCopy2.some(e => e.x === i && e.y === j)) {
                return (<div key={j} className={styles.snake}>
                </div>)
            }
            // if (snakeCopy2.some(e => e.x === i && e.y === j) && this.state.direction === LEFT_KEY ) {
            //     return (<div key={j} className={styles.snakeL}>
            //         </div>)

            // }
            // if (snakeCopy2.some(e => e.x === i && e.y === j) && this.state.direction === UP_KEY ) {
            //     return (<div key={j} className={styles.snakeUP}>
            //         </div>)

            // }
            // if (snakeCopy2.some(e => e.x === i && e.y === j) && this.state.direction === DOWN_KEY ) {
            //     return (<div key={j} className={styles.snake}>
            //         </div>)

            // }
            if (this.state.mapa.some(e => e.x === i && e.y === j)) {
                return (<div key={j} className={styles.block}>
                </div>)

            }
            if (this.state.food.x === i && this.state.food.y === j) {
                return (<div key={j} className={styles.fruit}>
                </div>)

            }
            if (head.x === i && head.y === j && this.state.direction === RIGTH_KEY) {
                return (<div key={j} className={styles.headR}>
                </div>)

            }
            if (head.x === i && head.y === j && this.state.direction === LEFT_KEY) {
                return (<div key={j} className={styles.headL}>
                </div>)

            }
            if (head.x === i && head.y === j && this.state.direction === DOWN_KEY) {
                return (<div key={j} className={styles.headDOWN}>
                </div>)

            }
            if (head.x === i && head.y === j && this.state.direction === UP_KEY) {
                return (<div key={j} className={styles.headUP}>
                </div>)

            }

            return (<div key={j} className={styles[c]}>
            </div>)
        })
        }
        </div>));
        return (
            <div className={styles.All} >
                <div className={styles.score}> Score: {this.state.score} </div>
                <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${WIDTH}, 34px)` }}> {playboard} </div>
                <div className={styles.All}>
                    {
                        this.state.gameover ?
                            <div className={styles.gameover}> Game Over <br /> Score: {this.state.score} <br /><button className={styles.restart} onClick={() => this.setState(init)}>Reiniciar</button></div>
                            : []
                    }
                </div>
            </div>
        )
    }
}