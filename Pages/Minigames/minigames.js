async function Intro() {
    await createMessage("..", .5, "Stare")
    await delay(3000);
    await createMessage("Welcome to the minigames room!", 2.25, "Cheer")

    // Wait for input
    let inputDetected = false
    document.body.addEventListener("click", () => {
        inputDetected = true
    })
    createMessage("Do me another favor and tap the screen again pls", 3.5, "Nervous")
    while (!inputDetected) { await delay(1) }
    await createMessage("Okay thank you ulit !!", 1.69, "Cutie")
    await createMessage("Anyways ..", 1, "Dominance")

    await createMessage("Unfortunately..", 1.5, "Stare")
    await createMessage("We did not have enough budget to finish the minigames room.", 3.5, "Dominance")
    await createMessage("So uhh..", 1.5, "HeadScratch")
    await createMessage("You can only view the room", 2.5, "DumbIdle")
    await delay(1500)
    changePose("Dominance")
}
Intro()