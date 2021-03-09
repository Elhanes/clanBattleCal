var input_col = document.getElementById("input_col")
var name_arr = ["A", "B", "C", "D", "E"]
var id_arr = ["1", "2", "3", "4", "5"]
var state = false

function add_click() {
    var cnt = input_col.childElementCount;
    console.log("입력 개체수 : " + cnt);
    if (cnt + 1 > 5) {
        alert("6명 이상의 공격자를 설정할 수 없습니다.");
    }
    else
    {
        var div = input_col.children[0].cloneNode(true);
        div.getElementsByTagName('span')[0].innerHTML = name_arr[cnt]
        div.getElementsByTagName('input')[0].id = id_arr[cnt]
        console.log(div)
        input_col.appendChild(div);
    }
}

function del_click() {
    var cnt = input_col.childElementCount;
    console.log("입력 개체수 : " + cnt);
    if (cnt - 1 < 2){
        alert("2명 미만의 공격자를 설정할 수 없습니다.");
    }
    else{
        input_col.removeChild(input_col.lastChild);
    }
}

function cal_click() {
    if (state == false){
        state = true;
        document.getElementById("cal_btn").innerHTML = "되돌리기";
        document.getElementById("add_btn").disabled = "disabled";
        document.getElementById("del_btn").disabled = "disabled";
        var cnt = input_col.childElementCount;
        var boss_hp = Number(document.getElementById("boss_hp").value);
        var players = new Array();
        var sum_players = 0;

        for(var  i = 0; i < cnt; i++){
            players[i] = Number(input_col.children[i].getElementsByTagName('input')[0].value)
            sum_players += Number(input_col.children[i].getElementsByTagName('input')[0].value)
        }

        if(boss_hp - sum_players > 0){
            alert("보스가 잡히지 않습니다.")
        }
        else
        {
            for(var i = 0; i < cnt; i++){
                var last_player = players[i];
                var else_player = 0;
                for (var j = 0; j < cnt; j++){
                    if (i != j){
                        else_player += players[j];
                    }
                }
                var score = ((else_player + last_player - boss_hp) / last_player ) * 90 + 20;
                if(Math.ceil(score) > 90) {
                    score = 90;
                }
                input_col.children[i].getElementsByTagName('input')[0].value = Math.ceil(score) + "초";
            }
        }

        document.getElementById("boss_hp").disabled = true;
        for(var i = 0; i < cnt; i++){
            input_col.children[i].getElementsByTagName('input')[0].disabled = true;
        }

    }
    else{
        state = false
        var cnt = input_col.childElementCount;
        document.getElementById("cal_btn").innerHTML = "계산";
        document.getElementById("add_btn").disabled = false;
        document.getElementById("del_btn").disabled = false;
        document.getElementById("boss_hp").disabled = false;
        document.getElementById("boss_hp").value = null;
        for(var i = 0; i < cnt; i++){
            input_col.children[i].getElementsByTagName('input')[0].disabled = false;
            input_col.children[i].getElementsByTagName('input')[0].value = null;
        }
    }
}