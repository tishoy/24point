let a, b, c, d;
// a = Math.floor(Math.random() * 12);
// b = Math.floor(Math.random() * 12);
// c = Math.floor(Math.random() * 12);
// d = Math.floor(Math.random() * 12);

let max_num = 12;

let nums = [];
for (var i = 1; i <= max_num; i++) {
    nums.push(i);
}


function calculate(num1, num2, sign) {
    switch (sign) {
        case 0: return num1 + num2;
        case 1: return num1 - num2;
        case 2: return num1 * num2;
        case 3: return num1 / num2;
    }
}

function getSign(sign_num) {
    switch (sign_num) {
        case 0: return "+";
        case 1: return "-";
        case 2: return "*";
        case 3: return "/";
    }
}

let calculate_num = [];

let calculate_process = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2]];

var fs = require('fs');

var str = "";

for (a = 1; a <= max_num; a++) {
    for (b = 1; b <= max_num; b++) {
        for (c = 1; c <= max_num; c++) {
            for (d = 1; d <= max_num; d++) {
                calculate_num = [a, b, c, d]
                for (var i = 0; i < 3; i++) {
                    for (var sign1 = 0; sign1 < 4; sign1++) {
                        var save1 = calculate(calculate_num[0], calculate_num[calculate_process[i][1]], sign1);
                        for (var sign2 = 0; sign2 < 4; sign2++) {
                            var save2 = calculate(calculate_num[calculate_process[i][2]], calculate_num[calculate_process[i][3]], sign2);
                            for (var sign3 = 0; sign3 < 4; sign3++) {
                                var result = calculate(save1, save2, sign3);
                                if (Math.abs(result) === 24) {
                                    console.log(a, b, c, d, i, getSign(sign1), getSign(sign2), getSign(sign3), true);
                                    str += a + "\t" + b + "\t" + c + "\t" + d + "\t" + i + "\t" + getSign(sign1) + getSign(sign2) + getSign(sign3) + "\r\n";

                                    continue;
                                }

                            }
                        }
                    }
                    // console.log(a, b, c, d, false);
                }
            }
        }
    }
}
console.log(str);
fs.writeFile("./make24.txt", str, function (err) {
    if (err) {
        console.log("down fail");
    }
    console.log("down success");
});

// let test_nums = [];
// for (var i = 0; i < 4; i++) {

// }