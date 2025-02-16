# BC Reply Extension

## Overview

The BC Reply Extension adds the ability to reply to specific messages in the chat, just like in other chatting apps such
as Discord, Messenger, WhatsApp, etc.

## Features

## Installation

### Stable Version

To install the stable version, use one of the following methods:

- **Tampermonkey**: [Stable Tampermonkey Link](https://github.com/SukiaDemon/reply-extension/raw/gh-pages/BCR-1.user.js)
- **Bookmarklet**: Add this to your bookmarks bar:

  ```javascript
  javascript:(function() { 
    var script = document.createElement('script'); 
    script.src = 'https://sukiademon.github.io/reply-extension/bcr.js'; 
    document.head.appendChild(script); 
  })();

- Reply to specific messages in the chat.
- Auto scroll to original message after clicking on the reply box
- Customizable colors for the reply box, reply box text, and borders when in reply mode.

## Screenshots

### Here you can view pictures of the extension in action:

<img src="images/chatwithreplybutton.png" alt="example1"  width="75%" height="50%"> 
<img src="images/fullMessageDark.png" alt="example1"  width="75%" height="50%"> 
<img src="images/onlyMessagesLight.png" alt="example1"  width="50%" height="50%"> 

### Settings:

In the BC Reply settings, you can customize the colors for the reply box and its text as well as the border of the text
area when in reply mode. This allows for personalized theme options.
<img src="images/settings.png" alt="settings"  width="75%" height="50%">
