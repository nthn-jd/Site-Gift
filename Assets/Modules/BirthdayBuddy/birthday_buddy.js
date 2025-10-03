const bb_script = document.getElementById("BirthdayBuddyScript")
if (bb_script == null) throw new Error("Birthday Buddy Script Could not be found");
const bb_path = bb_script.src.split("birthday_buddy.js")[0]

// import stylesheet
const birthday_buddy_css = document.createElement("link")
birthday_buddy_css.rel = "stylesheet"
birthday_buddy_css.type = "text/css"
birthday_buddy_css.href = bb_path + "birthday_buddy.css"
document.head.appendChild(birthday_buddy_css)

const delay = ms => new Promise(res => setTimeout(res, ms));


// Create Birthday Buddy
const bb_frame = document.createElement("div")
bb_frame.id = "BB_Frame"
document.body.appendChild(bb_frame)

const sprite = document.createElement("img")
sprite.id = "BirthdayBuddy"
bb_frame.appendChild(sprite)

// Preload Sprites
const SpritesToPreload = [
    "Cheer", "Cutie", "Dominance", "DumbIdle", "HeadScratch", "LetterIdle", "Nervous", "Pause", "Stare", "Think"
]
async function PreloadBBSprites() {
    for (i = 0; i < SpritesToPreload.length; i++) {
        sprite.src = bb_path + "Sprites/Sprite_" + SpritesToPreload[i] + ".png"
        while (sprite.naturalHeight === 0 && sprite.naturalWidth === 0) { await delay(1) }
        //console.log("Sprite '" + SpritesToPreload[i] + "' Loaded")
        sprite.src = ""
    }
    sprite.src = bb_path + "Sprites/Sprite_Template.png"
}


const messageSound = document.createElement("audio")
messageSound.src = bb_path + "messageSound.wav"
messageSound.style = "display: none;"
bb_frame.appendChild(messageSound)
let newMessage
let messageId = 0
async function createMessage(message, duration, spriteImg, overridingDisabled) {
    if (bb_frame.parentNode == null) return;
    if (newMessage != null) {
        if (newMessage.overridingDisabled == true) return;
        bb_frame.removeChild(newMessage); newMessage = null;
    }
    if (spriteImg == null) { spriteImg = "Idle" }
    spriteImg = "Sprite_" + spriteImg
    sprite.src = bb_path + "Sprites/" + spriteImg + ".png"

    newMessage = document.createElement("div")
    newMessage.id = "ChatBubble"
    newMessage.overridingDisabled = overridingDisabled
    bb_frame.appendChild(newMessage)
    const background = document.createElement("img")
    background.src = bb_path + "ChatBubble.png"
    background.id = "ChatBubbleImage"
    newMessage.appendChild(background)

    const text = document.createElement("p")
    text.innerHTML = message
    text.id = "ChutBubbleText"
    newMessage.appendChild(text)

    messageId += 1
    let currentMessageId = messageId
    await delay(5)
    const contentRect = text.getBoundingClientRect()
    const width = contentRect.width + 64
    const height = contentRect.height + 64
    newMessage.style.width = width + "px"
    newMessage.style.height = height + "px"

    messageSound.play()
    for (var i = 0; i < 100; i++) {
        if (newMessage == null) return;
        newMessage.style.opacity = i / 100
        await delay(1)
    }
    await delay(duration * 1000)
    if (currentMessageId != messageId) { return }
    for (var i = 0; i < 100; i++) {
        if (newMessage == null) return;
        newMessage.style.opacity = 1 - i / 100
        await delay(1)
    }
    if (newMessage == null) return;
    bb_frame.removeChild(newMessage)
    newMessage = null;
}
function changePose(spriteImg) {
    spriteImg = "Sprite_" + spriteImg
    sprite.src = bb_path + "Sprites/" + spriteImg + ".png"
}
