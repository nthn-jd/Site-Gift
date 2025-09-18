let canMakeWIsh = false // CHANGE TO FALSE LATER
async function StartBday() {
    await createMessage('Ito raw yung "birthday place", happy birthday!', 5, "ThumbsUp")
    await createMessage("Medyo kulang budget namin so hanggang ganto lang kaya eh ..", 7, "Disappointed")
    await createMessage("Pero ..", 1, "Point")
    await createMessage("Meron kang cake !!", 1.5, "ThumbsUp")
    await createMessage("Ayon lang kasya sa budget eh", 1.5, "Shrug")

    await createMessage("Ay nga pala ...", 2, "Point")
    await createMessage("May audio recording na iniwan si boss para sayo.", 4, "Shrug")
    await createMessage("Ipaplay ko na siya ..", 2.5, "ThumbsUp")
    const vhs_audio = document.getElementById("vhs_audio")
    vhs_audio.play()
    const vhs_img = inspect("Images/VHS.png")
    vhs_img.style.filter = "brightness(.5)"
    vhs_img.style.scale = 0.5
    vhs_img.style.transform = "translate(-100%, -100%)"
    vhs_audio.addEventListener("ended", async () => {
        await createMessage("So inspirational wow wow", 3.5, "HeadScratch")
        await createMessage("Anyways ...", 2.56, "Point")
        document.getElementById("light").play()
        document.body.style.backgroundImage = 'url("Images/Background_bright.jpg")'
        document.getElementById("CakeIcon").style.filter = "drop-shadow(2px 4px 6px black) brightness(1) saturate(1.1) contrast(1.1)"
        const bday_instrumental = document.getElementById("bday_instrumental")
        bday_instrumental.play()
        await createMessage("Surprise!", 1, "Cheer") 
        await delay(2500)
        await createMessage("Now make a wish ..", 2.5, "Shrug")
        await createMessage("Click mo yung cake 'pag tapos ka na", 4, "ThumbsUp")
        canMakeWIsh = true
    })
}
StartBday()

let wished = false
async function makeWish() {
    if (wished || !canMakeWIsh) return;
    wished = true

    await createMessage("Alright!", 1, "ThumbsUp")
    await createMessage("Ngayon ang regalo ko sayo ay ...", 2, "Shrug")
    await createMessage("Free Roam !!", 2, "ThumbsUp")
    await createMessage("Let me set that up na ..", 2.25, "Idle")

    window.parent.postMessage('WishFinished', '*');
}
