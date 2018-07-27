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
    var splited = text.split(" ");
    var head = isFirst ? "はじめは" : "つぎは";
    var lastIdx = splited.length - 1;
 
    var presenter = splited[0];
    var nickname = splited[1];
    var twitterAccountIdx = splited[lastIdx].match(/@/) ? lastIdx : lastIdx - 1;
    var twitterAccount = splited[twitterAccountIdx];
    var platform = splited[twitterAccountIdx - 1];

    var title = "";
    for(let i = 2; i < twitterAccountIdx - 1; i++) {
        title = title.concat(splited[i], " ");
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