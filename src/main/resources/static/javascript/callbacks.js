var data = '[{"question":"Das Fenster ist zu weit offen", "isCorrect":"true"},'
             + '{"question":"Die Tür is tkapput", "isCorrect":"false"},'
             + '{"question":"Das geht nicht mehr", "isCorrect":"false"}]';

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
    showScore(score.current());
});

function showScore(result) {
    $("#score").text = result;
}

function loadData(){
    var valueRiskId = $(this).attr("value");
    var pos = $(this).position();
 $.ajax({
        url: "/questions/" + valueRiskId,
        data:data,
        success: function (d){
            data = d;
            //alert(d);
        },
        error: function (){
            alert("ERROR");
        }
    }).done(function() {
        generateForm(pos);
      });
}

function generateForm(pos) {
    //alert(pos);
    //TESTDATA
    //var json = JSON.parse(data);
    var json = data;
    var riskLength = json.length;
    $("#question").remove();


    // create form
    var f = document.createElement("form");
    //f.setAttribute('method',"post");
    f.setAttribute('action',"javascript:evaluateCheckbox()");

    var answerDiv = document.createElement("div"); //input element, text
    answerDiv.style.position = "absolute";
    answerDiv.style.left = (pos.left+20)+"px";
    answerDiv.style.top = (pos.top)+"px";
    answerDiv.setAttribute("id","question");
    answerDiv.appendChild(f);



    for (var i = 0; i < riskLength; i++){
        var answerContainer = document.createElement("div");
        // itterate json
        var cbox = document.createElement("input"); //input element, text
        cbox.setAttribute('type',"checkbox");
        cbox.setAttribute('name',"username");
        ///cbox.checked = json.risk[i].isCorrect === "true" ;
        cbox.setAttribute('value', json[i].isCorrect);

        var text = document.createElement("span"); //input element, text
        text.innerHTML = json[i].question;

        answerContainer.appendChild(cbox);
        answerContainer.appendChild(text);
        f.appendChild(answerContainer);
     //   f.appendChild(document.createElement("br"));
    }

    // submit
    var submit = document.createElement("input"); //input element, Submit button
    submit.setAttribute('type',"submit");
    submit.setAttribute('value',"submit");
    //submit.on("click",evaluateCheckbox);


    f.appendChild(submit);
    document.getElementsByTagName('body')[0].appendChild(answerDiv);


    $("#question").draggable();
    //$("input:checkbox").click(evaluateCheckbox);
}

function evaluateCheckbox(){
    var chkArray = $("input:checkbox");
    var score = 0;
    for(var i=0;i < chkArray.length; i++){
        var isTrue = chkArray[i].value === "true" && chkArray[i].checked || (chkArray[i].value === "false" && !chkArray[i].checked);
        var parent = $(chkArray[i]).parent();
        if(isTrue){
            parent.attr("style","background:green");
            score += 1;
        }
        else{
            parent.attr("style","background:red");
        }
    }
    $( document ).trigger( "scoreChange",  score);
    score = 0;
    $("input:submit").attr('disabled', 'disabled');
    $("#question").fadeOut(2000, function(){ $(this).remove(); });
}

$(document).ready(function(){
    $("area").click(loadData);
});


