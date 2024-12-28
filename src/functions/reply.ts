import {mod} from "mod";

export default function reply() {

    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {
        next(args)
        if (args[0] && args[0].Type && args[0].Type == "Chat") {
            if (args[0].Content && args[0].Sender) {
                addButtonToLastMessage(args[0].Content, args[0].Sender);
            }
            if (args[0].Dictionary && args[0].Dictionary[0]["repliedMessage"] && args[0].Dictionary[0]["targetUser"]) {
                addReplyBoxToLastMessage(args[0].Dictionary[0]["repliedMessage"], args[0].Dictionary[0]["targetUser"])
            }
        }

    })

}

export let repliedMessage: string = "";
export let sender: string

function addButtonToLastMessage(messageText: string, messageSender: number) {
    const chatContainer = document.querySelector('#TextAreaChatLog');
    let lastMessage = null;

    if (chatContainer) {
        lastMessage = chatContainer.querySelector('.ChatMessageChat:last-of-type');
    }

    if (lastMessage) {

        const userNameDiv = lastMessage.querySelector('.ChatMessageName');
        const userName = userNameDiv.innerText;

        let button = ElementButton.Create(
            null,
            function (this: HTMLButtonElement, ev: MouseEvent | TouchEvent) {
                repliedMessage = messageText;
                sender = userName;
                const chatInput: HTMLTextAreaElement | null = document.getElementById("InputChat") as HTMLTextAreaElement | null;
                chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
                chatInput.focus();
            },
            // @ts-ignore
            {noStyling: true},
            {button: {classList: ["ChatReplyButton"], children: [" \u21a9\ufe0f"]}}
        )
        button.classList.add('ChatReplyButton');
        button.style.display = "none";
        lastMessage.onmouseenter = () => {
            button.style.display = "inline-block";
        };
        lastMessage.onmouseleave = () => {
            button.style.display = "none";
        };
        lastMessage.appendChild(button);
    }
}

function addReplyBoxToLastMessage(messageText: string, messageSender: string) {

    if (messageText && messageSender) {
        const replyDiv = ElementCreateDiv("replyMessageDiv" + new Date().getTime());

        replyDiv.textContent = messageSender + ": " + messageText;
        replyDiv.classList.add("ChatReplyBox");

        const chatContainer = document.querySelector('#TextAreaChatLog');
        let lastMessage = null;

        if (chatContainer) {
            lastMessage = chatContainer.querySelector('.ChatMessageChat:last-of-type');

        }

        if (lastMessage) {
            lastMessage.prepend(replyDiv);
        }
    }

}