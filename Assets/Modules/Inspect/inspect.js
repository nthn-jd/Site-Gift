const inspect_script = document.getElementById("InspectScript")
if (inspect_script == null) throw new Error("Inspect Script Could not be found");
const inspect_path = inspect_script.src.split("inspect.js")[0]

// import stylesheet
const inspect_css = document.createElement("link")
inspect_css.rel = "stylesheet"
inspect_css.type = "text/css"
inspect_css.href = inspect_path + "inspect.css"
document.head.appendChild(inspect_css)

let container = null
function inspect(src) {
    if (container != null) return

    container = document.createElement("div")
    container.className = "inspect_container"
    document.body.appendChild(container)

    const blur = document.createElement("div")
    blur.className = "blur"
    container.appendChild(blur)

    const img = document.createElement("img")
    img.className = "inspect_content"
    img.src = src
    container.appendChild(img)

    const exit = document.createElement("button")
    exit.id = "inspect_exit_button"
    exit.innerHTML = "X"
    container.appendChild(exit)

    function enter() {
        blur.style.opacity = .8
        exit.style.opacity = 1
        img.classList.add("enter")
    }
    setTimeout(enter, 10)

    function finish() { document.body.removeChild(container); container = null }
    function leave() {
        exit.removeEventListener("click", leave)
        blur.style.opacity = 0
        exit.style.opacity = 0
        img.classList.add("exit")
        setTimeout(finish, 1001)
    }
    exit.addEventListener("click", leave)

    return img
}
