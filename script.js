
// sde twee spelers en hun type+status
let speler1 = ["persoon",false]; // type , aanDeBeurt
let speler2 = ["persoon",false];

//stel gelijk speler 1 in als beginner
// speler 1 geel = true
// speler 2 rood = false
let speler = false; // <-- speler 2

//is speelbaar
let speelbaar = true

//gewonnen
let gewonnen = false


/* Wanneer er in het hoofdmenu een van de spelers gekozen wordt,
worden er enkele verandeeringen aangebracht via deze functie.
Het vakje wordt ingekleurd, de andere vakjes worden uitgegumd,
de soort speler wordt vastgesteld. */
function spelerInstellen(id,soortSpeler,nummerSpeler){
    //als speler 1 doorgegeveb aan de beurt is
    if (nummerSpeler == 1){
    document.getElementById('persoon1').style.background = "white";
    document.getElementById('random1').style.background = "white";  //kleur alle vakjes wit
    document.getElementById('normal1').style.background = "white";
    document.getElementById('hard1').style.background = "white";
    document.getElementById(id).style.background= "yellow";         //kleur het gekozen vakje geel
    speler1[0] = soortSpeler;  //stel de soortspeler vast 
    } else{
    document.getElementById('persoon2').style.background = "white";
    document.getElementById('random2').style.background = "white";  //kleur alle vakjes wit
    document.getElementById('normal2').style.background = "white";
    document.getElementById('hard2').style.background = "white";
    document.getElementById(id).style.background= "red";            //kleur het gekozen vakje geel
    speler2[0] = soortSpeler; //stel de soortspeler vast
    }
}

/* de confirm knop maakt het keuze menu onzichtbaar en het speelveld zichtbaar */
function confirm(){
    document.getElementById('inloggen').style.visibility = "hidden";    //menu weg
    document.getElementById('spelen').style.visibility = "visible";     //speelveld neerzetten
    veranderSpeler();   // <-- spelers omdraaien zodat speler 1 begint
    
}


/* Het speelveld dat gebruikt wordt, wordt ook in het programma bijgehouden.
Zo kan er makkelijk nagekeken worden. Maar ook kunnen de AI algoritmes
stappen vooruit overzien. */
let speelVeld = [
    {"11":null, "12":null, "13":null, "14":null, "15":null, "16":null, "17":null},
    {"21":null, "22":null, "23":null, "24":null, "25":null, "26":null, "27":null},
    {"31":null, "32":null, "33":null, "34":null, "35":null, "36":null, "37":null},  //elke vakje is standaard null
    {"41":null, "42":null, "43":null, "44":null, "45":null, "46":null, "47":null},  //speler 1 maakt vakjes true
    {"51":null, "52":null, "53":null, "54":null, "55":null, "56":null, "57":null},  //speler 2 maakt vakjes false
    {"61":null, "62":null, "63":null, "64":null, "65":null, "66":null, "67":null}
]


/* Als de reset knop aangeroepen is, wordt het speelveld weer uitgegumd.
Niet alleen het visuele speelveld in de applicatie wordt dan leeg gemaakt
maar ook deze kopie in dit bestand. */ 
function speelVeldLegen(){
    for (rij in speelVeld){ 
        keys = Object.keys(speelVeld[rij])      //voor elk vakje in elke rij (alle vakjes)
        for (key in keys){
            document.getElementById(keys[key]).style.background = "white";  //bolletjes kleur wordt wit e
            speelVeld[rij][keys[key]] = null;                                  //speelveld variabele op null
        }
    }
    document.getElementById("gewonnen").innerHTML = ""      //als er een gewonnen tekst stond: weghalen
    speelbaar = true;                                       //speelbaar weer aanzetten
    gewonnen = false;                                       //winnaar verwijderen
    if (speler1[1]){vakKeuze(speler1);}             //als speler 1 aan de beurt: begin beurt
    else {vakKeuze(speler2);}                           //anders speler 2 begin beurt

}

