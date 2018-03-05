var start = document.querySelectorAll(".screen button");
var startScreen = document.querySelector(".screen");
var timer = document.querySelector(".time span");
var gameOver = document.querySelector("#game-over");
var flag = document.querySelectorAll('.flag');
var score = document.querySelector(".score strong");
var imgLife = document.querySelectorAll(".lives img");
var flagImg = document.querySelectorAll(".flags img")
var life = 2;

var time = function() {
    if (timer.textContent > 0)
        timer.textContent--;
    if (timer.textContent == 0)
        gameOver.classList.add('is-open');
}

var startTimer = function() {
    intervalID = setInterval(time, 1000);
    console.log(flag);
}

var rand = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var generateRandomFlags = function(indexFlag) {
    var sameColors = [];
    var goodColors = flags[indexFlag].colors;

    for (var i = 0; i < flags.length; i++) {
        var isPush = 0;
        for (var j = 0; j < goodColors.length; j++) {
            for (var k = 0; k < flags[i].colors.length; k++) {
                if (isPush === 0 && i !== indexFlag) {
                    if (flags[i].colors[k] === goodColors[j]) {
                        sameColors.push(flags[i]);
                        isPush = 1;
                    }
                }
            }
        }
    }
  return sameColors;
}

var copyTab = function(deletePos, oldTab) {
    var newTab = []

    for (var i = 0; i < oldTab.length; i++) {
        if (i !== deletePos)
            newTab.push(oldTab[i]);
    }
    return newTab;
}
var generatePositionFlag = function(goodPlace, goodColors, imgFlag) {
    var i = 0;

    while (i < imgFlag.length) {
        var randWrongFlag = rand(goodColors.length);
        if (i !== goodPlace) {
            imgFlag[i].src = "flags/" + goodColors[randWrongFlag].code.toLowerCase() + ".svg";
            imgFlag[i].dataset.code = "no"
            goodColors = copyTab(randWrongFlag, goodColors);
        }
        i++;
    }
}

var clear = function(clearFlags) {
    for (var i = 0; i < clearFlags.length; i++)
        clearFlags[i].src = "";
    for (i = 0; i < flag.length; i++) {
        flag[i].classList.remove('is-active');
    }
}

var generateGame = function() {
    var imgFlag = document.querySelectorAll('.flags img');
    var contryName = document.querySelector("h2");
    clear(imgFlag);
    var indexFlag = rand(flags.length);
    var selectFlag = flags[indexFlag];
    var randomPos = rand(4);

    contryName.textContent = flags[indexFlag].name;
    imgFlag[randomPos].src = "flags/" + selectFlag.code.toLowerCase() + ".svg";
    imgFlag[randomPos].dataset.code = flags[indexFlag].code;
    var goodColors = generateRandomFlags(indexFlag);
    generatePositionFlag(randomPos, goodColors, imgFlag);
}

for (let i = 0; i < start.length; i++) {
    start[i].addEventListener("click", function() {
        startScreen.classList.remove("is-open");
        gameOver.classList.remove('is-open')
        timer.textContent = 20;
        for (var j = 0; j < imgLife.length; j++) {
            imgLife[j].style.opacity = "1";
        }
        life = 2;
        score.textContent = 0;
        generateGame();
    });
}

for (let i = 0; i < flagImg.length; i++) {
    flagImg[i].addEventListener("click", function() {
        if (flagImg[i].dataset.code !== "no") {
            generateGame();
            score.textContent = parseInt(score.textContent) + 10;
            if (timer.textContent < 27)
                timer.textContent = parseInt(timer.textContent) + 3;
            else
                timer.textContent = 30;
        } else  {
            imgLife[life].style.opacity = "0";
            life--;
            flag[i].classList.add("is-active");
            if (life === -1) {
                gameOver.classList.add('is-open');
            }
            console.log(life);
        }
    });
}
