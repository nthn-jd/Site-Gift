const curtain_script = document.getElementById("CurtainScript")
if (curtain_script == null) throw new Error("Curtain Script Could not be found");
const curtain_path = curtain_script.src.split("curtain_transition.js")[0]

// import stylesheet
const curtain_css = document.createElement("link")
curtain_css.rel = "stylesheet"
curtain_css.type = "text/css"
curtain_css.href = curtain_path + "curtain_transition.css"
document.head.appendChild(curtain_css)

async function CurtainTransition() {
    const curtain_container = document.createElement("div")
    curtain_container.className = "curtain-container open"
    curtain_container.id = "curtainContainer"
    document.body.appendChild(curtain_container)

    const curtain_right = document.createElement("div")
    curtain_right.className = "curtain curtain-right"
    curtain_container.appendChild(curtain_right)
    const curtain_left = document.createElement("div")
    curtain_left.className = "curtain curtain-left"
    curtain_container.appendChild(curtain_left)

    await delay(100)
    document.getElementById('curtainContainer').classList.remove('open');
    await delay(2000)
    setTimeout(async function () {
        document.getElementById('curtainContainer').classList.add('open');
        await delay(2001)
        document.body.removeChild(curtain_container)
    }, 2000)
}
