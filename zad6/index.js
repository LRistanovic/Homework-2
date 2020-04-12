let prompt = document.getElementById("value"),
    strValue = []

let options = document.getElementById("options").children
for (button of options) {
    button.addEventListener("click", function() {
        let char = this.textContent
        
        if ((isSign(strValue.last()) || strValue.last() === ".") && (isSign(char) || char === "."))
            strValue.pop()
        
        strValue.push(char)
        prompt.textContent = strValue.join("")
    })
}

let equalsButton = document.getElementById("equals")
equalsButton.addEventListener("click", calculate)

let resetButton = document.getElementById("reset")
resetButton.addEventListener("click", () => {
    prompt.textContent = "0"
    strValue = []
})


function isSign(char) {
    return char === "+" || char === "-" || char === "*" || char === "/"
}

Array.prototype.last = function() {
    return this[this.length - 1]
}

function calculate() {
    strValue.pop()

    let nums = [],
        numOrSign = 0
    
    while (strValue.length > 0) {
        if (!(numOrSign % 2)) {
            nums.push(parseFloat(strValue.join("")))
            while (!isSign(strValue[0]) && strValue.length > 0) 
                strValue.shift()
        } else {
            nums.push(strValue.shift())
        }
        numOrSign++
    }
    
    while (1) {
        console.log("Current state: ", nums)
        if (nums.length === 3) {
            prompt.textContent = quickCalculate(...nums)
            break
        }

        let leftHand = nums[0],
            operation = nums[1], 
            rightHand = nums[2],
            nextOperation = nums[3],
            rightRightHand = nums[4]
        
        if (operation === "*" || operation === "/") {
            nums = [quickCalculate(leftHand, operation, rightHand), ...nums.splice(3)]
        }
           
        else if (nextOperation === "+" || nextOperation === "-") {
            nums = [quickCalculate(leftHand, operation, rightHand), ...nums.splice(3)]
        }
        
        else {
            nums = [...nums.splice(0, 2), quickCalculate(rightHand, nextOperation, rightRightHand), ...nums.splice(3)]
        }
    }
}

function quickCalculate(leftHand, operation, rightHand) {
    if (operation === "+")
        return leftHand + rightHand
    if (operation === "*")
        return leftHand * rightHand
    if (operation === "-")
        return leftHand - rightHand
    return leftHand / rightHand
}