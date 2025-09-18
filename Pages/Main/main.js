const BirthdayBuddy = document.getElementById("DB_Frame")
BirthdayBuddy.hidden = true

let introStarted = false
let canSign = false //change cansight to false LATER
let started = false
async function Intro() {
    if (introStarted) { return }
    introStarted = true
    BirthdayBuddy.hidden = false
    await createMessage("Ayaw niya gumising noh?", 2.5, "Point")
    await createMessage("Let him sleep nalang, mukang pagod eh.", 3, "Shrug")
    await createMessage("Anyways, ako nga pala si <strong><em>Birthday Buddy</em></strong>", 4, "ThumbsUp")
    await createMessage("Inutusan lang ako ni Jed para iguide ka rito eh", 4, "Shrug")

    await CurtainTransition()
    const legalPage = document.getElementById("legal")
    legalPage.hidden = false
    const mainPage = document.getElementById("main")
    mainPage.hidden = true

    await delay(4000)
    if (!started) OpenWaiver();
    await createMessage("Please sign nalang tong waiver na to, importante raw eh", 5.5, "Point")
    createMessage("Click mo yung pen to sign", 5.5, "ThumbsUp")
    canSign = true
}
const SleepingCat = document.getElementById("SleepingCat")
const WakeUpButton = document.getElementById("WakeUpButton")
const WakeUpAttemptSound = document.getElementById("WakeUpAttemptSound")
WakeUpAttemptSound.addEventListener("ended", () => {
    wakeUpDebounce = false
    SleepingCat.style.animation = "sleepingCatAnim 1s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate"
})
const maxWakeUpAttempts = 1 // CHANGE TO 4 LATER
let wakeUpAttempts = 0
let wakeUpDebounce = false
let wakeUpAttemptsFinished = false
WakeUpButton.onclick = async function () {
    if (wakeUpAttemptsFinished) { return }
    if (wakeUpDebounce) { return }
    wakeUpDebounce = true
    wakeUpAttempts++
    SleepingCat.style.animation = "sleepingCatAttemptWakeUpAnim 0.1s ease-in-out infinite alternate"
    WakeUpAttemptSound.play()

    if (wakeUpAttempts >= maxWakeUpAttempts) {
        wakeUpAttemptsFinished = true
        await delay(2000)
        Intro()
    }
}

function OpenWaiver() {
    const img = inspect("Images/WaiverContent.png")
    if (img == null) return;
    img.style.width = "50vh"
    img.style.height = "77vh"
}

async function Start() {
    if (started || !canSign) return;
    started = true

    const transition = document.createElement("div")
    transition.className = "transition_fade"
    document.body.appendChild(transition)
    await delay(10)
    transition.classList.add("enter")

    await delay(1001)
    const div = document.createElement("div")
    document.body.appendChild(div)

    // Yap
    await delay(3000)
    BirthdayBuddy.style.zIndex += 128
    await createMessage("Magwait ka lang muna", 2.5, "Point")
    await createMessage("Inaayos pa namin namin yung set ..", 3.5, "Shrug")
    await delay(3000)
    BirthdayBuddy.style.zIndex -= 128
    await delay(3000)

    // END
    document.body.removeChild(div)
    await delay(1000)

    LoadOfficialContent()
    transition.classList.add("exit")

    await delay(1000)
    document.body.removeChild(transition)
}

const contents_to_load = [
    "../MainBirthday/main_bday.htm",
    "../Gifts/gifts.htm",
    "../Minigames/minigames.htm",
]
let currentIFrame = null
function LoadOfficialContent() {
    document.body.removeChild(document.getElementById("main"))
    document.body.removeChild(document.getElementById("DB_Frame"))
    document.body.removeChild(document.getElementById("BirthdayBuddyScript"))

    const contentsDiv = document.createElement("div")
    contentsDiv.id = "ContentsDiv"
    document.body.appendChild(contentsDiv)

    let hideNav = true
    const rightNav = document.getElementById("rightNav")
    const leftNav = document.getElementById("leftNav")

    let frames = []; let currentFrameIndex = -1;
    function toggleVolumeInFrame(iframe, muted) {
        if (iframe.contentWindow == null) return;
        iframe.contentWindow.postMessage({ isMuted: muted }, "*")
    }
    async function loadFrame(index, transitionDisabled) {
        if (index > frames.length || index == currentFrameIndex) return;
        if (!transitionDisabled) await CurtainTransition();
        const frame = frames[index]
        for (var i = 0; i < frames.length; i++) { const v = frames[i]; v.hidden = true; toggleVolumeInFrame(v, true); }
        frame.hidden = false
        currentFrameIndex = index
        toggleVolumeInFrame(frame, false)
        if (frame.parentNode == null) { contentsDiv.appendChild(frame) }
        leftNav.hidden = hideNav || currentFrameIndex == 0
        rightNav.hidden = hideNav || currentFrameIndex == frames.length - 1
        currentIFrame = frame
    }
    for (var i = 0; i < contents_to_load.length; i++) {
        const v = contents_to_load[i]
        const iframe = document.createElement("iframe")
        iframe.src = v
        iframe.className = "contet-iframe"
        frames.push(iframe)
    }
    loadFrame(0, true)

    async function proceed(event) {
        if (event.data != "WishFinished") return;
        window.removeEventListener('message', proceed)
        hideNav = false
        await loadFrame(1)

        leftNav.addEventListener("click", () => {
            var index = Math.max(0, currentFrameIndex - 1)
            loadFrame(index)
        })

        rightNav.addEventListener("click", () => {
            var index = Math.min(frames.length - 1, currentFrameIndex + 1)
            loadFrame(index)
        })
    }
    window.addEventListener('message', proceed)
}
