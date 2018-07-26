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

    return head + " " +
           splited[0] + "（"　+ splited[1] + "）さんで" +
           "「" + splited[2] + "」（" + splited[3] + "） " +
           splited[4] + " #potatotips"; 
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