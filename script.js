// DOM Elements
let question_element = document.querySelector('.question')
let quiz_form = document.getElementById('quizForm')
let input_buttons = document.querySelectorAll('.input-options-container .container > div button')
let quiz_input = document.getElementById('quiz-input')
let announcement_element = document.getElementById('announcement')

// Scores Container Elements
let attempts_element = document.querySelector('.attempts .value')
let corrects_element = document.querySelector('.corrects .value')
let failed_element = document.querySelector('.failed .value')

/*
Symbols: 
    Degree    :  °
    Theta     : 
    Infinity  : 
    Root      :
*/

let DegreeSymbol = '°'
let ThetaSymbol = 'θ'
let InfinitySymbol = '∞'
let RootSymbol = '√'

// Scores Local Variables

if (localStorage.getItem('attempts')) {
    // Noting
} else {
    localStorage.setItem('attempts', 0)
}

if (localStorage.getItem('corrects')) {
    // Noting
} else {
    localStorage.setItem('corrects', 0)
}

if (localStorage.getItem('failed')) {
    // Noting
} else {
    localStorage.setItem('failed', 0)
}

let attempts = localStorage.getItem('attempts')
let corrects = localStorage.getItem('corrects')
let failed = localStorage.getItem('failed')

// Setting Score Values
attempts_element.innerHTML = attempts
corrects_element.innerHTML = corrects
failed_element.innerHTML = failed

// Input Values
let userOptionInputs = '' 
// Quiz
let quiz = ''
// Quiz Answer
let quiz_answer = ''

let options = {
    sin: {
        0: '0',
        30: '1/2',
        45: '1/√2',
        60: '√3/2',
        90: '1',
    },
    cos: {
        0: '1',
        30: '√3/2',
        45: '1/√2',
        60: '1/√2',
        90: '0',
    },
    tan: {
        0: '0',
        30: '1/√3',
        45: '1',
        60: '√3',
        90: '∞',
    },
    cot: {
        0: '∞',
        30: '√3',
        45: '1',
        60: '1/√3',
        90: '0',
    },
    sec: {
        0: '1',
        30: '2/√3',
        45: '√2',
        60: '2',
        90: '∞',
    },
    cosec: {
        0: '∞',
        30: '2',
        45: '√2',
        60: '2/√3',
        90: '1',
    }
}

let optionsAnswerV2 = {
    sin: (deg) => {
        if (deg === 0) {
            return '0'
        } else if (deg === 30) {
            return '1/2'
        } else if (deg === 45) {
            return '1/√2'
        } else if (deg === 60) {
            return '√3/2'
        } else if (deg === 90) {
            return '1'
        } else if (deg === undefined) {
            return false
        }
    },
    cos: (deg) => {
        if (deg === 0) {
            return '1'
        } else if (deg === 30) {
            return '√3/2'
        } else if (deg === 45) {
            return '1/√2'
        } else if (deg === 60) {
            return '1/2'
        } else if (deg === 90) {
            return '0'
        } else if (deg === undefined) {
            return false
        }
    },
    tan: (deg) => {
        if (deg === 0) {
            return '0'
        } else if (deg === 30) {
            return '1/√3'
        } else if (deg === 45) {
            return '1'
        } else if (deg === 60) {
            return '√3'
        } else if (deg === 90) {
            return '∞'
        } else if (deg === undefined) {
            return false
        }
    },
    cot: (deg) => {
        if (deg === 0) {
            return '∞'
        } else if (deg === 30) {
            return '√3'
        } else if (deg === 45) {
            return '1'
        } else if (deg === 60) {
            return '1/√3'
        } else if (deg === 90) {
            return '0'
        } else if (deg === undefined) {
            return false
        }
    },
    sec: (deg) => {
        if (deg === 0) {
            return '1'
        } else if (deg === 30) {
            return '2/√3'
        } else if (deg === 45) {
            return '√2'
        } else if (deg === 60) {
            return '2'
        } else if (deg === 90) {
            return '∞'
        } else if (deg === undefined) {
            return false
        }
    },
    cosec: (deg) => {
        if (deg === 0) {
            return '∞'
        } else if (deg === 30) {
            return '2'
        } else if (deg === 45) {
            return '√2'
        } else if (deg === 60) {
            return '2/√3'
        } else if (deg === 90) {
            return '1'
        } else if (deg === undefined) {
            return false
        }
    }
}

let optionsGenarator = (n) => {
    let posibilities = ['0', '1', '1/2', '1/√2', '2', '√2', '2/√3', '1/√3', '√3', '√3/2', '∞']
    let answer = n
    let mixPosV1 = []
    let mixPosV2 = []
    for (let i = 0; i < 10; i++) {
        mixPosV1.push(posibilities[Math.floor(Math.random() * posibilities.length)])
    }
    for (let i = 0; i < mixPosV1.length; i++) {
        let checker = mixPosV1[i]
        if (mixPosV2.indexOf(checker) === -1) {
            mixPosV2.push(checker)
        }
    }
    for (let i = mixPosV2.length-5; i > 0; i--) {
        mixPosV2.shift()
    }
    return mixPosV2
}

