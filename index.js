
const game = document.getElementById('game')
let balance
if (localStorage.getItem('balance') == undefined) {
    localStorage.setItem('balance', 1000)
    balance = Number(localStorage.getItem('balance'))
} else {
    balance = Number(localStorage.getItem('balance'))
}
if (balance == 0) {
    alert('You have no more money! Game over!')
    const reset = prompt('wish to play again ? (yes/no)')

    if (reset == 'yes') {
        localStorage.removeItem('balance')
        alert('Balance Restored!')
        location.reload()
    } else if (reset == 'no') {
        alert('thanks for visiting')
    } else {
        alert('Invalid input')
        location.reload()
    }
    
}
const balanceEl = document.getElementById('balance')
localStorage.setItem('stats', 'notStarted')
balanceEl.textContent = `Your Balance : $${balance}`
let amount = undefined
document.getElementById('bet').addEventListener('click' , function() {
    bet(Number(document.getElementById('betAmount').value))
})
document.getElementById('allIn').addEventListener('click' , function() {
    document.getElementById('betAmount').value = balance
    document.getElementById('allIn').style.display = 'none'
})

const bet = () => {
    amount = Number(document.getElementById('betAmount').value)
    if (amount == undefined || amount == null || amount == '') {
        alert('Enter a bet')
        return;
    }
    document.getElementById('allIn').style.display = 'none'
    document.getElementById('betAmount').style.display = 'none'

    document.getElementById('bet').style.display = 'none'
    localStorage.setItem('stats', 'started')
    if (amount > balance) {
        alert('You do not have enough balance to place this bet')
        location.reload()
    } else {
        balance -= amount;
        balanceEl.textContent = `Your Balance : ${balance}`
        setMine()
    }
}

const setMine = () => {
    const randomNumber = getRandomNumber()
    setGems(randomNumber)
    document.getElementById(`box${randomNumber}`).addEventListener('click', function(e) {
        console.log(e.target)
        const El = e.target
        const img = document.createElement('img')
        img.src = 'mine.png'
        img.style.width = '40px'
        img.style.height = '40px'
        El.appendChild(img)
        calCash(true)
        amount = 0
        localStorage.setItem('balance', balance)
        document.getElementById('cashOutBtn').style.display = 'none'
        lose()
    })
    // console.log(document.getElementById(`box${randomNumber}`))
}

const setGems = (mine) => {
    const btn = document.createElement('button')
    btn.addEventListener('click', function() {
        cashOut(calCash(),amount)
    })
    document.getElementById('buttons').appendChild(btn)
    btn.textContent = `Cash Out`
    btn.id = 'cashOutBtn'
    for (let i = 1;i != 26;i++) {
        if (i == mine) {
            continue
        }
        console.log(`added ${i} box as a gem`)
            document.getElementById(`box${i}`).addEventListener('click', function(e) {
                if (amount !== 0) {
                    if (clicked[i-1] === false) {
                        const El = e.target
                        const img = document.createElement('img')
                        img.src = 'gem.png'
                        img.style.width = '40px'
                        img.style.height = '40px'
                        El.appendChild(img)
                        // calCashCal()
                        // console.log('click')
                        clicked[i-1] = !clicked[i-1]
                        calCash()
                    } else {
                        // console.log('already clicked')
                    }
                }

            })
    }
}

const lose = () => {
    if (localStorage.getItem('stats') == 'ended') {
        return 1
    } else if (localStorage.getItem('stats') == 'started') {
        localStorage.setItem('stats','ended')
        // alert('You Lose')
        const btn = document.createElement('button')
        btn.onclick = () => {
            location.reload()
        }
        btn.textContent = 'try again'
        document.getElementById('buttons').appendChild(btn)
    }
}


function getRandomNumber() {
  // Set the minimum and maximum values for the random number range
  const min = 1;
  const max = 25;

  // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Multiply the random decimal by the range (max - min + 1) and add min
  // This scales the random decimal to be within the desired range
  const randomNumber = Math.floor(randomDecimal * (max - min + 1) + min);

  return randomNumber;
}


const getBoolean = (str) => {
    if (str === 'true') {
        return true
        } else {
            return false
            }
}
const getStringBoolean = (bool) => {
    if (bool === true) {
        return 'true'
        } else {
            return 'false'
            }
}
const calCash = (mineClicked) => {
    if (mineClicked) {
        document.getElementById('multiplier').textContent = `Multiplier : x${0}`
        return 0;
    }
    let multiplier = 1;
    for (let element of clicked) {
      if (element === true) {
        multiplier += 0.05;
      }
    }
    multiplier = multiplier.toFixed(2)
    document.getElementById('multiplier').textContent = `Multiplier : x${multiplier}`
    return multiplier;
}

document.getElementById('info').addEventListener('click', function() {
    alert
    (`
        - how to play :
        1. enter a bet
        2. select a box, there is a chance of it being a bomb or a gem
        3. your bet amount multiplier will increase by clicking each gem
        4. cash out with the money you earned, even with no clicks
        - if there was any bug you can contact me!
        Email : lopmahzwork@gmail.com
        `)
})

const cashOut = (multiplier,amount) => {
    balance += amount * multiplier
    document.getElementById('balance').textContent = `Balance : $${balance}`
    localStorage.setItem('balance', balance)
    location.reload()
}

const clicked = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]