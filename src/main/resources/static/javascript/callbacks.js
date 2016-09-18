var scoreHolder = function (initial) {
    function increase(num) {
        return scoreHolder(initial + num);
    }

    function currentScore() {
        return initial;
    }

    return {
        add: increase,
        current: currentScore
    }
};

var score = scoreHolder(0);

$(document).on("scoreChange", function (e, newScore) {
    score = score.add(newScore);
    $("#score").text(score.current());
    if (clicked.allSolved()) {
        $(document).trigger("gameFinished");
    }
});

$(document).on("solved", function (e, percentage) {
    progress.animate(percentage, {duration: 800});
});

$(document).on("gameFinished", function () {
    window.clearInterval(timerId);
    picoModal(
        "<div><h2>All risks found! You scored " + score.current() + " points with elapsed time " + document.getElementById('timer').innerHTML + "</h2></div>" +
        "<div><h3>Please sign in to participate in a 1 month of free insurance draw!</h3></div>" +
        "<div><input type='button' value='I want to live risk free for a month!'></div>"
    ).show();
});

var timerId;
var progress;
$(function () {
    $("area").click(loadData);
    progress = new ProgressBar.Line('#progress', {
        color: '#81D1FA',
        trailColor: '#f4f4f4',
        strokeWidth: 5
    });
    timerId = countdown(
        new Date(),
        function (ts) {
            document.getElementById('timer').innerHTML = ts.toHTML("strong");
        },
        countdown.MINUTES | countdown.SECONDS);

});

var clicked = (function () {
    var clicks = {"1": false, "2": false, "3": false};
    var total = 0;

    function click(id) {
        clicks[id] = true;
        total++;
        $(document).trigger("solved", total / 3);
    }

    function allSolved() {
        return total == 3;
    }

    function check(id) {
        return clicks[id];
    }

    return {
        store: click,
        already: check,
        allSolved: allSolved
    }
})();

function loadData() {
    var valueRiskId = $(this).attr("value");
    if (clicked.already(valueRiskId)) {
        $("#question").remove();
        return;
    }
    var pos = $(this).position();
    $.ajax({
        url: "/question/" + valueRiskId,
        success: function (d) {
            generateForm(pos, d, function () {
                clicked.store(valueRiskId);
            });
        },
        error: function (e) {
            alert("Oops! Something went wrong!");
            console.log(e);
        }
    });
}

function closeQuestion() {
    $("#question").remove();
}

function generateForm(pos, json, onSubmit) {
    var riskLength = json.answers.length;
    closeQuestion();

    // create form
    var f = document.createElement("form");
    f.setAttribute('action', "javascript:evaluateCheckbox()");
    
    var answerDiv = document.createElement("div"); //input element, text
    answerDiv.style.position = "absolute";
    answerDiv.style.left = (pos.left + 20) + "px";
    answerDiv.style.top = (pos.top) + "px";
    answerDiv.setAttribute("id", "question");
    answerDiv.appendChild(f);

    var questionText = document.createElement("p");
    questionText.setAttribute('id', "questionHeadline");
    questionText.innerHTML = json.description;
    f.appendChild(questionText);
    
    for (var i = 0; i < riskLength; i++) {
        var answerContainer = document.createElement("div");
        // itterate json
        var cbox = document.createElement("input");
        cbox.setAttribute('type', "checkbox");
        cbox.setAttribute('name', "username");
        ///cbox.checked = json.risk[i].isCorrect === "true" ;
        cbox.setAttribute('value', json.answers[i].isCorrect);

        var text = document.createElement("span");
        text.innerHTML = json.answers[i].question;

        answerContainer.appendChild(cbox);
        answerContainer.appendChild(text);
        f.appendChild(answerContainer);
    }

    // submit
    var submit = document.createElement("input"); //input element, Submit button
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "submit");
    $(submit).click(onSubmit);

    f.appendChild(submit);
    document.getElementsByTagName('body')[0].appendChild(answerDiv);

    $("#question").draggable();
}

function evaluateCheckbox() {
    var chkArray = $("input:checkbox");
    var score = 0;
    var totalCorrect = 0;
    for (var i = 0; i < chkArray.length; i++) {
        var isTrue = chkArray[i].value === "true" && chkArray[i].checked || (chkArray[i].value === "false" && !chkArray[i].checked);
        var parent = $(chkArray[i]).parent();
        if (isTrue) {
            parent.attr("style", "background:green");
            score += 5;
            totalCorrect++;
        }
        else {
            parent.attr("style", "background:red");
            score -= 10;
        }
    }
    if (totalCorrect == 3) {
        score += 20;
    }
    $(document).trigger("scoreChange", score);
    $("input:submit").attr('disabled', 'disabled');
    $("#question").fadeOut(2000, function () {
        closeQuestion();
    });
}


