speler = true
kolommen = [0,1,2,3,4,5,6]
let speelVeld = [
    {"11":null, "12":null, "13":null, "14":null, "15":null, "16":null, "17":null},
    {"21":null, "22":null, "23":null, "24":null, "25":null, "26":null, "27":null},
    {"31":null, "32":null, "33":null, "34":null, "35":null, "36":null, "37":null},
    {"41":null, "42":null, "43":null, "44":null, "45":null, "46":null, "47":null},
    {"51":null, "52":null, "53":null, "54":null, "55":null, "56":null, "57":null},
    {"61":true, "62":true, "63":true, "64":null, "65":null, "66":null, "67":null}
]

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

arr = [0,1,2,3,4]
shuffle(arr);
console.log(arr);