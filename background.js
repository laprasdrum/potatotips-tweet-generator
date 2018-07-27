function saveToClipboard(text) {
    console.log(text);
    var textArea = document.createElement("textarea")
    textArea.style.cssText = "position:absolute;left:-100%";

    document.body.appendChild(textArea);

    textArea.value = text;
    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);
}

function tweetTextFrom(text, isFirst) {
    var splitted = text.split(" ");
    var head = isFirst ? "はじめは" : "つぎは";
    var lastIdx = splitted.length - 1;
 
    var presenter = splitted[0];
    var nickname = splitted[1];
    var twitterAccountIdx = splitted[lastIdx].match(/@/) ? lastIdx : lastIdx - 1;
    var twitterAccount = splitted[twitterAccountIdx];
    var platform = splitted[twitterAccountIdx - 1];

    var title = "";
    for(let i = 2; i < twitterAccountIdx - 1; i++) {
        title = title.concat(splitted[i], " ");
    }
    title = title.slice(0, -1);

    return head + " " +
           presenter + "（"　+ nickname + "）さんで" +
           "「" + title + "」（" + platform + "） " +
           twitterAccount + " #potatotips"; 
}

chrome.contextMenus.create({
    "title": "クリップボードにコピー（はじめ）",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info) {
        saveToClipboard(tweetTextFrom(info.selectionText, true));
    }
});
chrome.contextMenus.create({
    "title": "クリップボードにコピー（つぎ）",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info) {
        saveToClipboard(tweetTextFrom(info.selectionText, false));
    }
});
