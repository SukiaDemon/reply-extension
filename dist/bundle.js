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

	const constants = {
	    //ReplyContent.isReplyMessage
	    IS_REPLY_MESSAGE: "isReplyMessage",
	    InputChat_DIV_ID: "InputChat",
	    //InputChat placeholder
	    TALK_TO_EVERYONE_PLACEHOLDER: "Talk to everyone",
	    //close button id
	    CHAT_ROOM_REPLY_CLOSE: "chat-room-reply-close",
	    //chat container class
	    TEXT_AREA_CHAT_LOG: '#TextAreaChatLog',
	    //last message div
	    CHAT_MESSAGE_CHAT_LAST_OF_TYPE: ".ChatMessageChat:last-of-type"
	};

	var img = "data:image/png;base64,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a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjhiNDkyZDEwLTU5NzYtNGQ4Ni1iNzIzLThlNWUzNTM1NGU3NSIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowYmNkMWZmNi1iZjQ0LTQ3YzAtODAwOS1iYTc0MGZlYjcwZTIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkY2FkMmU1Yy1kN2IyLTRkOWEtOGExMi1iNWU5NjhlZGMwNGYiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTY2NDU1Njk2Nzg0ODkyNSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMwIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE3MDUzOWNkLTBjNDAtNDQxNy05ZWFkLWYwNjFiNzI5N2U4MSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMi0wOS0zMFQxMjo1NjowNyIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6HcQKDAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH5gkeEDgHJMKaygAAAZxJREFUaN7tWtFuBCEIZNBkX9b//1vpS5u0d8kqCmhbJ9nHE8YZAXeP6ODg4ODgwAfXdUlULGaWaH7y7QmJBUAdi0ei5Zx/BBoJrCRHRET3fZN2Q6GNBkBExGy9XnIvdqVaK8wJNsgRABIReJLT5s8aWz6RIyISESu7ilXhgWVAI7uK0lWPrmkqONoKBpVU/6ZVeDwV3CIG9wsy5rhOJd02EN4W6jgnru6w7oPaeO7WV08yImJl14hzPTV5hA+/IznzTCBm3pqc1ewou5KbVXC6hUQIYZbZZHV1y9F06x1IYvkCjiSxzSIOhccsr/A633HHo6087tg2sKOCYnmWd1PQvEdYvOPBruSs8uRfQG7Krtid3Gy+vILcaCsYURILlEPkhZcXkZu6hWiUxCJy07NrbwvBSnIRa/MG5Fzt2v46wyy11qiybr6RTQVrrQBApZSICq1WMuf8GMvrDEYOECZnkKj/NaHFfNtUMqXkdmGXh8djBn17Ukq+I+Lnl1VXco0NDZh6ASmlhAT82tDXf3dEQP5orIODg4OD/4EPln+ZaCaG964AAAAASUVORK5CYII=";

	let customFocusColor = {
	    enable: (color) => {
	        const chatroomBot = document.getElementById("chat-room-bot");
	        if (chatroomBot) {
	            chatroomBot.style.outline = "none";
	            chatroomBot.style.border = `2px solid ${color}`;
	            chatroomBot.style.boxShadow = "0 0 10px #719ECE";
	        }
	    },
	    disable: () => {
	        const chatroomBot = document.getElementById("chat-room-bot");
	        if (chatroomBot) {
	            chatroomBot.style.outline = "";
	            chatroomBot.style.border = "";
	            chatroomBot.style.boxShadow = "";
	        }
	    }
	};
	function loadCss() {
	    chatReplyButtonCss();
	    chatReplyBoxCss();
	    chatReplyClose();
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
        display: none;
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
            background-image: url("${img}");
            mask-image: url("${img}");
            transition: filter 0.3s ease;
        }
        
            #chat-room-reply-close:hover::before {
            filter: brightness(0) saturate(100%) invert(42%) sepia(100%) saturate(2968%) hue-rotate(179deg) brightness(106%) contrast(101%);
        }
        
        `;
	    document.head.appendChild(style);
	}

	let isReplyMode = false;
	let isWaitingForReply = false;
	function reply() {
	    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {
	        isWaitingForReply = true;
	        next(args);
	        if (args[0] && args[0].Type && args[0].Type == "Chat") {
	            let chatMessage = args[0];
	            if (chatMessage.Content && chatMessage.Sender) {
	                addButtonToLastMessage(args[0].Content, args[0].Sender);
	            }
	            // @ts-ignore
	            let replyMessageData = chatMessage.Dictionary.find(obj => {
	                if (obj[constants.IS_REPLY_MESSAGE] && obj[constants.IS_REPLY_MESSAGE] == true) {
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
	            isReplyMessage: isReplyMode,
	            targetId: repliedMessageAuthorNumber,
	            repliedMessage: repliedMessage,
	            repliedMessageAuthor: repliedMessageAuthor
	        };
	        if (args[1] && args[1]["Content"] && args[1]["Type"] == "Chat") {
	            if (isReplyMode) {
	                args[1]["Dictionary"].push(replyMessageData);
	            }
	            next(args);
	            isReplyMode = false;
	            customFocusColor.disable();
	            const chatInput = document.getElementById(constants.InputChat_DIV_ID);
	            if (chatInput) {
	                chatInput.placeholder = constants.TALK_TO_EVERYONE_PLACEHOLDER;
	            }
	            const closeButtonHtml = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE);
	            if (closeButtonHtml) {
	                closeButtonHtml.remove();
	            }
	        }
	        else {
	            next(args);
	        }
	    });
	    mod.hookFunction("ElementScrollToEnd", 1, (args, next) => {
	        if (isWaitingForReply) {
	            setTimeout(() => {
	                next(args);
	                isWaitingForReply = false;
	            }, 100);
	        }
	        else {
	            next(args);
	        }
	    });
	}
	let repliedMessage = "";
	let repliedMessageAuthor;
	let repliedMessageAuthorNumber;
	function addButtonToLastMessage(messageText, messageSenderNumber) {
	    const chatContainer = document.querySelector(constants.TEXT_AREA_CHAT_LOG);
	    let lastMessage = null;
	    if (chatContainer) {
	        lastMessage = chatContainer.querySelector(constants.CHAT_MESSAGE_CHAT_LAST_OF_TYPE);
	    }
	    if (lastMessage) {
	        const userNameDiv = lastMessage.querySelector('.ChatMessageName');
	        const userName = userNameDiv.innerText;
	        let button = ElementButton.Create(null, () => {
	            const closeButtonHtml = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE);
	            repliedMessage = messageText;
	            repliedMessageAuthor = userName;
	            repliedMessageAuthorNumber = messageSenderNumber;
	            const chatInput = document.getElementById(constants.InputChat_DIV_ID);
	            //chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
	            isReplyMode = true;
	            chatInput.placeholder = "Reply to " + repliedMessageAuthor;
	            if (Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
	                customFocusColor.enable(Player.ExtensionSettings.BCA.settings.customFocusColor);
	            }
	            chatInput.focus();
	            if (!closeButtonHtml) {
	                const closeButton = ElementButton.Create(constants.CHAT_ROOM_REPLY_CLOSE, () => {
	                    isReplyMode = false;
	                    if (Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
	                        customFocusColor.disable();
	                    }
	                    chatInput.placeholder = constants.TALK_TO_EVERYONE_PLACEHOLDER;
	                    repliedMessage = "";
	                    repliedMessageAuthor = "";
	                    repliedMessageAuthorNumber = null;
	                    const closeButtonHtmlAfterClick = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE);
	                    closeButtonHtmlAfterClick.remove();
	                    collapseButton.setAttribute("aria-expanded", "false");
	                    collapseButton.textContent = "<";
	                }, 
	                // @ts-ignore
	                { noStyling: true }, { button: { classList: ["chat-room-button"] } });
	                const buttonBox = document.getElementById("chat-room-buttons");
	                const collapseButton = document.getElementById("chat-room-buttons-collapse");
	                collapseButton.setAttribute("aria-expanded", "true");
	                collapseButton.textContent = ">";
	                buttonBox.appendChild(closeButton);
	            }
	        }, 
	        // @ts-ignore
	        { noStyling: true }, { button: { classList: ["ChatReplyButton"], children: [" \u21a9\ufe0f"] } });
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
	        const chatContainer = document.querySelector(constants.TEXT_AREA_CHAT_LOG);
	        let lastMessage = null;
	        if (chatContainer) {
	            lastMessage = chatContainer.querySelector(constants.CHAT_MESSAGE_CHAT_LAST_OF_TYPE);
	        }
	        if (lastMessage) {
	            chatContainer.insertBefore(replyDiv, lastMessage);
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

	const defaultSettings = {
	    replyBackgroundColor: "#D3D3D3",
	    replyTextColor: "#000000",
	    enableCustomFocusColor: true,
	    customFocusColor: "#FF0000"
	};
	let BCAPlayerInfos = {
	    settings: { ...defaultSettings },
	};
	function settings() {
	    if (!Player.ExtensionSettings.BCA) {
	        Player.ExtensionSettings.BCA = BCAPlayerInfos;
	    }
	}

	function settingsPage() {
	    let hideBackGroundColorPicker = true;
	    let hideTextColorPicker = true;
	    let hideCustomFocusColorPicker = true;
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
	        //CustomFocusColor Input field
	        ElementCreateInput("InputCustomFocusColor", "text", Player.ExtensionSettings.BCA.settings.customFocusColor);
	        hideBackGroundColorPicker = true;
	        hideTextColorPicker = true;
	        hideCustomFocusColorPicker = true;
	    }
	    function PreferenceSubScreenBCASettingsClick() {
	        if (MouseIn(1815, 75, 90, 90)) { //Exit Icon Click
	            PreferenceSubScreenBCASettingsExit();
	        }
	        if (MouseIn(1140, 215, 65, 65)) { //ReplyBoxBackgroundColor Icon Click
	            hideTextColorPicker = true;
	            hideCustomFocusColorPicker = true;
	            ColorPickerHide();
	            hideBackGroundColorPicker = !hideBackGroundColorPicker;
	        }
	        if (MouseIn(1140, 315, 65, 65)) { //ReplyTextColor Icon Click
	            hideBackGroundColorPicker = true;
	            hideCustomFocusColorPicker = true;
	            ColorPickerHide();
	            hideTextColorPicker = !hideTextColorPicker;
	        }
	        if (MouseIn(1140, 515, 65, 65)) { //ReplyTextColor Icon Click
	            hideBackGroundColorPicker = true;
	            hideTextColorPicker = true;
	            ColorPickerHide();
	            hideCustomFocusColorPicker = !hideCustomFocusColorPicker;
	        }
	        if (MouseIn(600, 715, 300, 100)) {
	            ElementValue("InputReplyBoxBackgroundColor", defaultSettings.replyBackgroundColor);
	            ElementValue("InputReplyTextColor", defaultSettings.replyTextColor);
	        }
	        if (MouseIn(1000, 415, 64, 64)) {
	            Player.ExtensionSettings.BCA.settings.enableCustomFocusColor = !Player.ExtensionSettings.BCA.settings.enableCustomFocusColor;
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
	        addCheckBox([1000, 415, 64, 64], "Enable custom color", Player.ExtensionSettings.BCA.settings.enableCustomFocusColor);
	        DrawText("Custom chat focus color: ", 660, 550, "Black", "Gray"); //CustomFocusColor Label
	        ElementPosition("InputCustomFocusColor", 1000, 550, 250); //CustomFocusColor ColorPicker Position
	        DrawButton(1140, 515, 65, 65, "", "White", "Icons/Color.png"); //CustomFocusColor Icon Position
	        updateInputFieldTextColor("InputCustomFocusColor");
	        if (!hideBackGroundColorPicker) {
	            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyBoxBackgroundColor"));
	        }
	        if (!hideTextColorPicker) {
	            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyTextColor"));
	        }
	        if (!hideCustomFocusColorPicker) {
	            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputCustomFocusColor"));
	        }
	        DrawButton(600, 715, 300, 100, "Restore to default", "White");
	    }
	    function PreferenceSubScreenBCASettingsExit() {
	        const ReplyBoxBackgroundColor = ElementValue("InputReplyBoxBackgroundColor");
	        const ReplyTextColor = ElementValue("InputReplyTextColor");
	        const customFocusColor$1 = ElementValue("InputCustomFocusColor");
	        updateChatReplyBoxColors(ReplyBoxBackgroundColor, ReplyTextColor, customFocusColor$1);
	        if (!Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
	            customFocusColor.disable();
	        }
	        ElementRemove("InputReplyBoxBackgroundColor");
	        ElementRemove("InputReplyTextColor");
	        ElementRemove("InputCustomFocusColor");
	        PreferenceSubscreenExtensionsClear();
	    }
	}
	function updateChatReplyBoxColors(newBackgroundColor, newTextColor, customFocusColor$1) {
	    if (CommonIsColor(newBackgroundColor) && CommonIsColor(newTextColor) && CommonIsColor(customFocusColor$1)) {
	        document.documentElement.style.setProperty('--reply-background-color', newBackgroundColor);
	        Player.ExtensionSettings.BCA.settings.replyBackgroundColor = newBackgroundColor;
	        document.documentElement.style.setProperty('--reply-text-color', newTextColor);
	        Player.ExtensionSettings.BCA.settings.replyTextColor = newTextColor;
	        if (Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
	            Player.ExtensionSettings.BCA.settings.customFocusColor = customFocusColor$1;
	            if (isReplyMode) {
	                customFocusColor.enable(customFocusColor$1);
	            }
	        }
	    }
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
	function addCheckBox(cords, label, enabled) {
	    let checkImage = enabled ? "Icons/Checked.png" : "";
	    DrawButton(...cords, "", "White", checkImage);
	    DrawText(label, cords[0] - 250, cords[1] + 33, "Black", "Gray");
	}

	settings();
	settingsPage();
	loadCss();
	commands();
	reply();

})();