/* Na elke zet moet er veranderd worden van speler in het spel.
Ook in het visuele veld vindt er dan een verandering plaats.
de kleur rondom de speler wordt geel of rood (ligt aan de speler) */
function veranderSpeler(){
    if (speler == true){
        speler = false; //wijzig naar -> speler 2
        document.getElementById("player2").style.background = "red";    //achtergronden veranderen (ingekleurd rondje)
        document.getElementById("player1").style.background = "blue";   
        document.getElementById("player2").style.color = "black";       //telst kleuren veranderen
        document.getElementById("player1").style.color = "white";
        speler1[1] = false;     //aan de beurt statussen veranderen
        speler2[1] = true;  
        }
    else {speler = true; //wijzig naar -> speler 1
        document.getElementById("player1").style.background = "yellow";     //achtergronden veranderen
        document.getElementById("player2").style.background = "blue";
        document.getElementById("player1").style.color = "black";           //tekst kleuren veranderen
        document.getElementById("player2").style.color = "white";
        speler2[1] = false;     //aan de beurt statussen veranderen
        speler1[1] = true;      
        }
    if (speler1[1]){vakKeuze(speler1);} //speler die aan de beurt is, begin zijn beurt
    else {vakKeuze(speler2);}
}

/* functie die gebruikt word voor elke beurt. Op basis van de speel mannier
wordt de keuze van de zet bepaald. De door de computer ingevulde mogelijkheden 
bevatten een kleine vertraging (0,6 seconden) omdat ze anders te snel gaan om bij te houden
Door updates van het programma zijn de oneindige loops niet meer nodig maar omdat het blijft werken
blijven de fucnties toch in applicatie zitten om eventuele nieuwe errors te voorkomen.*/
function vakKeuze(speler){
    if (gewonnen == true){return;}  //stop als er is gewonnen
    if (!isNogSpeelbaar()){return;} //stop als veld vol zit
    speelbaar=false;    //zet standaard het spel op niet speelbaar om te voorkomen dat tegenstanders voor elkaar kiezen
    if (speler[1]){
        //wanneer handmatig is: gebeurt niks, speelbaar is weer aan. de speler kan een vakje aankruisen
        if (speler[0] == 'persoon'){
            speelbaar = true;
            return
        }
        if (speler[0] == 'random'){
            //plek inkleuren op een willekeurige kolom
            kolom = makkelijk();
            setTimeout(function(){speelbaar = true; //speelbaar wordt aangezet
                                    plekInkleuren(kolom);},     //kolom wordt willekeuris bepaald
                                    600);   //na 0,6 seconden
        }
        if (speler[0] == 'normal'){
            //plek inkleuren op de normal methode
            setTimeout(function(){speelbaar = true; //speelbaar wordt weer aangezet
                                kolom = normaal();  //kolom wordt bepaald op de normaal methode
                                plekInkleuren(kolom);}, //kolom wordt ingevuld
                                600);   // na 0.6 seconden 
        }
        if (speler[0] == 'hard'){
            //plek inkleuren op de hard methode
            setTimeout(function(){speelbaar = true;
                                kolom = hard(); //zet is bepaald op basis van de moeilijkste methode
                                plekInkleuren(kolom);}, //plek wordt ingekleurd
                                600);   //na 0,6 seconden

        }
    }
}

/* De makkelijke methode blijft oneindig loopen tot het een valide kolom heeft gevonden.
kolom wordt bepaald op basis van willekeurig kiezen. */
function makkelijk(){
    while (true){
        kolom = willekeurigKolom(); //kies een willekeurig kolom
        if (laagstePlekVinden(kolom,speelVeld) != 0){return kolom;} //als kolom geldig is return de kolom.
    }
}

/* De normaal methode blijft oneindig loopen totdat het een valide kolom heeft gevonden.
de kolom wordt bepaald op basis van het besteZet algoritme */
function normaal(){
    while (true){
        kolom = besteZet(speler,speelVeld); //kies besteZet
        if (laagstePlekVinden(kolom,speelVeld) != 0){return kolom;} //als valide is, return
    }

}

/* De moeiljkste modus blijft ook oneindig loopen tot het een valide kolom heeft gevonden.
de kolom wordt gekozen door het minimax algoritme.*/
function hard(){
    while (true){
        kolom = hoogsteKans();  //gekozen door een methode die op elke kolom het minimax algoritme aanstuurt
        if (laagstePlekVinden(kolom,speelVeld) != 0){return kolom;} //als plek valide is, return kolom
    }
        
}

