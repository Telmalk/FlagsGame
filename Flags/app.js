var start = document.querySelectorAll(".screen button");
var startScreen = document.querySelector(".screen");
var timer = document.querySelector(".time span");
var gameOver = document.querySelector("#game-over");
var flag = document.querySelectorAll('.flag');

var time = function() {
    if (timer.textContent > 0)
        timer.textContent--;
    if (timer.textContent == 0)
        gameOver.classList.add('is-open');
}

var startTimer = function() {
    console.log("yep")
    intervalID = setInterval(time, 1000)
}

var rand = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var generateGame = function() {
    var imgFlag = document.querySelectorAll('.flags img');
    var contryName = document.querySelector("h2");
    var indexFlag = rand(flags.length);
    var selectFlag = flags[indexFlag];
    var randomPos = rand(4);

    contryName.textContent = flags[indexFlag].name;
    imgFlag[randomPos].src = "flags/" + selectFlag.code.toLowerCase() + ".svg";
    imgFlag[randomPos].dataset.code = flags[indexFlag].code;
}

for (let i = 0; i < start.length; i++) {
    start[i].addEventListener("click", function() {
        startScreen.classList.remove("is-open");
        gameOver.classList.remove('is-open')
        timer.textContent = 1000;
        generateGame();
    });
}


for (let i = 0; i < flag.length; i++) {
    flag[i].addEventListener("click", function() {
        console.log(flag[i]);
    });
}

