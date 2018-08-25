let HASHTAG = "#potatotips";
let FIRST_PREFIX = "はじめは";
let LAST_PREFIX = "最後は";
let OTHER_PREFIX = "つぎは";

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

function tweetTextFrom(line, prefix) {
    let values = line;

    let accountName = values[0].trim();
    let nickname = values[1].trim();
    let title = values[2].trim();
    let platform = values[3].trim();
    let twitterAccount = extractTwitterAccount(values[4].trim());
    let docURL = values[5].trim();

    let presenter = twitterAccount || accountName;
    let nicknameText = nickname ? "（" + nickname + "）" : "";

    return prefix + " " +
           presenter + nicknameText + "さんで" +
           "「" + title + "」（" + platform + "） " +
           " " + HASHTAG +
           " " + docURL;
}

function tweetsTextFrom(text) {
    let lines = textToLines(text)

    if (lines.length == 1) {
        return tweetTextFrom(lines[0], OTHER_PREFIX);
    } else {
        var result = "";
        lines.forEach((line, index) => {
            let prefix = prefixFor(index, lines.length);
            result += tweetTextFrom(line, prefix) + "\n"
        })
        return result;
    }
}

function textToLines(text) {
    let values = text.split("|");
    values.shift();

    var lines = [];
    for (var i = 0; i < values.length; i += 7) {
        let lineValues = values.slice(i, i + 7);
        lines.push(lineValues);
    }

    return lines;
}

function prefixFor(index, count) {
    if (count < 2) {
        return OTHER_PREFIX;
    }

    switch (index) {
    case 0:
        return FIRST_PREFIX;
    case count - 1:
        return LAST_PREFIX;
    default:
        return OTHER_PREFIX;
    }
}

function extractTwitterAccount(text) {
    let result = text.match(/@[a-zA-Z0-9_]+/);

    if (result) {
      return result[0];
    } else {
      return text;
    }
}

chrome.contextMenus.create({
    "title": "クリップボードにコピー",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info) {
        saveToClipboard(tweetsTextFrom(info.selectionText));
    }
});
