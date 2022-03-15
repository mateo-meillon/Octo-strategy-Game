let mouseX, mouseY
document.addEventListener('mousemove', (event) => { mouseX = event.pageX, mouseY = event.pageY })

let money = 200
let moneyCounter = document.getElementById('counter')
function updateMoneyCounter() { moneyCounter.innerText = money }
updateMoneyCounter()

let wave = 1
let waveCounter = document.getElementById('wave')
function updateWaveCounter() { waveCounter.innerText = "ROUND: " + wave }
updateWaveCounter()

let grid = document.getElementById('grid')
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
let cardInHand = null
alphabet.reverse()

alphabet.forEach(l => {
    for (let i = 1; i <= 8; i++) {
        let cont = document.createElement('div')
        cont.classList.add('cont')
        cont.id = l + i

        let overlay = document.createElement('div')
        overlay.classList.add('overlay')
        overlay.classList.add(l)

        cont.appendChild(overlay)
        grid.appendChild(cont)

        grid.addEventListener('mouseover', (event) => {
            if (cardInHand == null) return
            let x = event.clientX, y = event.clientY
            let field = document.elementFromPoint(x, y);
            if (!field.classList.contains('a')&&!field.classList.contains('b')&&!field.classList.contains('c')) {
                if (l == 'a' || l == 'b' || l == 'c')
                    cont.classList.add('perm')
                else 
                    cont.classList.add('notperm')
            } else {
                cont.classList.remove('perm')
                cont.classList.remove('notperm')
            }
        })

        grid.addEventListener('mouseleave', (event) => {
            cont.classList.remove('perm')
            cont.classList.remove('notperm')
        })
    }
})

let bottom = document.getElementById('bottom')
let app = document.getElementById('app')
let cards = [
    {
        name: "soldier",
        costs: 6,
        img: "",
        movePattern: [1],
        lives: 3,
        damage: [1]
    },
    {
        name: "trap",
        costs: 8,
        img: "",
        movePattern: null,
        lives: 3,
        damage: [2],
    },
    {
        name: "archer",
        costs: 10,
        img: "",
        movePattern: [1],
        lives: 1,
        damage: [1, 2]
    },
    {
        name: "bomb",
        costs: 10,
        img: "",
        movePattern: null,
        lives: 0,
        damage: [3, 2, 1]
    },
    {
        name: "queen",
        costs: 30,
        img: "",
        movePattern: [1],
        lives: 4,
        damage: [3, 2, 1]
    }
]

let cardsInHand = 0
let maxCardsInHand = 5
function createCard(str) {
    let card = document.createElement('div')
    card.classList.add('card')
    card.id = str.name
    cardsInHand++
    bottom.appendChild(card)

    function pickUp(ucard) {
        ucard.remove()
        ucard.classList.add('moving')
        app.appendChild(ucard)
        cardInHand = ucard
        bottom.classList.add('hide')

        myLoop()
        function myLoop() {
            setTimeout(function() {
                if (!ucard.classList.contains('moving')) return;
                ucard.style.top = mouseY + 'px'
                ucard.style.left = mouseX + 'px'
                myLoop()
            }, 1)
        }
    }

    card.addEventListener('mousedown', (event) => {
        pickUp(card)
    })

    document.addEventListener('mouseup', (event) => {
        if (cardInHand == null) return
        let bcard = cardInHand
        cardInHand.classList.remove('moving')
        bottom.classList.remove('hide')
        cardInHand.remove()
        let x = event.clientX, y = event.clientY
        let field = document.elementFromPoint(x, y)
        if (!(field.classList.contains('a')||field.classList.contains('b')||field.classList.contains('c'))) {
            cardInHand++
            bottom.appendChild(cardInHand)
            cardInHand = null
        } else {
            cardInHand = null
            cardInHand--
            let pawn = document.createElement('div')
            pawn.classList.add('pawn', str.name)
            field.parentElement.appendChild(pawn)

            pawn.addEventListener('mousedown', (event) => {
                pawn.remove()
                app.appendChild(bcard)
                pickUp(bcard)
            })
        }
    })
}

cards.forEach(str => {
    createCard(str)
})

let ready = document.getElementById('ready')
ready.addEventListener('click', (event) => {
    ready.classList.toggle('ready')
    if (ready.classList.contains('ready'))
        ready.getElementsByTagName('a')[0].innerText = 'CANCEL'
    else 
        ready.getElementsByTagName('a')[0].innerText = 'READY'
})
ready.addEventListener('mouseleave', (event) => {
    ready.getElementsByTagName('a')[0].innerText = 'READY'
})
ready.addEventListener('mouseenter', (event) => {
    if (ready.classList.contains('ready'))
        ready.getElementsByTagName('a')[0].innerText = 'CANCEL'
    else 
        ready.getElementsByTagName('a')[0].innerText = 'READY'

})

let troups = document.getElementById('troups')
cards.forEach(one => {
    let card = document.createElement('div')
    card.classList.add('troup')
    let anchor = document.createElement('a')
    anchor.innerText = one.name.toUpperCase()
    let price = document.createElement('a')
    price.innerText = one.costs
    let container = document.createElement('div')
    container.classList.add('ccon')
    let coin = document.createElement('div')
    coin.classList.add('coin')

    container.appendChild(price)
    container.appendChild(coin)
    card.appendChild(anchor)
    card.appendChild(container)
    troups.appendChild(card)

    card.addEventListener('mouseover', (event) => {

    })
    card.addEventListener('mouseleave', (event) => {
        
    })

    card.addEventListener('click', (event) => {
        if (cardInHand >= maxCardsInHand) return
        if (money >= one.costs) {
            money = money - one.costs
            updateMoneyCounter()
            createCard(one)
        }
    })
})