const info = localStorage.getItem("info");
let infor = new Array();
let date = new Date();
let month = String(date.getMonth()+1);
let day = String(date.getDate());
if (day <= 9) day = "0" + day;

 //画面サイズに合わせてデザインを調整
window.addEventListener("load", () => {
    const width = window.innerWidth;
    const size = document.getElementById("middle").style;
    if (700 < width) {
        size.marginLeft = "50px";
        if (1400 < width) {
            size.maxWidth = width/3*1.4 + "px";
        } else {
            size.maxWidth = width/3*2 + "px";
        }
    }

    //ショートカットの処理など
    document.getElementById("date").innerText = "日付: " + month + "月" + day + "日  >>  " + month + day;
    try {
        let c = JSON.parse(info);
        document.getElementById("number").value = c[1];
        document.getElementById("text").value = c[2];
        if (c[0] == true) return document.getElementById("middle").innerHTML = document.getElementById("alert").outerHTML;
    } catch (e) {}
    document.getElementById("short").checked = true;

     //クリック処理
    document.getElementById("decision").addEventListener("click", () => {
        let a  = xss(document.getElementById("number").value);
        let b = xss(document.getElementById("text").value);
        //XSS対策・正常か確認を入れる
        if (a != "0" && a.charAt(0) == "0") {
            while (true) {
                a = a.slice(1);
                if (a.charAt(0) != 0) {
                    break;
                }
            }
        }
        if (a.length < 1) {
            while (true) {
                a = xss(prompt("正しい出席番号を入力してください。"));
                if (a == null) {
                    return;
                } else if (0 < a) {
                    break;
                }
            }
        }
        if (b.length < 3) {
            while (true) {
                b = xss(prompt("正しい氏名を入力してください。(苗字含)"));
                if (b == null) {
                    return;
                } else if (2 < b.length) {
                    break;
                }
            }
        }
        //XSS対策
        if (10 < a.length) {
            alert("XSS対策に引っ掛かりました。データを削除します。");
            localStorage.clear();
            return;
        }
        if (10 < b.length) {
            alert("XSS対策に引っ掛かりました。データを削除します。");
            localStorage.clear();
            return;
        }
        if (!(isNaN(b))) {
            alert("XSS対策に引っ掛かりました。データを削除します。");
            localStorage.clear();
            return;
        }
        infor[0] = document.getElementById("short").checked;
        infor[1] = a;
        infor[2] = b;
        localStorage.setItem("info", JSON.stringify(infor));
        autofill(a, b);
    });
 });

window.addEventListener("load", () => {
    document.getElementById("close").addEventListener("click", () => {
        let d = JSON.parse(info);
        d[0] = false;
        localStorage.setItem("info", JSON.stringify(d));
        return location.href = location.pathname;
    });
});

const xss = str => {
    if (String(str).match("/" || /&|<|>|'|"/g)) {
        alert("XSS対策に引っ掛かりました。");
        localStorage.clear();
        location.href = location.pathname;
        return "shine231;../";
    }
    return str;
}

 //ページ移動の処理関数
const page = p => {
    if (p != "main") {
        location.href="#" + p;
        document.getElementById("middle").innerHTML = document.getElementById(p).outerHTML;
    } else {
        return location.href = location.pathname;
    }
}

const form = () => {
    alert("削除済");
}

const autofill = (x, y) => {
    let name;
    if (x.length == 1) {
        name = "0" + x + "+" + y;
    } else {
        name = x + "+" + y;
    }
    console.log(month + day, name);
    alert("削除済");
}
