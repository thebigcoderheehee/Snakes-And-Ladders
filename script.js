let RollSound = new Audio('./Dice-Roll.mp3')
let WinSound = new Audio('./win-sound.mp3')
let P1Sum = 0
let P2Sum = 0
let Toggler = 1

document.querySelector(".game-container").style.display = "none"

function StartGame() {
    const P1Color = document.getElementById("p1-color").value
    const P2Color = document.getElementById("p2-color").value

    if (P1Color === P2Color) {
        alert("You Cannot Choose The Same Color!!!")
        return
    }

    const Pawn1 = document.getElementById("p1")
    const Pawn2 = document.getElementById("p2")

    Pawn1.style.backgroundColor = P1Color
    Pawn2.style.backgroundColor = P2Color

    document.getElementById('start-screen').style.display = "none"
    document.querySelector(".game-container").style.display = "flex"
}

function Play(Player, PSum, Correction, Num) {
    let Sum
    if (PSum === "P1Sum") {
        P1Sum += Num
        if (P1Sum > 100) P1Sum -= Num

        if (P1Sum === 1) P1Sum = 38
        if (P1Sum === 4) P1Sum = 14
        if (P1Sum === 8) P1Sum = 30
        if (P1Sum === 21) P1Sum = 42
        if (P1Sum === 28) P1Sum = 76
        if (P1Sum === 50) P1Sum = 67
        if (P1Sum === 71) P1Sum = 92
        if (P1Sum === 80) P1Sum = 99

        if (P1Sum === 32) P1Sum = 10
        if (P1Sum === 36) P1Sum = 6
        if (P1Sum === 48) P1Sum = 26
        if (P1Sum === 62) P1Sum = 18
        if (P1Sum === 88) P1Sum = 24
        if (P1Sum === 95) P1Sum = 56
        if (P1Sum === 97) P1Sum = 78

        Sum = P1Sum
    }

    if (PSum === "P2Sum") {
        P2Sum += Num
        if (P2Sum > 100) P2Sum -= Num

        if (P2Sum === 1) P2Sum = 38
        if (P2Sum === 4) P2Sum = 14
        if (P2Sum === 8) P2Sum = 30
        if (P2Sum === 21) P2Sum = 42
        if (P2Sum === 28) P2Sum = 76
        if (P2Sum === 50) P2Sum = 67
        if (P2Sum === 71) P2Sum = 92
        if (P2Sum === 80) P2Sum = 99

        if (P2Sum === 32) P2Sum = 10
        if (P2Sum === 36) P2Sum = 6
        if (P2Sum === 48) P2Sum = 26
        if (P2Sum === 62) P2Sum = 18
        if (P2Sum === 88) P2Sum = 24
        if (P2Sum === 95) P2Sum = 56
        if (P2Sum === 97) P2Sum = 78

        Sum = P2Sum
    }
    const Pawn = document.getElementById(Player)
    let Left = 0;
    let Top = 0;

    if (Sum < 10) {
        Left = (Sum - 1) * 62;
        Top = -0 * 62 - Correction;
    } else if (Sum === 100) {
        WinSound.play()
        setTimeout(() => {
            alert(Player === "p1" ? "Player 1 Won!!! 🎉🎊" : "Player 2 Won!!! 🎉🎊")
            location.reload()
        }, 100);
        return;
    } else {
        const NumberArray = Array.from(String(Sum))
        const N1 = parseInt(NumberArray.length === 2 ? NumberArray[0] : '0')
        const N2 = parseInt(NumberArray.length === 2 ? NumberArray[1] : NumberArray[0])

        if (N1 % 2 !== 0) {
            if (N2 === 0) {
                Left = 9 * 62;
                Top = (-N1 + 1) * 62 - Correction
            } else {
                Left = (9 - (N2 - 1)) * 62
                Top = -N1 * 62 - Correction
            }
        } else {
            if (N2 === 0) {
                Left = 0
                Top = (-N1 + 1) * 62 - Correction
            } else {
                Left = (N2 - 1) * 62
                Top = -N1 * 62 - Correction
            }
        }
    }
    Pawn.style.left = `${Left}px`
    Pawn.style.top = `${Top}px`
    Pawn.classList.remove('jump')
    void Pawn.offsetWidth
    Pawn.classList.add('jump')
}

function RollDice() {
    let Num = Math.floor(Math.random() * 6) + 1;
    console.log(Num)
    RollSound.play()
    const Cube = document.getElementById("cube")
    const SpinX = 360 * (Math.floor(Math.random() * 4) + 1)
    const SpinY = 360 * (Math.floor(Math.random() * 4) + 1)
    let BaseX = 0
    let BaseY = 0
    switch (Num) {
        case 1:
            BaseX = 0
            BaseY = 0
            break;

        case 2:
            BaseX = 0
            BaseY = 180
            break;

        case 3:
            BaseX = 0
            BaseY = -90
            break;

        case 4:
            BaseX = 0
            BaseY = 90
            break;

        case 5:
            BaseX = -90
            BaseY = 0
            break;

        case 6:
            BaseX = 90
            BaseY = 0
            break;
    }
    const FinalX = BaseX + SpinX
    const FinalY = BaseY + SpinY
    Cube.style.transform = `rotateX(${FinalX}deg) rotateY(${FinalY}deg)`;

    setTimeout(() => {
        if (Toggler % 2 !== 0) {
            document.getElementById("toggler").innerText = "Player 2's Turn!"
            Play('p1', 'P1Sum', 0, Num)
        } else {
            document.getElementById("toggler").innerText = "Player 1's Turn!"
            Play('p2', 'P2Sum', 55, Num)
        }
        Toggler++
    }, 800);
}