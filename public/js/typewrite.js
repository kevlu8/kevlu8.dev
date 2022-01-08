async function wait(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
function typeWriter(text) {
    var i = 0;
    var speed = 50;
    var txt = text.split("");
    var elem = document.getElementById("hi");
    var timer = setInterval(function() {
        if (i < txt.length) {
            elem.innerHTML += txt[i];
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

async function deleteChars() {
    var elem = document.getElementById("hi");
    var timer = setInterval(function() {
        if (elem.innerHTML.length > 0) {
            elem.innerHTML = elem.innerHTML.slice(0, -1);
        } else {
            clearInterval(timer);
        }
    }, 50);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

typeWriter("programmer.");
document.getElementById("programmer").hidden = false;
wait(3).then(() => {
    deleteChars().then(() => {
        typeWriter("YouTuber.");
        document.getElementById("youtuber").hidden = false;
        wait(3).then(() => {
            deleteChars().then(() => {
                typeWriter("gamer.");
                document.getElementById("gamer").hidden = false;
                document.getElementById("gamer2").hidden = false;
                document.getElementById("gamer3").hidden = false;
                wait(3).then(() => {
                    deleteChars().then(() => {
                        typeWriter("streamer.");
                        document.getElementById("streamer").hidden = false;
                        wait(3).then(() => {
                            deleteChars().then(() => {
                                typeWriter("weeb.");
                                document.getElementById("anime").hidden = false;
                                wait(3).then(() => {
                                    deleteChars().then(() => {
                                        typeWriter("Chess Player.");
                                        document.getElementById("chessca").hidden = false;
                                        document.getElementById("fide").hidden = false;
                                        wait(3).then(() => {
                                            deleteChars().then(() => {
                                                typeWriter("music producer.");
                                                document.getElementById("music").hidden = false;
                                                wait(3).then(() => {
                                                    deleteChars().then(() => {
                                                        typeWriter("random person on the internet.");
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});