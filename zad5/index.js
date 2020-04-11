let pomodoroDiv = document.getElementById("pomodoro"),
    shortBreakDiv = document.getElementById("short-break"),
    longBreakDiv = document.getElementById("long-break")

document.getElementById("navbar-pomodoro").addEventListener("click", () => {
    pomodoroDiv.style.display = "block"
    shortBreakDiv.style.display = "none"
    longBreakDiv.style.display = "none"
})

document.getElementById("navbar-shortBreak").addEventListener("click", () => {
    pomodoroDiv.style.display = "none"
    shortBreakDiv.style.display = "block"
    longBreakDiv.style.display = "none"
})

document.getElementById("navbar-longBreak").addEventListener("click", () => {
    pomodoroDiv.style.display = "none"
    shortBreakDiv.style.display = "none"
    longBreakDiv.style.display = "block"
})

let time = [10, 300, 600],
    running = false,
    alarm = new Audio,
    counting = Array(3)

alarm.src = "alarm.mp3"

Array.from(document.getElementsByClassName("button-start")).forEach(btn => btn.addEventListener("click", startCounting))
Array.from(document.getElementsByClassName("button-stop")).forEach(btn => btn.addEventListener("click", stopCounting))
Array.from(document.getElementsByClassName("button-reset")).forEach(btn => btn.addEventListener("click", reset))

function startCounting(event) {
    let i = identify(event.target.parentElement.parentElement.id)
    if (!time[i]) {
        switch (i) {
            case 0:
                time[i] = 1500
                break
            case 1:
                time[i] = 300
                break
            case 2:
                time[i] = 600
                break
        }
    }
    
    counting[i] = setInterval(() => {
        time[i]--

        if (time[i] === 0) {
            alarm.play()
            clearInterval(counting[i])
        }

        if (!i)
            document.getElementsByTagName("title")[i].textContent = `(${convert(time[i])}) Tomato timer`
        
        document.getElementsByClassName("time")[i].textContent = convert(time[i])
    }, 1000)
}

function stopCounting(event) {
    let i = identify(event.target.parentElement.parentElement.id)
    clearInterval(counting[i])
}

function reset(event){
    let i = identify(event.target.parentElement.parentElement.id)
    clearInterval(counting[i])
    
    switch (i) {
        case 0:
            time[i] = 1500
            document.getElementsByTagName("title")[0].textContent = "Tomato timer"
            break
        case 1:
            time[i] = 300
            break
        case 2:
            time[i] = 600
            break
    }

    document.getElementsByClassName("time")[i].textContent = convert(time[i])
}

function convert(seconds) {
    let minutes = (seconds - (seconds % 60)) / 60,
        secondsLeft = seconds % 60
    
    minutes = (minutes < 10) ? "0" + minutes : minutes.toString()
    secondsLeft = (secondsLeft < 10) ? "0" + secondsLeft : secondsLeft.toString()
    
    return minutes + ":" + secondsLeft
}

function identify(id) {
    switch (id) {
        case "pomodoro":
            return 0
        case "short-break":
            return 1
        case "long-break":
            return 2
    }
}