/* functie die een willekeurige kolom terugstuurt. */
function willekeurigKolom(){
    kolommen = [0,1,2,3,4,5,6]; //ljist van alle kolommen
    kolommen.sort(() => Math.random() - 0.5);   //sorteer de lijst op willekeurige volgorde
    for (let kol; kol < 7; kol++ ){
        let kolom = kolommen[kol]; //bekijk de kolommen van links naar rechts
        if (laagstePlekVinden(kolom,speelVeld) != 0){return kolom;}     //als de kolom valide is, return de koloms
    }
    return Math.floor(Math.random() * 7) //anders return gewoon een van de kolommen om in de loop te belanden
}

/* functie die de beste zet bepaald dat de speler kan nemen (1 vooruit gekeken) 
parameters zijn speler en veld. Door updates van het programma zijn niet per se meer nodig*/
function besteZet(speler,veld){
    let spelers= [speler,!speler];  //voor de twee spelers (eerst de speler aan de beurt zelf)
    for (let get in [0,1]){
        let s = spelers[get];
        for (let kolom = 0; kolom < 7; kolom++){    //kijk elke kolom
            let kopie = JSON.parse(JSON.stringify(veld));
            if (laagstePlekVinden(kolom,veld) == 0){continue;}  //als de kolom valide is
            kopie = vulKolomIn(kopie,s,kolom);  //vul kolom in kopie van veld
            if (visueelGewonnen(s,kopie)){return kolom;}    //als speler wint : return dat kolom
        }  
    }
    return willekeurigKolom(); //als er geen winnaar komt, return een willekeurig kolom
}

/* De hoogste kans functie ropet op elke kolom de minimax fucntie aan,
Daarna kijkt het welke kolom het hoogste kans heeft om te winnen. */
function hoogsteKans(){
    let nuls = [];  //lijst met kolommen waar score nul uit komt
    let mins = [0,1,2,3,4,5,6]; // alle kolommen
    for (let kolom = 0;kolom<7;kolom++){    //voor elke kolom
        let getal = miniMax(3,speelVeld,kolom,speler,false);    //bereken de minimax waarde (-1,0,1)
        if ( getal == 1){return kolom;} //als de waarde 1 is (gewonnen): return de kolom
        if ( getal == 0) {nuls.push(kolom);}    //als de waarde 0 is (niemand wint): voeg het kolom toe aan lijst nuls
    }
    let lijst;
    if (nuls.length > 0){lijst = nuls;} //als er nullen zijn wordt daar een uit gekozen
    else {lijst = mins;}    //als speler hoe dan ook verliest, wordt daaruit gekozen
    return lijst[Math.floor(Math.random() * lijst.length)];
}


/* Het minimax algoritme staat in het rapport duidelijk omschreven. In grote lijnen zoekt het algoritme naar
een zet die de beste kans van winnen geeft. dit doet het algoritme door steeds een stap verder te kijken
in het spel en voor de tegenstander de laagste scoren te kiezen en voor de speler weer de optimale.
Het algoritme krijgt een aantal parameters mee
depth: zegt hoevel stappen er nog vooruit wordt gekeken: standaard 3
veld en kolom: geven het kopie van het veld die tot dan ingevuld is en het kolom die daarbij ingevuld moet worden.
s zegt de speler die het kolom gaat invullen
max geeft aan of de speler de score laag (mini) of hoog (max) wilt houden */
function miniMax(depth,veld,kolom,s,max){
    let kopie = JSON.parse(JSON.stringify(veld));
    if (laagstePlekVinden(kolom,kopie) == 0){return;} //als kolom vol zit, stuur terug
    kopie = vulKolomIn(kopie,s,kolom);  //vul het gegeven kolom in


    if (visueelGewonnen(speler,kopie)){return 1;} //als speler gewonnen: return 1
    if (visueelGewonnen(!speler,kopie)){return -1;}//als tegenstander gewonnen: return -1
    
    if (depth == 0){return 0;} //return 0 als niemand wint

    if (max){
        let hoogst = -1;
        for (let kol =0;kol<7;kol++){   //voor elk kolom
            let getal = miniMax(depth-1,kopie,kol,!s,!max)  //getal van de kolom (gaat weer een stap verder in het spel)
            if (getal > hoogst){hoogst = getal;} //als hoger dan hoogst: nieuwe hoogst
        }
        return hoogst; //return de laagste uitkomst
    }

    if (!max){
        let laagst = 1;
        for (let kol =0;kol<7;kol++){   //voor elk kolom
            let getal = miniMax(depth-1,kopie,kol,!s,!max)  //getal van de kolom (gaat een stap verder in het spel)
            if (getal < laagst){laagst = getal;}    //als lager dan laagst: nieuwe laagst
        }
        return laagst; //return de laagste uitkomst
    }

}

