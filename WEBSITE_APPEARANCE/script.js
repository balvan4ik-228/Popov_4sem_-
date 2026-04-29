window.onload = function() {
    let currentNumber = ''
    let resultDisplayed = false
    let errorDisplayed = false
    let fullExpression = ''
    let lastResult = 0

    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function scrollToEnd() {
        const container = document.querySelector('.screen-container');
        if (container) {
            container.scrollLeft = container.scrollWidth;
        }
    }

    function showError(message) {
        errorDisplayed = true
        outputElement.innerHTML = message
        outputElement.style.color = '#ff6b6b'
        setTimeout(() => {
            if (errorDisplayed) {
                outputElement.style.color = '#ffffff'
                errorDisplayed = false
                outputElement.innerHTML = '0'
                currentNumber = ''
                fullExpression = ''
                resultDisplayed = false
            }
        }, 1500)
    }

    function getColorFromHexValue(value) {
        const num = parseFloat(value)
        if (isNaN(num) || num < 0) return '#ffffff'

        let hexValue = Math.floor(Math.abs(num)).toString(16)

        if (hexValue.length > 6) {
            hexValue = hexValue.slice(0, 6)
        }

        while (hexValue.length < 6) {
            hexValue = hexValue + hexValue
        }
        hexValue = hexValue.slice(0, 6)

        return `#${hexValue}`
    }

    function updateDisplay(value, colorize = false) {
        if (errorDisplayed) return
        if (value === '' || value === undefined) {
            outputElement.innerHTML = '0'
            outputElement.style.color = '#ffffff'
        } else {
            if (colorize && !isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
                const num = parseFloat(value)
                if (num >= 0 && Number.isInteger(num)) {
                    const colorValue = getColorFromHexValue(num.toString())
                    outputElement.style.color = colorValue
                    outputElement.innerHTML = value
                    return
                }
            }
            outputElement.innerHTML = value
            outputElement.style.color = '#ffffff'
        }
        scrollToEnd()
    }

    function evaluateExpression(expr) {
        if (expr === '') return 0

        expr = expr.replace(/×/g, '*')

        if ('+-*/'.includes(expr[expr.length - 1])) {
            expr = expr.slice(0, -1)
        }

        const tokens = []
        let i = 0
        let currentToken = ''

        while (i < expr.length) {
            const char = expr[i]
            if ('0123456789.'.includes(char)) {
                currentToken += char
            } else if ('+-*/'.includes(char)) {
                if (currentToken !== '') {
                    tokens.push(parseFloat(currentToken))
                    currentToken = ''
                }
                tokens.push(char)
            }
            i++
        }
        if (currentToken !== '') {
            tokens.push(parseFloat(currentToken))
        }

        if (tokens.length === 0) return 0

        let j = 0
        while (j < tokens.length) {
            if (tokens[j] === '*' || tokens[j] === '/') {
                const left = tokens[j-1]
                const right = tokens[j+1]
                let result
                if (tokens[j] === '*') {
                    result = left * right
                } else {
                    if (right === 0) {
                        showError("Деление на 0")
                        return null
                    }
                    result = left / right
                }
                tokens.splice(j-1, 3, result)
            } else {
                j++
            }
        }

        let result = tokens[0]
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i]
            const nextNum = tokens[i+1]
            if (operator === '+') {
                result += nextNum
            } else if (operator === '-') {
                result -= nextNum
            }
        }

        return result
    }

    function calculateResult() {
        if (fullExpression === '' && currentNumber === '') {
            if (fullExpression !== '') {
                let exprToEvaluate = fullExpression
                const result = evaluateExpression(exprToEvaluate)
                if (result !== null && !isNaN(result) && isFinite(result)) {
                    lastResult = result
                    currentNumber = result.toString()
                    fullExpression = ''
                    resultDisplayed = true
                    updateDisplay(currentNumber, true)
                }
            }
            return
        }

        let exprToEvaluate = fullExpression + currentNumber

        if ('+-*/×'.includes(exprToEvaluate[exprToEvaluate.length - 1])) {
            exprToEvaluate = exprToEvaluate.slice(0, -1)
        }

        if (exprToEvaluate === '') return

        const result = evaluateExpression(exprToEvaluate)
        if (result !== null && !isNaN(result) && isFinite(result)) {
            lastResult = result
            currentNumber = result.toString()
            fullExpression = ''
            resultDisplayed = true
            updateDisplay(currentNumber, true)
        } else if (result === null) {
            return
        } else if (!isFinite(result)) {
            showError("Бесконечность")
        }
    }

    function addOperator(operator) {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        if (resultDisplayed) {
            fullExpression = currentNumber
            currentNumber = ''
            resultDisplayed = false
        }

        if (currentNumber !== '') {
            fullExpression += currentNumber
            currentNumber = ''
        }

        if (fullExpression !== '' && !'+-*/×'.includes(fullExpression[fullExpression.length - 1])) {
            fullExpression += operator
            updateDisplay(fullExpression)
        } else if (fullExpression !== '' && '+-*/×'.includes(fullExpression[fullExpression.length - 1])) {
            fullExpression = fullExpression.slice(0, -1) + operator
            updateDisplay(fullExpression)
        }
    }

    function onDigitButtonClicked(digit) {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        if (resultDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
        }

        if (digit === '.') {
            if (currentNumber === '' || currentNumber === '0') {
                currentNumber = '0.'
            } else if (!currentNumber.includes('.')) {
                currentNumber += digit
            }
        } else {
            if (currentNumber === '0' && digit !== '.') {
                currentNumber = digit
            } else {
                currentNumber += digit
            }
        }

        if (fullExpression === '') {
            updateDisplay(currentNumber)
        } else {
            updateDisplay(fullExpression + currentNumber)
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })

    document.getElementById("btn_op_backspace").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
            updateDisplay('0')
            return
        }

        if (resultDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            updateDisplay('0')
            return
        }

        if (currentNumber !== '') {
            currentNumber = currentNumber.slice(0, -1)
            if (currentNumber === '' || currentNumber === '-') {
                currentNumber = ''
            }
            if (fullExpression === '') {
                updateDisplay(currentNumber === '' ? '0' : currentNumber)
            } else {
                updateDisplay(fullExpression + (currentNumber === '' ? '' : currentNumber))
            }
        } else if (fullExpression !== '') {
            fullExpression = fullExpression.slice(0, -1)
            updateDisplay(fullExpression === '' ? '0' : fullExpression)
        }
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        if (resultDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
        }

        if (currentNumber !== '' && currentNumber !== '0') {
            currentNumber = (parseFloat(currentNumber) * -1).toString()
            if (fullExpression === '') {
                updateDisplay(currentNumber)
            } else {
                updateDisplay(fullExpression + currentNumber)
            }
        } else if (currentNumber === '') {
            currentNumber = '-'
            if (fullExpression === '') {
                updateDisplay(currentNumber)
            } else {
                updateDisplay(fullExpression + currentNumber)
            }
        }
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        if (resultDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
        }

        if (currentNumber !== '') {
            currentNumber = (parseFloat(currentNumber) / 100).toString()
            if (fullExpression === '') {
                updateDisplay(currentNumber)
            } else {
                updateDisplay(fullExpression + currentNumber)
            }
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        let numToSqrt
        if (currentNumber !== '') {
            numToSqrt = parseFloat(currentNumber)
        } else if (fullExpression !== '') {
            let cleanExpr = fullExpression
            if ('+-*/×'.includes(cleanExpr[cleanExpr.length - 1])) {
                cleanExpr = cleanExpr.slice(0, -1)
            }
            numToSqrt = parseFloat(cleanExpr)
            if (isNaN(numToSqrt)) {
                numToSqrt = 0
            }
        } else {
            numToSqrt = 0
        }

        if (numToSqrt < 0) {
            showError("Корень из отриц. числа")
            return
        }

        currentNumber = Math.sqrt(numToSqrt).toString()
        fullExpression = ''
        resultDisplayed = true
        updateDisplay(currentNumber, true)
    }

    document.getElementById("btn_op_square").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        let numToSquare
        if (currentNumber !== '') {
            numToSquare = parseFloat(currentNumber)
        } else if (fullExpression !== '') {
            let cleanExpr = fullExpression
            if ('+-*/×'.includes(cleanExpr[cleanExpr.length - 1])) {
                cleanExpr = cleanExpr.slice(0, -1)
            }
            numToSquare = parseFloat(cleanExpr)
            if (isNaN(numToSquare)) {
                numToSquare = 0
            }
        } else {
            numToSquare = 0
        }

        currentNumber = Math.pow(numToSquare, 2).toString()
        fullExpression = ''
        resultDisplayed = true
        updateDisplay(currentNumber, true)
    }

    function factorial(n) {
        if (n < 0) return NaN
        if (n === 0 || n === 1) return 1
        let result = 1
        for (let i = 2; i <= n; i++) {
            result *= i
        }
        return result
    }

    document.getElementById("btn_op_factorial").onclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        let numToFact
        if (currentNumber !== '') {
            numToFact = parseFloat(currentNumber)
        } else if (fullExpression !== '') {
            let cleanExpr = fullExpression
            if ('+-*/×'.includes(cleanExpr[cleanExpr.length - 1])) {
                cleanExpr = cleanExpr.slice(0, -1)
            }
            numToFact = parseFloat(cleanExpr)
            if (isNaN(numToFact)) {
                numToFact = 0
            }
        } else {
            numToFact = 0
        }

        if (!Number.isInteger(numToFact)) {
            showError("Факториал только целых")
            return
        }
        if (numToFact < 0) {
            showError("Факториал отриц. числа")
            return
        }
        if (numToFact > 170) {
            showError("Слишком большое число")
            return
        }

        currentNumber = factorial(numToFact).toString()
        fullExpression = ''
        resultDisplayed = true
        updateDisplay(currentNumber, true)
    }

    document.getElementById("btn_op_mult").onclick = function() { addOperator('×') }
    document.getElementById("btn_op_plus").onclick = function() { addOperator('+') }
    document.getElementById("btn_op_minus").onclick = function() { addOperator('-') }
    document.getElementById("btn_op_div").onclick = function() { addOperator('/') }

    document.getElementById("btn_op_clear").onclick = function() {
        currentNumber = ''
        fullExpression = ''
        resultDisplayed = false
        errorDisplayed = false
        outputElement.style.color = '#ffffff'
        updateDisplay('0')
    }

    document.getElementById("btn_op_equal").onclick = function() {
        calculateResult()
    }

    const themeToggleBtn = document.getElementById("themeToggleBtn")
    if (themeToggleBtn) {
        themeToggleBtn.onclick = function() {
            document.body.classList.toggle("light-theme")
            if (document.body.classList.contains("light-theme")) {
                themeToggleBtn.innerHTML = "🌙 Тёмная тема"
            } else {
                themeToggleBtn.innerHTML = "🎨 Светлая тема"
            }
        }
    }

    outputElement.onclick = function() {
        if (errorDisplayed) return
        const colors = ['#0a0e17', '#1a2230', '#2d6ee0', '#00a86b', '#ff6b6b']
        const currentColor = outputElement.style.backgroundColor
        let currentIndex = colors.indexOf(currentColor)
        if (currentIndex === -1) currentIndex = 0
        const nextIndex = (currentIndex + 1) % colors.length
        outputElement.style.backgroundColor = colors[nextIndex]
    }

    let accumulateValue = 0
    document.getElementById("btn_op_plus").ondblclick = function() {
        if (errorDisplayed) {
            currentNumber = ''
            fullExpression = ''
            resultDisplayed = false
            errorDisplayed = false
            outputElement.style.color = '#ffffff'
        }

        let valToAccumulate = 0
        if (currentNumber !== '') {
            valToAccumulate = parseFloat(currentNumber)
        } else if (fullExpression !== '') {
            let cleanExpr = fullExpression
            if ('+-*/×'.includes(cleanExpr[cleanExpr.length - 1])) {
                cleanExpr = cleanExpr.slice(0, -1)
            }
            valToAccumulate = parseFloat(cleanExpr)
            if (isNaN(valToAccumulate)) {
                valToAccumulate = 0
            }
        }

        if (valToAccumulate !== 0) {
            accumulateValue += valToAccumulate
            currentNumber = accumulateValue.toString()
            fullExpression = ''
            resultDisplayed = true
            updateDisplay(currentNumber, true)
        }
    }

    outputElement.oncontextmenu = function(event) {
        event.preventDefault()
        if (errorDisplayed) return false
        let currentValue = 0
        if (currentNumber !== '') {
            currentValue = parseFloat(currentNumber)
        } else if (fullExpression !== '') {
            let cleanExpr = fullExpression
            if ('+-*/×'.includes(cleanExpr[cleanExpr.length - 1])) {
                cleanExpr = cleanExpr.slice(0, -1)
            }
            currentValue = parseFloat(cleanExpr)
            if (isNaN(currentValue)) {
                currentValue = 0
            }
        }
        const bandwidth = (currentValue * 10).toFixed(2)
        outputElement.innerHTML = `${bandwidth} МГц`
        setTimeout(() => {
            if (!errorDisplayed) {
                if (currentNumber !== '' || fullExpression !== '') {
                    updateDisplay(fullExpression + currentNumber)
                } else {
                    updateDisplay('0')
                }
            }
        }, 1500)
        return false
    }

    updateDisplay('0')
}
