/*
speler 1 geel = true
speler 2 rood = false
*/
//stel gelijk speler 1 in als beginner
let speler = false; // <-- speler 2
veranderSpeler();   // <-- spelers omdraaien


//is speelbaar
speelbaar = true;

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
    document.getElementById("gewonnen").innerHTML = ""
    speelbaar = true;
}

//speler veranderen
function veranderSpeler(){
    if (speler == true){
        speler = false; //wijzig naar -> speler 2
        document.getElementById("player2").style.background = "red";
        document.getElementById("player1").style.background = "blue";
        document.getElementById("player2").style.color = "black";
        document.getElementById("player1").style.color = "white";
        }
    else {speler = true; //wijzig naar -> speler 1
        document.getElementById("player1").style.background = "yellow";
        document.getElementById("player2").style.background = "blue";
        document.getElementById("player1").style.color = "black";
        document.getElementById("player2").style.color = "white";
        }
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
    if (speelbaar == false){return}
    let laagste = laagstePlekVinden(kolom);
    if (laagste == 0){
        alert("Deze rij is vol");}
    let id = Object.keys(speelVeld[laagste-1])[kolom]
    speelVeld[laagste-1][id] = speler;
    kleur = (speler? "yellow" : "red");
    document.getElementById(id).style.background = kleur;
    controleren(speler);
    veranderSpeler();
}




/*
Functies voor het controleren van het speelveld
stappen:
    controleer de horizontale rijen
    controleer de verticale kolommen
    controleer de schuin naar-rechts-aflopende rijen
    controleer de schuin naar-links-aflopende rijen
*/

//controleren van de horizontale rijen
function HorizontaalControleren(speler){
    for (rij in speelVeld){
        for (let vakje = 0; vakje < 4; vakje++){
            vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
            vakjeTwee = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+1]];
            vakjeDrie = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+2]];
            vakjeVier = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+3]]
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                {
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij])[vakje+1],
                    Object.keys(speelVeld[rij])[vakje+2],Object.keys(speelVeld[rij])[vakje+3],
                    speler);
                return
            }
        }
    }
}

//controleren van verticale kolommen
function VerticaalControleren(speler){
     for (let rij = 0; rij < 3; rij++){
        for (let vakje = 0; vakje < 7; vakje++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                {
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje],
                    Object.keys(speelVeld[rij+2])[vakje],Object.keys(speelVeld[rij+3])[vakje],
                    speler);
                return
            }
        }
     }
}

//controleren van schuin rechts aflopende mogelijkheden
function schuinRechtsControleren(speler){
    for (let rij = 0; rij < 3; rij++){
        for (let vakje = 0; vakje < 4; vakje ++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje+1]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje+2]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje+3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                {
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje+1],
                    Object.keys(speelVeld[rij+2])[vakje+2],Object.keys(speelVeld[rij+3])[vakje+3],
                    speler);
                return
            }
        }
    }
}

//controleren van schuin links aflopende mogelijkheden
function schuinLinksControleren(speler){
    for (let rij = 0; rij < 3; rij++){
        for (let vakje = 3; vakje < 7; vakje ++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje-1]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje-2]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje-3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                {
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje-1],
                    Object.keys(speelVeld[rij+2])[vakje-2],Object.keys(speelVeld[rij+3])[vakje-3],
                    speler);
                return
            }
        }
    }
}

//fucntie om vier vakjes in te kleuren
function inkleuren(een,twee,drie,vier,speler){
    for (rij in speelVeld){
        for (vakje in speelVeld[rij]){
            if (vakje == een || vakje == twee || vakje == drie || vakje == vier)
            {
                if (speler == false){
                    document.getElementById(vakje).style.background = "rgb(57, 4, 4)";
                }
                if (speler == true){
                    document.getElementById(vakje).style.background = "rgb(63, 63, 7)";
                }
                gewonnenBericht(speler)
            }
        }
    }
}

//algemeen controleren functie
function controleren(speler){
    HorizontaalControleren(speler);
    VerticaalControleren(speler);
    schuinRechtsControleren(speler);
    schuinLinksControleren(speler);
}

//functie voor een gewonnen bericht
function gewonnenBericht(speler){
    kleur = (speler? "yellow":"red");
    nummer = (speler? "Speler 1": "Speler 2");
    document.getElementById("gewonnen").innerHTML = nummer + " heeft gewonnen!";
    document.getElementById("gewonnen").style.color = kleur;
    speelbaar = false;
}

