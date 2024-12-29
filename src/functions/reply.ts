import {mod} from "mod";
import {ReplyContent} from "../models/replyContent";

export let replyMode: boolean = false;

export default function reply() {

    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {
        next(args)
        console.log(args)
        console.log("ChatroomMessage")
        if (args[0] && args[0].Type && args[0].Type == "Chat") {
            let chatMessage = args[0];
            if (chatMessage.Content && chatMessage.Sender) {
                addButtonToLastMessage(args[0].Content, args[0].Sender);
            }

            // @ts-ignore
            let replyMessageData: ReplyContent = chatMessage.Dictionary.find(obj => {
                if (obj["isReplyMessage"] && obj["isReplyMessage"] == true) {
                    return obj as unknown as ReplyContent;
                }
                return false;
            });

            if (chatMessage.Dictionary && replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
                addReplyBoxToLastMessage(replyMessageData.repliedMessage, replyMessageData.repliedMessageAuthor)
            }
        }

    })

    mod.hookFunction("ServerSend", 1, (args, next) => {
        let replyMessageData: ReplyContent = {
            isReplyMessage: replyMode,
            targetId: repliedMessageAuthorNumber,
            repliedMessage: repliedMessage,
            repliedMessageAuthor: repliedMessageAuthor
        };

        if (args[1] && args[1]["Content"] && args[1]["Type"] == "Chat") {
            if (replyMode) {
                args[1]["Dictionary"].push(replyMessageData);
            }
        }
        next(args);
        if (args[1] && args[1]["Content"] && args[1]["Type"] == "Chat") {
            replyMode = false;
            const chatInput: HTMLTextAreaElement | null = document.getElementById("InputChat") as HTMLTextAreaElement | null;
            chatInput.placeholder = "Talk to everyone"
        }
    })

}

export let repliedMessage: string = "";
export let repliedMessageAuthor: string
export let repliedMessageAuthorNumber: number

function addButtonToLastMessage(messageText: string, messageSenderNumber: number) {
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
                repliedMessageAuthor = userName;
                repliedMessageAuthorNumber = messageSenderNumber;
                const chatInput: HTMLTextAreaElement | null = document.getElementById("InputChat") as HTMLTextAreaElement | null;
                //chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
                replyMode = true;
                chatInput.placeholder = "Reply to " + repliedMessageAuthor;
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