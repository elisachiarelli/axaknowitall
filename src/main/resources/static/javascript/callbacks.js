var data = '{'
             + '"risk":[{"Answer":"Das Fenster ist zu weit offen", "isCorrect":"true"},'
             + '{"Answer":"Die Tür is tkapput", "isCorrect":"false"},'
             + '{"Answer":"Das geht nicht mehr", "isCorrect":"false"}]'
             + '}';

function loadData(){
/*
 $.ajax({
        url: "localhost:8080/questions/1",
        success: function (data){
            alert(data);
        },
        error: function (){
            alert("ERROR");
        }
    });*/
}

function generateForm() {
    loadData();
    var json = JSON.parse(data);
    var riskLength = json.risk.length;
    $("#question").remove();


    // create form
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"submit to the server");

    var answerDiv = document.createElement("div"); //input element, text
    answerDiv.setAttribute("id","question");
    answerDiv.appendChild(f);



    for (var i = 0; i < riskLength; i++){
        var answerContainer = document.createElement("div");
        // itterate json
        var cbox = document.createElement("input"); //input element, text
        cbox.setAttribute('type',"checkbox");
        cbox.setAttribute('name',"username");
        ///cbox.checked = json.risk[i].isCorrect === "true" ;
        cbox.setAttribute('value', json.risk[i].isCorrect);

        var text = document.createElement("span"); //input element, text
        text.innerHTML = json.risk[i].Answer;

        answerContainer.appendChild(cbox);
        answerContainer.appendChild(text);
        f.appendChild(answerContainer);
        f.appendChild(document.createElement("br"));
    }

    // submit
    var submit = document.createElement("input"); //input element, Submit button
    submit.setAttribute('type',"submit");
    submit.setAttribute('value',"Submit");


    f.appendChild(submit);
    document.getElementsByTagName('body')[0].appendChild(answerDiv);


    $("#question").draggable();
    $("input:checkbox").click(evaluateCheckbox);
}

function evaluateCheckbox(){
    var isTrue = $(this).val() === "true";
    var parent = $(this).parent();
    if(isTrue){
        parent.attr("style","background:green");
    }
    else{
        parent.attr("style","background:red");
    }
}

$(document).ready(function(){
    $("area").click(generateForm);
});