/* de functie om een kolom in te vullen visueel gezien.
parameters:
veld: het veld (kopie) waain er ingevul moet worden
speler: welke speler invult
kolom: in welk vakje er ingevuld moet worden
returnt: het nieuwe (ingevulde) veld  */
function vulKolomIn(veld,speler,kolom){
    if (speelbaar == false || gewonnen == true){return;} //als niet speelbaar is: stuur terug
    let laagste = laagstePlekVinden(kolom,veld);   //pak laagste rij
    let id = Object.keys(veld[laagste-1])[kolom];   //kies welke plekje 
    veld[laagste-1][id] = speler;       //vul plekje in
    return veld; //stuur het nieuwe vel terug
}

/*fucntie die kijkt of een speler eventueel gewonnen zou hebben.
op basis van het veld dat meegegeven word (kopie) en de speler die gewonnen zou moeten hebben */
function visueelGewonnen(speler,veld){
    if (HorizontaalControleren(speler,true,veld) == true || //kijk voor elke richting van 4 op een rij of er gewonnen is
    VerticaalControleren(speler,true,veld) == true ||       //geef visueel=true mee zodat er niet meteen een winnaar bekend gemaakt wordt
    schuinRechtsControleren(speler,true,veld) == true ||    
    schuinLinksControleren(speler,true,veld) == true){return true;}else{return false;} //als er ergens gewonnen is: return true anders false
}


//functie om de laagste plek te vinden : kolom = index , veld is kopie van veld
function laagstePlekVinden(kolom,veld){
    laagste = 0 //laagste is de bovenste
    for (rij in veld){      //voor elke rij van het veld
        if (veld[rij][Object.keys(veld[rij])[kolom]] != null){ //als het kolom van die rij al bezet is
            return laagste;}        //stuur de laagste terug
        laagste += 1}       //anders laagste is een lager
    return laagste;     //stuur uiteindelijk de laagste terug
}

/* functie om een plek aan te kruisen, visueel en in het programma
parameter: het kolom die ingevuld moet worden */
function plekInkleuren(kolom){
    if (speelbaar == false || gewonnen == true){return} //als spel is getsopt: stuur terug
    let laagste = laagstePlekVinden(kolom,speelVeld);   
    if (laagste == 0){
        alert("Deze rij is vol");}                      //geef waarschuwing als rij vol zit
    let id = Object.keys(speelVeld[laagste-1])[kolom]
    speelVeld[laagste-1][id] = speler;                  //vul het programma spel in met bool waarde van speler (true/false)
    kleur = (speler? "yellow" : "red");
    document.getElementById(id).style.background = kleur;   //vul het visuele spel in met de kleur van de speler
    controleren(speler);                                    //controlleer gelijk of er gewonnen is
    veranderSpeler();                                       //verander van speler: de andere speler is aan de beurt
}       



/*
Functies voor het controleren van het speelveld
stappen:
    controleer de horizontale rijen
    controleer de verticale kolommen
    controleer de schuin naar-rechts-aflopende rijen
    controleer de schuin naar-links-aflopende rijen

parameters: de speler die gewonne zou moeten hebben, of het virtueel is/of niet, het veld waarin wordt nagekeken
return true als visueel wint, vult de winnende vakjes in als echt wint.
*/

