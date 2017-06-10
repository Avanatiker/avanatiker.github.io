/*jshint browser: true, devel: true*/
(function () {
    var pi, loadingEl, piTextEl, piEntryEl, piDigitsCountEl, piHintEl, entered = "", keys, hintShown = false, sepp = 0;

    keys = {
        48: 0,
        49: 1,
        50: 2,
        51: 3,
        52: 4,
        53: 5,
        54: 6,
        55: 7,
        56: 8,
        57: 9,
        96: 0,
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9
    };

    if (document.readyState === "complete")
        init();
    else
        document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete")
                init();
        });

    function init () {
        loadingEl = document.getElementById("loading");
        piTextEl = document.getElementById("pi-text");
        piEntryEl = document.getElementById("pi-entry");
        piDigitsCountEl = document.getElementById("pi-digits-count");
        piHintEl = document.getElementById("pi-hint");

        piDigitsCountEl.addEventListener("click", function () {
            entered = "";
            piEntryEl.innerText = "";
            hideHint();
            piDigitsCountEl.innerText = "0";
        });

        piHintEl.addEventListener("click", toggleHint);

        console.log("Getting Pi as variable from https://raw.githubusercontent.com/coreos/gzran/master/testdata/pi.txt");
        pi = getPI();
        console.log("Pi finished loading.");
        loadingEl.style.display = "none";
        piTextEl.style.display = "block";

        window.addEventListener("keydown", function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode === 8 && (entered.length - sepp) > 0) {
                entered = entered.substring(0, (entered.length - sepp) - 1);
                e.preventDefault();
                hideHint();
            } else if (keyCode === 32) {
                toggleHint();
            } else if (keys[keyCode] !== undefined) {
                if (pi.charAt(entered.length - sepp) === keys[keyCode].toString()) {
                    if (entered.length % 5 === 2) {
                        entered = entered + " " + keys[keyCode].toString();
                        sepp += 1;
                    } else {
                        entered = entered + "" + keys[keyCode].toString();
                    }
                    hideHint();
                } else {
                    piHintEl.innerText = pi.charAt(entered.length - sepp);
                    piHintEl.style.backgroundColor = "transparent";
                }
            }
            piEntryEl.innerText = entered;
            piDigitsCountEl.innerText = "" + (entered.length - sepp);
        });

        setInterval(function () {
            window.scrollTo(0,document.body.scrollHeight);
        }, 1);
    }

    function getPI () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://raw.githubusercontent.com/coreos/gzran/master/testdata/pi.txt", false);
        xhr.send();
        return xhr.responseText.substring(2);
    }

    function toggleHint () {
        if (hintShown)
            hideHint();
        else
            showHint();
    }

    function showHint () {
        piHintEl.innerText = pi.charAt(entered.length - sepp);
        piHintEl.style.backgroundColor = "transparent";
        hintShown = true;
    }

    function hideHint () {
        piHintEl.innerHTML = "&nbsp;";
        piHintEl.style.backgroundColor = "";
        hintShown = false;
    }
})();