let quizGenarator = () => {
    let nPosibilities = ['sin', 'cos', 'tan', 'cot', 'sec', 'cosec']
    let dPosibilities = ['0', '30', '45', '60', '90']
    return {n: nPosibilities[Math.floor(Math.random() * nPosibilities.length)], d: dPosibilities[Math.floor(Math.random() * dPosibilities.length)]}
}

let getQuizAnswer = (n, d) => {
    if (n === 'sin') {
        return optionsAnswerV2.sin(d)
    } else if (n === 'cos') {
        return optionsAnswerV2.cos(d)
    } else if (n === 'tan') {
        return optionsAnswerV2.tan(d)
    } else if (n === 'cot') {
        return optionsAnswerV2.cot(d)
    } else if (n === 'sec') {
        return optionsAnswerV2.sec(d)
    } else if (n === 'cosec') {
        return optionsAnswerV2.cosec(d)
    }
}

let startQuiz = () => {
    let n = quizGenarator().n
    let d = Number(quizGenarator().d)
    let q = (n+d).toString()
    let quiz = `What is the value of ${q+DegreeSymbol} ?`

    // Deploy
    question_element.innerHTML = `${quiz}`
    quiz_answer = getQuizAnswer(n, d)
    // console.log(quiz)
}

quiz_form.addEventListener('submit', (e) => {
    e.preventDefault()
    // Local Storage Todos
    // Attempts
    attempts++
    localStorage.setItem('attempts', attempts)
    attempts_element.innerHTML = attempts

    if (quiz_input.value === quiz_answer) {
        announcement_element.innerText = 'Correct!'
        announcement_element.style.background = 'rgb(15, 185, 9)'
        announcement_element.style.display = 'initial'
        // Local Storage Todos
        // Corrects
        corrects++
        localStorage.setItem('corrects', corrects)
        corrects_element.innerHTML = corrects
        setTimeout(() => {
            announcement_element.innerText = 'Loading Quiz...'
            announcement_element.style.background = '#3498db'
        }, 1000)
        setTimeout(() => {
            announcement_element.innerText = ''
            announcement_element.style.background = 'transparent'
            announcement_element.style.display = 'none'
            window.location.reload()
        }, 2000)
    } else {
        userOptionInputs = ''
        quiz_input.value = ''
        announcement_element.innerText = 'Incorrect!'
        announcement_element.style.background = 'rgb(214, 34, 17)'
        announcement_element.style.display = 'initial'
        // Failed
        failed++
        localStorage.setItem('failed', failed)
        failed_element.innerHTML = failed
        setTimeout(() => {
            announcement_element.innerText = 'Try Again!'
            announcement_element.style.background = '#3498db'
        }, 1000)
        setTimeout(() => {
            announcement_element.innerText = ''
            announcement_element.style.background = 'transparent'
            announcement_element.style.display = 'none'
        }, 3000)
    }
})

// window.addEventListener('keydown', (e) => {
// })

input_buttons.forEach(input_button => {
    input_button.addEventListener('click', () => {
        const input_1_button_class = 'oneBtn'
        const input_2_button_class = 'twoBtn'
        const input_3_button_class = 'threeBtn'
        const input_4_button_class = 'fourBtn'
        const input_5_button_class = 'rootBtn'
        const input_6_button_class = 'infinityBtn'
        const input_7_button_class = 'divideBtn'
        const input_8_button_class = 'delBtn'
        const input_9_button_class = 'delAllBtn'

        if (input_button.classList[0] === input_1_button_class) {
            userOptionInputs += '0'
        } else if (input_button.classList[0] === input_2_button_class){
            userOptionInputs += '1'
        } else if (input_button.classList[0] === input_3_button_class){
            userOptionInputs += '2'
        } else if (input_button.classList[0] === input_4_button_class){
            userOptionInputs += '3'
        } else if (input_button.classList[0] === input_5_button_class){
            userOptionInputs += '√'
        } else if (input_button.classList[0] === input_6_button_class){
            userOptionInputs += '∞'
        } else if (input_button.classList[0] === input_7_button_class){
            userOptionInputs += '/'
        } else if (input_button.classList[0] === input_8_button_class){
            userOptionInputs = userOptionInputs.slice(0, -1)
        } else if (input_button.classList[0] === input_9_button_class){
            userOptionInputs = ''
        }

        quiz_input.value = userOptionInputs
    })
})

startQuiz()

// Hacks
// quiz_input.value = quiz_answer