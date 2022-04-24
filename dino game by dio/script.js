const dino = document.querySelector('.dino');
const background = document.querySelector('.background')

let isJumping = false
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    //ATIVANDO A TECLA SELECIONADA = BARRA DE ESPAÇO
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval)

            //DESCENDO
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            })
        } else {
            //SUBINDO
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus);

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            //SAIU DA TELA
            clearInterval(leftTimer)
            background.removeChild(cactus)
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //GAME OVER
            clearInterval(leftTimer);
            document.body.innerHTML = '<h1 class="gameOver">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyUp)