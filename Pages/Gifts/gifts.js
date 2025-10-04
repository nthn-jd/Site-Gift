let gifts_intro_done = false
async function Intro() {
    await createMessage("..", .5, "Dominance")
    await delay(3000);
    await createMessage("Welcome to free roam!", 2, "Cheer")

    // Wait for input
    let inputDetected = false
    document.body.addEventListener("click", () => {
        inputDetected = true
    })
    createMessage("Do me another favor and tap the screen again pls", 3.5, "Nervous")
    while (!inputDetected) { await delay(1) }
    await createMessage("Okay thank you ulit !!", 1.69, "Cutie")
    await createMessage("Anyways ..", 1, "Dominance")

    await createMessage("You are currently in the cards and gifts room.", 3.5, "Dominance")
    await createMessage("This room is where you can view cards and gifts from people who attended your birthday!", 6.9, "Cheer")
    await createMessage("Anyways, about the free roam..", 2.5, "Dominance")
    await createMessage("You can click on the buttons on your left and right to move between rooms.", 5, "Think")
    await createMessage("That's about all", 2, "Dominance")
    gifts_intro_done = true
}
Intro()


const content = document.querySelector('.gift_content');
const gifts = [
    { dir: "DonutBuddy", giftWidth: "150px", giftHeight: "150px", dbMessage: ["This ones from my old co-worker!.", 2.5, "Stare"] },
    { dir: "CoHost", giftWidth: "225px", giftHeight: "225px", fileExtension: "gif", dbMessage: ["Ewan ko kung ano trip ng co-host", 3, "Stare"] },
    { dir: "Host", giftless: true, dbMessage: ["Happy birthday daw sabi ni boss!", 3.5, "LetterIdle"] },
]
function createItem(entry) {
    const itemContainer = document.createElement("div")
    itemContainer.className = "gift_item flex-container"
    content.appendChild(itemContainer)

    const cardButton = document.createElement("button")
    cardButton.className = "flex-item"
    cardButton.id = "ImageButton"
    itemContainer.appendChild(cardButton)
    const cardIcon = document.createElement("img")
    cardIcon.src = "Gifts/" + entry.dir + "/cardIcon.png"
    cardIcon.className = "cardIcon"
    cardButton.appendChild(cardIcon)
    let alreadyMessaged = false
    cardButton.addEventListener("click", () => {
        if (entry.dbMessage != null && gifts_intro_done && !alreadyMessaged) {
            alreadyMessaged = true
            createMessage(entry.dbMessage[0], entry.dbMessage[1], entry.dbMessage[2])
        }
        const item = inspect(cardIcon.src.split("cardIcon.png")[0] + "card.png")
        //item.style.width = (parseFloat(cardIcon.style.width) / 2) + "px"
        //item.style.height = (parseFloat(cardIcon.style.height) / 2) + "px"
    })

    if (entry.giftless != null) return
    const giftButton = document.createElement("button")
    giftButton.className = "flex-item"
    giftButton.id = "ImageButton"
    itemContainer.appendChild(giftButton)
    const giftIcon = document.createElement("img")
    let fileExtension = "png"
    if (entry.fileExtension != null) { fileExtension = entry.fileExtension }
    giftIcon.src = "Gifts/" + entry.dir + "/gift." + fileExtension
    giftIcon.style.width = entry.giftWidth
    giftIcon.style.height = entry.giftHeight
    giftIcon.className = "giftIcon"
    giftButton.appendChild(giftIcon)
    giftButton.addEventListener("click", () => {
        const item = inspect(giftIcon.src)
        if (entry.ignoreGiftInspectSizing == true) return;
        item.style.width = parseFloat(giftIcon.style.width) + "px"
        item.style.height = parseFloat(giftIcon.style.width) + "px"
    })
}
for (var i = 0; i < gifts.length; i++) { createItem(gifts[i]) }

let currentIndex = 0;
const items = document.querySelectorAll('.gift_item');
const totalItems = items.length;
const itemHeight = items[0].clientHeight;

function updatePosition() {
    const newPosition = -currentIndex * itemHeight;
    content.style.transform = `translateY(${newPosition}px)`;
}

document.getElementById('upBtn').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    updatePosition();
});

document.getElementById('downBtn').addEventListener('click', () => {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    updatePosition();
});
