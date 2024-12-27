export function loadCss() {
    chatReplyButtonCss();
    chatReplyBoxCss();
}

function chatReplyButtonCss() {
    const style = document.createElement("style");
    style.innerHTML = `
    .ChatReplyButton {
        text-decoration: none;
        font-style: normal;
        display: inline;
        cursor: pointer;
        font-size: smaller;
    }
    `;
    document.head.appendChild(style);
}

function chatReplyBoxCss() {
    const style = document.createElement("style");
    style.innerHTML =
        `
            :root {
                --reply-background-color: ${Player.ExtensionSettings.BCA.settings.replyBackgroundColor};
                --reply-text-color: ${Player.ExtensionSettings.BCA.settings.replyTextColor};
            }

            .ChatReplyBox {
                font-size: 0.8em;
                margin-top: 5px;
                background-color: var(--reply-background-color);
                color: var(--reply-text-color);
                padding: 5px;
                border-radius: 4px;
             }
        `;
    document.head.appendChild(style);
}