//controleren van de horizontale rijen
function HorizontaalControleren(speler,virtueel,speelVeld){
    for (rij in speelVeld){ //kijk voor elke rij
        for (let vakje = 0; vakje < 4; vakje++){    //voor alle vakjes van 1 tot en met 4
            vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
            vakjeTwee = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+1]];       //zijn de 3 opeenvolgende vakjes hetzelfde
            vakjeDrie = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+2]];
            vakjeVier = speelVeld[rij][Object.keys(speelVeld[rij])[vakje+3]]
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee ==     
                vakjeDrie && vakjeDrie == vakjeVier)                                //dan gewonnen
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
     for (let rij = 0; rij < 3; rij++){ //kijk vor rij 1 tot en met 3
        for (let vakje = 0; vakje < 7; vakje++){            //voor elk vakje
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];          //zijn de drie onderstaande vakjes hetzelfde
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)
                { if (virtueel){return true;}                                                           //dan gewonnen
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
    for (let rij = 0; rij < 3; rij++){      //voor rij 1 tot en met 3
        for (let vakje = 0; vakje < 4; vakje ++){   //voor vakje 1 tot en met 4
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];          
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje+1]];
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje+2]];       //alle 3 volgende vakjes schuin rechts hetzelfde
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje+3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)                                            //dan gewonnen
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
    for (let rij = 0; rij < 3; rij++){      //voor rijen 1 tot en met 3
        for (let vakje = 3; vakje < 7; vakje ++){           //voor vakjes 3 tot en met 7
                vakjeEen = speelVeld[rij][Object.keys(speelVeld[rij])[vakje]];
                vakjeTwee = speelVeld[rij+1][Object.keys(speelVeld[rij+1])[vakje-1]];       //alle 3 volgende vakjes schuin links hetzelfde
                vakjeDrie = speelVeld[rij+2][Object.keys(speelVeld[rij+2])[vakje-2]];
                vakjeVier = speelVeld[rij+3][Object.keys(speelVeld[rij+3])[vakje-3]];
            if (vakjeEen == speler && vakjeEen == vakjeTwee && vakjeTwee == 
                vakjeDrie && vakjeDrie == vakjeVier)                                    //dan gewonnen
                { if (virtueel){return true;}
                    inkleuren(Object.keys(speelVeld[rij])[vakje],Object.keys(speelVeld[rij+1])[vakje-1],
                    Object.keys(speelVeld[rij+2])[vakje-2],Object.keys(speelVeld[rij+3])[vakje-3],
                    speler);
                return
            }
        }
    }
}

/* functie die vier vakjes inkleurt in het spel als er gewonnen is 
parameters zijn de id's van de 4 vakjes */
function inkleuren(een,twee,drie,vier,speler){
    for (rij in speelVeld){     
        for (vakje in speelVeld[rij]){      //kijk voor elk vakje
            if (vakje == een || vakje == twee || vakje == drie || vakje == vier)
            {                                                                      //als het vakje hetzelfde is als een van de vakjes
                if (speler == false){
                    document.getElementById(vakje).style.background = "rgb(57, 4, 4)";
                }                                                                             //kleur het in naar behorende kleur
                if (speler == true){
                    document.getElementById(vakje).style.background = "rgb(63, 63, 7)";
                }
                gewonnenBericht(speler)         //geef een bericht dat de speler gewonnen heeft
            }
        }
    }
}

/* algemeen controleren functie, roept alle vier de controlleer richtingen aan */
function controleren(speler){
    HorizontaalControleren(speler,false,speelVeld);
    VerticaalControleren(speler,false,speelVeld);
    schuinRechtsControleren(speler,false,speelVeld);
    schuinLinksControleren(speler,false,speelVeld);
}

//functie voor een gewonnen bericht van speler
function gewonnenBericht(speler){
    kleur = (speler? "yellow":"red");     //kies de juiste kleur van de speler
    nummer = (speler? "Speler 1": "Speler 2");          //kies het speler nummer
    document.getElementById("gewonnen").innerHTML = nummer + " heeft gewonnen!";    //vul de tekst in waar speler +nummer wint
    document.getElementById("gewonnen").style.color = kleur;    //maak de tekst kleur behorend
    gewonnen = true;
}

//is het speelbaar
function isNogSpeelbaar(){
    for (let kolom = 0;kolom<7;kolom++){        //kijk voor alle kolommen
        if (laagstePlekVinden(kolom,speelVeld) != 0){return true;}      //of het kolom niet vol zit, return true als het niet vol zit
    } return false;     //return false als hele veld vol zit
}   
