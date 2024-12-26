import commands from "functions/commands";
import reply from "functions/reply";

chatReplyButtonCss();
commands();
reply();


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