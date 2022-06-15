/*
geel = true
rood = false
*/
let speler = true;


//leeg speelveld definieren en het speelveld instellen
let speelVeld = [
    {"11":null, "12":null, "13":null, "14":null, "15":null, "16":null, "17":null},
    {"21":null, "22":null, "23":null, "24":null, "25":null, "26":null, "27":null},
    {"31":null, "32":null, "33":null, "34":null, "35":null, "36":null, "37":null},
    {"41":null, "42":null, "43":null, "44":null, "45":null, "46":null, "47":null},
    {"51":null, "52":null, "53":null, "54":null, "55":null, "56":null, "57":null},
    {"61":null, "62":null, "63":null, "64":null, "65":null, "66":null, "67":null}
]


//functie om het speelveld leeg te maken
function speelVeldLegen(){
    for (rij in speelVeld){
        keys = Object.keys(speelVeld[rij])
        for (key in keys){
            document.getElementById(keys[key]).style.background = "white";
            speelVeld[rij][keys[key]] = null;
        }
    }
}

//speler veranderen
function veranderSpeler(){
    if (speler == true){speler = false}
    else {speler = true}
}

//functie om de laagste plek te vinden : kolom = index
function laagstePlekVinden(kolom){
    laagste = 0
    for (rij in speelVeld){
        if (speelVeld[rij][Object.keys(speelVeld[rij])[kolom]] != null){
            return laagste;}
        laagste += 1}
    return laagste;
}

//kleur een plek in op de gegeven kolom
function plekInkleuren(kolom){
    let laagste = laagstePlekVinden(kolom);
    if (laagste == 0){
        alert("Deze rij is vol")}
    let id = Object.keys(speelVeld[laagste-1])[kolom]
    speelVeld[laagste-1][id] = speler;
    kleur = (speler? "yellow" : "red");
    document.getElementById(id).style.background = kleur;
    veranderSpeler();
}

