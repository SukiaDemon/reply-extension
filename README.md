# BC Reply Extension

## Overview

The BC Reply Extension adds the ability to reply to specific messages in the chat, just like in other chatting apps such
as Discord, Messenger, WhatsApp, etc.

## Features

- Reply to specific messages in the chat.
- Customizable colors for the reply box, reply box text, and borders when in reply mode.

## Screenshots

![Extension in Action](your-image-path.png)

*Insert more images if necessary*

## Installation

### Stable Version

To install the stable version, use one of the following methods:

- **Tampermonkey**: [Stable Tampermonkey Link](https://github.com/Arcsery/reply-extension/raw/gh-pages/BCR-1.user.js)
- **Bookmarklet**: Add this to your bookmarks bar:

  ```javascript
  javascript:(function() { 
    var script = document.createElement('script'); 
    script.src = 'https://arcsery.github.io/reply-extension/bcr.js'; 
    document.head.appendChild(script); 
  })();
