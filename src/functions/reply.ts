import { ReplyContent } from './../models/replyContent';
import { mod } from "mod";

export default function reply (){

    //Pushing the reply button with the custom "chatReply" func into "divChildren" array
    mod.patchFunction("ChatRoomMessageDisplay", {
        'const div = ElementCreate': 
        `const replyButton = ElementButton.Create(
                null, ${chatReply}, { noStyling: true },
                { button: { classList: ["ReplyButton"], children: ["\u21a9\ufe0f"] } }
            );
        replyButton.style.display = "none";    
        if(data.Type === "Chat"){
            if(data.Dictionary?.[1]?.repliedMessage && data.Dictionary?.[2]?.targetUser){
                const replyDiv = ElementCreateDiv("replyMessageDiv" + new Date().getTime());

                let messageText = data.Dictionary[1].repliedMessage

                replyDiv.textContent = data.Dictionary?.[2]?.targetUser + ": " + messageText;
                replyDiv.style.fontSize = "0.8em";
                replyDiv.style.marginTop = "5px";
                replyDiv.style.backgroundColor = "lightgray";
                replyDiv.style.color = "black";
                replyDiv.style.padding = "5px";
                replyDiv.style.borderRadius = "4px";
                divChildren.unshift(replyDiv)
            }
            divChildren.push(
            " ",
                replyButton
            )
        }
        const div = ElementCreate`
      });

      mod.patchFunction("ChatRoomMessageDisplay", {
        'ChatRoomAppendChat(div);': 
            `div.onmouseenter = () => {
                replyButton.style.display = "inline-block";
            };
            div.onmouseleave = () => {
                replyButton.style.display = "none";
            };
            ChatRoomAppendChat(div);`
      });
      
      function chatReply() {
        const sender = Number.parseInt(this.parentElement?.dataset.sender, 10);
        const chatMessageDiv = this.parentElement;
        const userNameButton = this.parentElement.querySelector('.ChatMessageName');
        const userName = userNameButton.innerText;
        let messageText: string = "";
        chatMessageDiv.childNodes
        .forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
            const text: string = node.textContent.trim();
                if (text) {
                    messageText = text; 
                }
            }
        });

        const replyContent: ReplyContent = {
            targetUser: userName,
            repliedMessage: messageText
        }

        Player.ExtensionSettings.BCA = replyContent;

        const chatInput: HTMLTextAreaElement | null = document.getElementById("InputChat") as HTMLTextAreaElement | null;
        chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
	    chatInput.focus();

        console.log(Player.ChatSettings.ColorTheme)

    } 
}



