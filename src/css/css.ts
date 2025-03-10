import replyCloseButton from '../img/Remove.png'

export let customFocusColor = {
    enable: (color: string) => {
        const chatroomBot = document.getElementById("chat-room-bot") as HTMLTextAreaElement | null;
        if (chatroomBot) {
            chatroomBot.style.outline = "none";
            chatroomBot.style.border = `2px solid ${color}`;
            chatroomBot.style.boxShadow = "0 0 10px #719ECE";
        }
    },
    disable: () => {
        const chatroomBot = document.getElementById("chat-room-bot") as HTMLTextAreaElement | null;
        if (chatroomBot) {
            chatroomBot.style.outline = "";
            chatroomBot.style.border = "";
            chatroomBot.style.boxShadow = "";
        }
    }
}


export function loadCss() {
    chatReplyButtonCss();
    chatReplyBoxCss();
    chatReplyClose();
    chatReplyFlashCss();
}

function chatReplyButtonCss() {
    const style = document.createElement("style");
    style.innerHTML = `
    .ChatReplyButton {
        text-decoration: none;
        font-style: normal;
        cursor: pointer;
        font-size: smaller;
        visibility: hidden;
    }
    `;
    document.head.appendChild(style);
}

function chatReplyBoxCss() {
    const style = document.createElement("style");
    style.innerHTML =
        `
            :root {
                --reply-background-color: ${Player.ExtensionSettings.BCR.settings.replyBackgroundColor};
                --reply-text-color: ${Player.ExtensionSettings.BCR.settings.replyTextColor};
            }

            .ChatReplyBox {
                font-size: 0.8em;
                margin-top: 5px;
                background-color: var(--reply-background-color);
                color: var(--reply-text-color);
                padding: 5px;
                border-radius: 4px;
                position: relative;
                padding-left: 0.4em;
             }
        `;
    document.head.appendChild(style);
}

function chatReplyClose() {
    const style = document.createElement("style");
    style.innerHTML =
        `
            #chat-room-reply-close::before {
            background-image: url("${replyCloseButton}");
            mask-image: url("${replyCloseButton}");
            transition: filter 0.3s ease;
        }
        
            #chat-room-reply-close:hover::before {
            filter: brightness(0) saturate(100%) invert(42%) sepia(100%) saturate(2968%) hue-rotate(179deg) brightness(106%) contrast(101%);
        }
        
        `;
    document.head.appendChild(style);
}

function chatReplyFlashCss() {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes flashBackground {
            0% { background-color: #ff9f9f; }
            25% { background-color: #ffcf9f; }
            50% { background-color: #9fff9f; }
            75% { background-color: #9fcfff; }
            100% { background-color: transparent; }
        }

        .flash-animation {
            animation: flashBackground 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}
