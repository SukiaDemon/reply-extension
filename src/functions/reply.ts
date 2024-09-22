import { mod } from "mod";

export default function reply (){

    mod.hookFunction("ChatRoomMessageDisplay", 1, (args, next) => {
        console.log("xdd")
        console.log(args)
        return next(args);
    })

    //Pushing the reply button with the custom "chatReply" func into "divChildren" array
    mod.patchFunction("ChatRoomMessageDisplay", {
        'const div = ElementCreate': 
        `if(data.Type === "Chat"){
            if(data.Dictionary?.[1]?.repliedMessageId && data.Dictionary?.[2]?.targetUser){
                const replyDiv = ElementCreateDiv("replyMessageDiv" + new Date().getTime());
                const divElement = document.querySelector(\`div[data-message-id="\${data.Dictionary?.[1]?.repliedMessageId}"]\`);

                let messageText = "test";
                divElement.childNodes
                    .forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent.trim();
                            if (text) {
                                messageText = text; 
                            }
                        }
                    });

                replyDiv.textContent = data.Dictionary?.[2]?.targetUser + ": " + messageText;
                replyDiv.style.fontSize = "0.8em";
                replyDiv.style.marginTop = "5px";
                replyDiv.style.backgroundColor = "lightgray";
                replyDiv.style.padding = "5px";
                replyDiv.style.borderRadius = "4px";
                divChildren.unshift(replyDiv)
            }
            divChildren.push(
            " ",
                ElementButton.Create(
                    null, ${chatReply}, { noStyling: true },
                    { button: { classList: ["ReplyButton"], children: ["\u21a9\ufe0f"] } },
                ),)
        }
        const div = ElementCreate`
      });

      mod.patchFunction("ChatRoomMessageDisplay", {
        'dataAttributes: {': 
        `dataAttributes: {
            messageId: ChatRoomCurrentTime() + data.Content + data.Sender,`
      });
      
      function chatReply() {
        const sender = Number.parseInt(this.parentElement?.dataset.sender, 10);
        const chatMessageDiv = this.parentElement;
        const userNameButton = this.parentElement.querySelector('.ChatMessageName');
        const userName = userNameButton.innerText;
        let messageText = "";
        chatMessageDiv.childNodes
        .forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
                if (text) {
                    messageText = text; 
                }
            }
        }); 
        Player.ExtensionSettings.BCA = {
            targetUser: userName,
            repliedMessageId: this.parentElement?.dataset.time + messageText + this.parentElement?.dataset.sender
        }
        const chatInput: HTMLTextAreaElement | null = document.getElementById("InputChat") as HTMLTextAreaElement | null;
        chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
	    chatInput.focus();
    } 
}



