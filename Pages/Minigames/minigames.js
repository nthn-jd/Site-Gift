async function Intro() {
    await createMessage("..", .5, "Stare")
    await delay(3000);
    await createMessage("Welcome to the minigames room!", 2.25, "Cheer")
    await createMessage("Unfortunately..", 1.5, "Stare")
    await createMessage("We did not have enough budget to finish the minigames room.", 3.5, "Dominance")
    await createMessage("So uhh..", 1.5, "HeadScratch")
    await createMessage("You can only view the room", 2.5, "DumbIdle")
}
Intro()