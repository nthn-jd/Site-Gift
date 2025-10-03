const BirthdayBuddy = document.getElementById("BB_Frame")
BirthdayBuddy.hidden = true
PreloadBBSprites()

let introStarted = false
let canSign = false //change cansight to false LATER
let started = false
async function Intro() {
    if (introStarted) { return }
    introStarted = true
    BirthdayBuddy.hidden = false
    await createMessage("Ayaw niya gumising noh?", 2.5, "Pause")
    await createMessage("Let him sleep nalang, mukang pagod eh.", 3, "Dominance")
    await createMessage("Anyways, ako nga pala si <strong><em>Birthday Buddy</em></strong>", 4, "Cutie")
    await createMessage("Inutusan lang ako ni Jed para iguide ka rito eh", 4, "Dominance")

    await CurtainTransition()
    const legalPage = document.getElementById("legal")
    legalPage.hidden = false
    const mainPage = document.getElementById("main")
    mainPage.hidden = true

    await delay(4000)
    if (!started) OpenWaiver();
    await createMessage("Please sign nalang tong waiver na to, importante raw eh", 5.5, "Think")
    createMessage("Click mo yung pen to sign", 5.5, "Stare")
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
    await createMessage("Magwait ka lang muna", 2.5, "Pause")
    await createMessage("Inaayos pa namin namin yung set ..", 3.5, "Nervous")
    await delay(2000)
    changePose("Stare")
    await delay(1000)
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
    document.body.removeChild(document.getElementById("legal"))
    document.body.removeChild(document.getElementById("BB_Frame"))
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

const LeaveMessages = [
    function (Iframe) {
        Iframe.contentWindow.postMessage({ message: "Phew, buti di ka umalis!", duration: 2.5, pose: "Pause" }, "*")
        Iframe.contentWindow.postMessage({ message: "Pero if aalis ka na talaga ..", duration: 2.75, pose: "Stare" }, "*")
        Iframe.contentWindow.postMessage({ message: "Here is my final message to you!", duration: 2.25, pose: "LetterIdle" }, "*")
        Iframe.contentWindow.postMessage({ message: "Happy birthday!", duration: 1.5, pose: "Cheer" }, "*")
        Iframe.contentWindow.postMessage({ message: "Alam kong made up character lang ako for whatever this is supposed to be but ..", duration: 5, pose: "Cutie" }, "*")
        Iframe.contentWindow.postMessage({ message: "I hope my presence leaves a good memory for your 16th birthday", duration: 4.20, pose: "Cheer" }, "*")
        Iframe.contentWindow.postMessage({ message: "And I hope you will remember me, Birthday Buddy!", duration: 2.75, pose: "Nervous" }, "*")
        Iframe.contentWindow.postMessage({ message: "Again, Happy Birthday!", duration: 1.25, pose: "Cheer" }, "*")
        Iframe.contentWindow.postMessage({ message: "Maybe I can be part of your future birthdays again.", duration: 3, pose: "Cutie" }, "*")
        Iframe.contentWindow.postMessage({ message: "Thank you for your visit!", duration: 2.5, pose: "Cheer" }, "*")
    },
    function (Iframe) {
        Iframe.contentWindow.postMessage({ message: "Oy! Kala ko aalis ka na?", duration: 2.25, pose: "HeadScratch" }, "*")
        Iframe.contentWindow.postMessage({ message: "Well, nabasa mo na final message ko ..", duration: 2.75, pose: "Stare" }, "*")
        Iframe.contentWindow.postMessage({ message: "So ala ka nang makikita from this point on", duration: 3.25, pose: "Dominance" }, "*")
    },
    function (Iframe) {
        Iframe.contentWindow.postMessage({ message: "Jinojoke time no na ata ako eh", duration: 2.25, pose: "Pause" }, "*")
        Iframe.contentWindow.postMessage({ message: "Like I said..", duration: 1.2, pose: "Stare" }, "*")
        Iframe.contentWindow.postMessage({ message: "Wala ka nang makikita from this point forward.", duration: 3.25, pose: "Dominance" }, "*")
    },
    function (Iframe) {
        Iframe.contentWindow.postMessage({ message: "That's it! Di nako magsaaslita once you cancel!", duration: 4, pose: "Stare" }, "*")
    },
]
let leaveAttempts = -1
window.addEventListener("beforeunload", (e) => {
    leaveAttempts++
    if (currentIFrame != null && leaveAttempts < LeaveMessages.length) {
        const func = LeaveMessages[leaveAttempts]
        setTimeout(func, 1, currentIFrame)
    }
    e.preventDefault()
})
