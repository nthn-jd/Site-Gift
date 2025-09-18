const messagesQueue = []
let isQueueHandled = false
window.addEventListener("message", (e) => {
    if (typeof(e.data) == "object" && typeof(e.data.isMuted) == "boolean") {
        const mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(element => {
            element.muted = e.data.isMuted;
        });
    }

    if (typeof (e.data) == "object" && typeof (e.data.message) == "string") {
        async function call() {
            messagesQueue.push(e.data)
            if (isQueueHandled) return
            isQueueHandled = true
            while (messagesQueue.length > 0) {
                const data = messagesQueue[0]
                await delay(10)
                if (newMessage != null) continue
                await createMessage(data.message, data.duration, data.pose, true)
                messagesQueue.splice(0, 1)
            }
            isQueueHandled = false
        }
        if (newMessage == null) {
            createMessage(e.data.message, e.data.duration, e.data.pose, true)
        } else {
            call()
        }
    }
})
