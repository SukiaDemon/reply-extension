(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var bcmodsdk = {};

	(function (exports) {
		// Bondage Club Mod Development Kit (1.2.0)
		// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
		/** @type {ModSDKGlobalAPI} */
		(function(){const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})(); 
	} (bcmodsdk));

	var bcModSdk = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdk);

	const MOD_NAME = "BCA";
	const MOD_FULL_NAME = "Bondage Club Additions";
	const MOD_VERSION = "0.1.0";
	const MOD_REPOSITORY = "";
	const mod = bcModSdk.registerMod({
	    name: MOD_NAME,
	    fullName: MOD_FULL_NAME,
	    version: MOD_VERSION,
	    repository: MOD_REPOSITORY,
	});

	let replyMode = false;
	function reply() {
	    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {
	        next(args);
	        console.log(args);
	        console.log("ChatroomMessage");
	        if (args[0] && args[0].Type && args[0].Type == "Chat") {
	            let chatMessage = args[0];
	            if (chatMessage.Content && chatMessage.Sender) {
	                addButtonToLastMessage(args[0].Content, args[0].Sender);
	            }
	            // @ts-ignore
	            let replyMessageData = chatMessage.Dictionary.find(obj => {
	                if (obj["isReplyMessage"] && obj["isReplyMessage"] == true) {
	                    return obj;
	                }
	                return false;
	            });
	            if (chatMessage.Dictionary && replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
	                addReplyBoxToLastMessage(replyMessageData.repliedMessage, replyMessageData.repliedMessageAuthor);
	            }
	        }
	    });
	    mod.hookFunction("ServerSend", 1, (args, next) => {
	        let replyMessageData = {
	            isReplyMessage: true,
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
	            const chatInput = document.getElementById("InputChat");
	            chatInput.placeholder = "Talk to everyone";
	        }
	    });
	}
	let repliedMessage = "";
	let repliedMessageAuthor;
	let repliedMessageAuthorNumber;
	function addButtonToLastMessage(messageText, messageSenderNumber) {
	    const chatContainer = document.querySelector('#TextAreaChatLog');
	    let lastMessage = null;
	    if (chatContainer) {
	        lastMessage = chatContainer.querySelector('.ChatMessageChat:last-of-type');
	    }
	    if (lastMessage) {
	        const userNameDiv = lastMessage.querySelector('.ChatMessageName');
	        const userName = userNameDiv.innerText;
	        let button = ElementButton.Create(null, function (ev) {
	            repliedMessage = messageText;
	            repliedMessageAuthor = userName;
	            repliedMessageAuthorNumber = messageSenderNumber;
	            const chatInput = document.getElementById("InputChat");
	            //chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
	            replyMode = true;
	            chatInput.placeholder = "Reply to " + repliedMessageAuthor;
	            chatInput.focus();
	        }, 
	        // @ts-ignore
	        { noStyling: true }, { button: { classList: ["ChatReplyButton"], children: [" \u21a9\ufe0f"] } });
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
	function addReplyBoxToLastMessage(messageText, messageSender) {
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

	function commands() {
	    CommandCombine({
	        Tag: "reply",
	        "Description": "reply to a chat message",
	        Action: (args) => {
	            const [targetNumber, ...messageParts] = args.split(" ");
	            const message = messageParts.join(" ");
	            if (message && message != "") {
	                let generatedMessage = ChatRoomGenerateChatRoomChatMessage("Chat", message);
	                ServerSend("ChatRoomChat", {
	                    Content: generatedMessage.Content,
	                    Type: generatedMessage.Type,
	                    Target: generatedMessage.Target,
	                    Dictionary: [
	                        { targetId: targetNumber, repliedMessage: repliedMessage, targetUser: repliedMessageAuthor },
	                    ]
	                });
	            }
	            Player.ExtensionSettings.BCA.repliedMessage = "";
	            Player.ExtensionSettings.BCA.targetUser = "";
	        }
	    });
	}

	function loadCss() {
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

	const defaultSettings = {
	    replyBackgroundColor: "#D3D3D3",
	    replyTextColor: "#000000"
	};
	let BCAPlayerInfos = {
	    settings: { ...defaultSettings },
	    targetUser: "",
	    repliedMessage: ""
	};
	function settings() {
	    if (!Player.ExtensionSettings.BCA) {
	        Player.ExtensionSettings.BCA = BCAPlayerInfos;
	    }
	}

	function settingsPage() {
	    let hideBackGroundColorPicker = true;
	    let hideTextColorPicker = true;
	    PreferenceRegisterExtensionSetting({
	        Identifier: "BCA",
	        ButtonText: "BCA Settings",
	        Image: undefined, // TODO: Need to find/create cool image
	        load: PreferenceSubScreenBCASettingsLoad,
	        click: PreferenceSubScreenBCASettingsClick,
	        run: PreferenceSubScreenBCASettingsRun,
	        exit: PreferenceSubScreenBCASettingsExit,
	    });
	    function PreferenceSubScreenBCASettingsLoad() {
	        //ReplyBoxBackgroundColor Input Field
	        ElementCreateInput("InputReplyBoxBackgroundColor", "text", Player.ExtensionSettings.BCA.settings.replyBackgroundColor);
	        //ReplyTextColor Input Field
	        ElementCreateInput("InputReplyTextColor", "text", Player.ExtensionSettings.BCA.settings.replyTextColor);
	        hideBackGroundColorPicker = true;
	        hideTextColorPicker = true;
	    }
	    function PreferenceSubScreenBCASettingsClick() {
	        if (MouseIn(1815, 75, 90, 90)) { //Exit Icon Click
	            PreferenceSubScreenBCASettingsExit();
	        }
	        if (MouseIn(1140, 215, 65, 65)) { //ReplyBoxBackgroundColor Icon Click
	            hideTextColorPicker = true;
	            ColorPickerHide();
	            hideBackGroundColorPicker = !hideBackGroundColorPicker;
	        }
	        if (MouseIn(1140, 315, 65, 65)) { //ReplyTextColor Icon Click
	            hideBackGroundColorPicker = true;
	            ColorPickerHide();
	            hideTextColorPicker = !hideTextColorPicker;
	        }
	        if (MouseIn(600, 715, 300, 100)) {
	            ElementValue("InputReplyBoxBackgroundColor", defaultSettings.replyBackgroundColor);
	            ElementValue("InputReplyTextColor", defaultSettings.replyTextColor);
	        }
	    }
	    function PreferenceSubScreenBCASettingsRun() {
	        DrawCharacter(Player, 50, 50, 0.9);
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png"); //Exit Icon
	        DrawText("Reply box background color: ", 630, 250, "Black", "Gray"); //ReplyBoxBackgroundColor Label
	        ElementPosition("InputReplyBoxBackgroundColor", 1000, 250, 250); //ReplyBoxBackgroundColor ColorPicker Position
	        DrawButton(1140, 215, 65, 65, "", "White", "Icons/Color.png"); //ReplyBoxBackgroundColor Icon Position
	        updateInputFieldTextColor("InputReplyBoxBackgroundColor");
	        DrawText("Reply text color: ", 730, 350, "Black", "Gray"); //ReplyTextColor Label
	        ElementPosition("InputReplyTextColor", 1000, 350, 250); //ReplyTextColor ColorPicker Position
	        DrawButton(1140, 315, 65, 65, "", "White", "Icons/Color.png"); //ReplyTextColor Icon Position
	        updateInputFieldTextColor("InputReplyTextColor");
	        if (hideBackGroundColorPicker) {
	            if (hideTextColorPicker) {
	                ColorPickerHide();
	            }
	        }
	        else {
	            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyBoxBackgroundColor"));
	        }
	        if (hideTextColorPicker) {
	            if (hideBackGroundColorPicker) {
	                ColorPickerHide();
	            }
	        }
	        else {
	            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyTextColor"));
	        }
	        DrawButton(600, 715, 300, 100, "Restore to default", "White");
	    }
	    function PreferenceSubScreenBCASettingsExit() {
	        const ReplyBoxBackgroundColor = ElementValue("InputReplyBoxBackgroundColor");
	        const ReplyTextColor = ElementValue("InputReplyTextColor");
	        if (CommonIsColor(ReplyBoxBackgroundColor)) {
	            updateChatReplyBoxColors(ReplyBoxBackgroundColor, ReplyTextColor);
	        }
	        ElementRemove("InputReplyBoxBackgroundColor");
	        ElementRemove("InputReplyTextColor");
	        PreferenceSubscreenExtensionsClear();
	    }
	}
	function updateChatReplyBoxColors(newBackgroundColor, newTextColor) {
	    document.documentElement.style.setProperty('--reply-background-color', newBackgroundColor);
	    Player.ExtensionSettings.BCA.settings.replyBackgroundColor = newBackgroundColor;
	    document.documentElement.style.setProperty('--reply-text-color', newTextColor);
	    Player.ExtensionSettings.BCA.settings.replyTextColor = newTextColor;
	}
	function updateInputFieldTextColor(id) {
	    let TextColorCSS = "";
	    if (CommonIsColor(ElementValue(id)))
	        TextColorCSS = ElementValue(id);
	    else
	        TextColorCSS = Player.LabelColor;
	    document.getElementById(id).style.color = TextColorCSS;
	    let TextColorHSV = ColorPickerCSSToHSV(TextColorCSS);
	    if (TextColorHSV.V > 0.4) {
	        document.getElementById(id).style.backgroundColor = "#111111";
	    }
	    else {
	        document.getElementById(id).style.backgroundColor = "#FFFFFF";
	    }
	}

	settings();
	settingsPage();
	loadCss();
	commands();
	reply();

})();
