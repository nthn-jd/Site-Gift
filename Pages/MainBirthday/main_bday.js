let canMakeWIsh = false // CHANGE TO FALSE LATER
async function StartBday() {
    await createMessage('Ito raw yung "birthday place", happy birthday!', 5, "Cheer")
    await createMessage("Medyo kulang budget namin so hanggang ganto lang kaya eh ..", 7, "Stare")
    await createMessage("Pero ..", 1, "Pause")
    await createMessage("Meron kang cake !!", 1.5, "Cutie")
    await createMessage("Ayon lang kasya sa budget eh", 1.5, "Nervous")

    await createMessage("Ay nga pala ...", 2, "Pause")
    await createMessage("May audio recording na iniwan si boss para sayo.", 4, "Dominance")
    await createMessage("Ipaplay ko na siya ..", 2.5, "LetterIdle")
    const vhs_audio = document.getElementById("vhs_audio")
    vhs_audio.play()
    const vhs_img = inspect("Images/VHS.png")
    vhs_img.style.filter = "brightness(.5)"
    vhs_img.style.scale = 0.5
    vhs_img.style.transform = "translate(-100%, -100%)"
    while (vhs_audio.readyState < 3) { await delay(1) }
    vhs_audio.addEventListener("ended", async () => {
        await createMessage("So inspirational wow wow", 3.5, "Cutie")
        await createMessage("Anyways ...", 2.56, "Pause")
        document.getElementById("light").play()
        document.body.style.backgroundImage = 'url("Images/Background_bright.jpg")'
        document.getElementById("CakeIcon").style.filter = "drop-shadow(2px 4px 6px black) brightness(1) saturate(1.1) contrast(1.1)"
        const bday_instrumental = document.getElementById("bday_instrumental")
        bday_instrumental.play()
        await createMessage("Surprise!", 1, "Cheer") 
        await delay(2500)
        await createMessage("Now make a wish ..", 2.5, "Dominance")
        await createMessage("Click mo yung cake 'pag tapos ka na", 4, "Think")
        canMakeWIsh = true
    })
}
StartBday()

let wished = false
async function makeWish() {
    if (wished || !canMakeWIsh) return;
    wished = true

    await createMessage("Alright!", 1, "Cheer")
    await createMessage("Ngayon ang regalo ko sayo ay ...", 2, "Nervous")
    await createMessage("Free Roam !!", 2, "Cutie")
    await createMessage("Let me set that up na ..", 2.25, "HeadScratch")

    window.parent.postMessage('WishFinished', '*');
}

