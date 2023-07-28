const body = document.querySelector('body')
const canvas = document.getElementById('tela')
const ctx = canvas.getContext('2d')
const formulaRadGrau = (Math.PI/180)
const BuscaValorDeBolas = document.getElementById('nBalls')


// let rosto = new Image()
// rosto.src = 'amareloPuto.png'

// rosto.onload = () => {
//     ctx.drawImage(rosto, 50, 50, 100, 100, 50, 50, 100, 100)
// }

let inicia
let grauI = 0
let grauF = 0
BuscaValorDeBolas.addEventListener('click', (e) => {
    e.preventDefault()
    muitaBola()
})

function muitaBola () {
    for(let i = 0; i <= 50; i+= 1) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.9)`
        ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()* 90 + 10, formulaRadGrau*0, formulaRadGrau*360, false)
        ctx.fill()
    }
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(800, 350, 250, formulaRadGrau*grauF, formulaRadGrau*grauI, false)
    ctx.fill()
    grauI += 1
    if(grauI === 360) ctx.clearRect(550, 100, 500, 500), grauI = 0
    inicia = requestAnimationFrame(muitaBola)
}

// function grid() {
//     for (let i = 50; i < canvas.width; i += 50) {
//         ctx.beginPath()
//         ctx.lineTo(i, 0)
//         ctx.strokeStyle = 'black'
//         ctx.lineTo(i, canvas.height)
//         ctx.stroke()
//     }
//     for (let i = 50; i < canvas.width; i+= 50) {
//         ctx.beginPath()
//         ctx.strokeStyle = 'black'
//         ctx.lineTo(0, i)
//         ctx.lineTo(canvas.width, i)
//         ctx.stroke()
//     }
// }
let direcao
let rX = 0
let rY = 0
let size = 50
let move = size
let orloff
const direcoes = ['direita', 'esquerda', 'cima', 'baixo']

function randomDirections () {
    return direcao = direcoes[Math.floor(Math.random() * 4)]
}

function player() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // grid()
    ctx.fillStyle = 'white'
    ctx.fillRect(rX, rY, size, size)

    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.strokeRect(rX, rY, size, size)

    if (direcao === 'esquerda' && rX === 0) direcao = 'parado'
    if (direcao === 'direita' && rX === canvas.width - size) direcao = 'parado'
    if (direcao === 'cima' && rY === 0) direcao = 'parado'
    if (direcao === 'baixo' && rY === canvas.height - size) direcao = 'parado'

    body.addEventListener('keyup', ({ key }) => {
        if (key === 'r') direcao = randomDirections()
        if (key === 'ArrowLeft') direcao = 'esquerda', move = 50;
        if (key === 'ArrowRight') direcao = 'direita', move = 50;
        if (key === 'ArrowUp') direcao = 'cima', move = 50; 
        if (key === 'ArrowDown') direcao = 'baixo', move = 50;
        if (key === ' ') direcao = 'parado'
      })

    if (direcao === 'parado') rX += 0, rY += 0
    if (direcao === 'esquerda') rX += -move
    if (direcao === 'direita') rX += move
    if (direcao === 'cima') rY += -move
    if (direcao === 'baixo') rY += move

    orloff = setTimeout(() => {
        player()
    }, 50)
}

window.onload = () => {
    player()
}

