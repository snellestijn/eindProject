/*
speler 1 geel = true
speler 2 rood = false
*/

// spelers instellen
let speler1 = ["persoon",false]; // type : aanDeBeurt
let speler2 = ["persoon",false];

//stel gelijk speler 1 in als beginner
let speler = false; // <-- speler 2

//is speelbaar
let speelbaar = true

//gewonnen
let gewonnen = false



function spelerInstellen(id,soortSpeler,nummerSpeler){
    if (nummerSpeler == 1){
    document.getElementById('persoon1').style.background = "white";
    document.getElementById('random1').style.background = "white";
    document.getElementById('normal1').style.background = "white";
    document.getElementById('hard1').style.background = "white";
    document.getElementById(id).style.background= "yellow";
    speler1[0] = soortSpeler;
    } else{
    document.getElementById('persoon2').style.background = "white";
    document.getElementById('random2').style.background = "white";
    document.getElementById('normal2').style.background = "white";
    document.getElementById('hard2').style.background = "white";
    document.getElementById(id).style.background= "red";
    speler2[0] = soortSpeler;
    }
}
function confirm(){
    document.getElementById('inloggen').style.visibility = "hidden";
    document.getElementById('spelen').style.visibility = "visible";
    veranderSpeler();   // <-- spelers omdraaien / eerste beurt
    
}


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
    gewonnen = false;
}

//speler veranderen
function veranderSpeler(){
    if (speler == true){
        speler = false; //wijzig naar -> speler 2
        document.getElementById("player2").style.background = "red";
        document.getElementById("player1").style.background = "blue";
        document.getElementById("player2").style.color = "black";
        document.getElementById("player1").style.color = "white";
        speler1[1] = false;
        speler2[1] = true;
        }
    else {speler = true; //wijzig naar -> speler 1
        document.getElementById("player1").style.background = "yellow";
        document.getElementById("player2").style.background = "blue";
        document.getElementById("player1").style.color = "black";
        document.getElementById("player2").style.color = "white";
        speler2[1] = false;
        speler1[1] = true;
        }
    if (speler1[1]){vakKeuze(speler1);}
    else {vakKeuze(speler2);}
}


/*  functies voor de algoritmes

easy: computer kiest willekeurig het volgende vakje.
normal: computer probeert speler te blokkeren.
hard: computer probeert tactieken toe te passen.

-volledige uitleg is te lezen in de README file

*/

function vakKeuze(speler){
    speelbaar=false;
    if (speler[1]){
        //wanneer handmatig is: gebeurt niks.
        if (speler[0] == 'persoon'){
            speelbaar = true;
            return
        }
        if (speler[0] == 'random'){
            //plek inkleuren op een willekeurige kolom
            kolom = willekeurigKolom();
            setTimeout(function(){speelbaar = true;plekInkleuren(kolom);},600);
            
        }
        if (speler[0] == 'normal'){
            //plek inkleuren op de normal methode
            
            setTimeout(function(){speelbaar = true; kolom = normaal(); plekInkleuren(kolom);},600);
            
        }
        if (speler[0] == 'hard'){
            //plek inkleuren op de hard methode
        }
    }
}

function willekeurigKolom(){
    kolommen = [0,1,2,3,4,5,6];
    kolommen.sort(() => Math.random() - 0.5);
    for (let kol; kol < 7; kol++ ){
        let kolom = kolommen[kol];
        if (laagstePlekVinden(kolom) != 0){return kolom;}
    }
    return Math.floor(Math.random() * 7)
}



function normaal(){
    spelers = [!speler,speler];
    for (let get in [0,1]){
        let s = spelers[get];
        for (let kolom = 0; kolom < 7; kolom++){
            let kopie = JSON.parse(JSON.stringify(speelVeld));
            if (laagstePlekVinden(kolom) == 0){continue;}
            kopie = vulKolomIn(kopie,s,kolom);
            if (visueelGewonnen(s,kopie)){return kolom;}
        }
    }
    //anders return een willekeurig kolom
    return willekeurigKolom();

}











function vulKolomIn(veld,speler,kolom){
    if (speelbaar == false || gewonnen == true){return;}
    let laagste = laagstePlekVinden(kolom);
    let id = Object.keys(veld[laagste-1])[kolom];
    veld[laagste-1][id] = speler;
    return veld;
}
function visueelGewonnen(speler,veld){
    if (HorizontaalControleren(speler,true,veld) == true ||
    VerticaalControleren(speler,true,veld) == true ||
    schuinRechtsControleren(speler,true,veld) == true ||
    schuinLinksControleren(speler,true,veld) == true){return true;}else{return false;}
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
    if (speelbaar == false || gewonnen == true){return}
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
function HorizontaalControleren(speler,virtueel,speelVeld){
    for (rij in speelVeld){
        for (let vakje = 0; vakje < 4; vakje++){
            vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
            vakjeTwee = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+1]];
            vakjeDrie = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+2]];
            vakjeVier = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+3]]
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                { if (virtueel){return true;}
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij])[vakje+1],
                    Object.keys(speelVeld[rij])[vakje+2],Object.keys(speelVeld[rij])[vakje+3],
                    speler);
                return
            }
        }
    }
}

//controleren van verticale kolommen
function VerticaalControleren(speler,virtueel,speelVeld){
     for (let rij = 0; rij < 3; rij++){
        for (let vakje = 0; vakje < 7; vakje++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                { if (virtueel){return true;}
                inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje],
                    Object.keys(speelVeld[rij+2])[vakje],Object.keys(speelVeld[rij+3])[vakje],
                    speler);
                return
            }
        }
     }
}

//controleren van schuin rechts aflopende mogelijkheden
function schuinRechtsControleren(speler,virtueel,speelVeld){
    for (let rij = 0; rij < 3; rij++){
        for (let vakje = 0; vakje < 4; vakje ++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje+1]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje+2]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje+3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                { if (virtueel){return true;}
                    inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje+1],
                    Object.keys(speelVeld[rij+2])[vakje+2],Object.keys(speelVeld[rij+3])[vakje+3],
                    speler);
                return
            }
        }
    }
}

//controleren van schuin links aflopende mogelijkheden
function schuinLinksControleren(speler,virtueel,speelVeld){
    for (let rij = 0; rij < 3; rij++){
        for (let vakje = 3; vakje < 7; vakje ++){
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje-1]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje-2]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje-3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                { if (virtueel){return true;}
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
    HorizontaalControleren(speler,false,speelVeld);
    VerticaalControleren(speler,false,speelVeld);
    schuinRechtsControleren(speler,false,speelVeld);
    schuinLinksControleren(speler,false,speelVeld);
}

//functie voor een gewonnen bericht
function gewonnenBericht(speler){
    kleur = (speler? "yellow":"red");
    nummer = (speler? "Speler 1": "Speler 2");
    document.getElementById("gewonnen").innerHTML = nummer + " heeft gewonnen!";
    document.getElementById("gewonnen").style.color = kleur;
    gewonnen = true;
}


