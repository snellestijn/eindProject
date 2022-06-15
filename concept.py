#een veld van 7x 6
"""
  1 2 3 4 5 6 7 
1 * * * * * * *
2 * * * * * * *
3 * * * * * * *
4 * * * * * * *
5 * * * * * * *
6 * * * * * * *

"""
#een python list versie van het veld
speelVeld = [
    [None,None,None,None,None,None,None],
    [None,None,None,None,None,None,None],
    [None,None,None,None,None,None,None],
    [None,None,None,None,None,None,None],
    [None,None,None,None,None,None,None],
    [None,None,None,None,None,None,None],
]
#spelers 1 = True
#speler 2 = False

#druk het speelveld af in de Terminal
def speelVeldAfdrukken():
    for row in speelVeld:
        print(row)

#vind de laagste plek dat een getal kan bereiken
def laagstePlek(positie):
    rij = 0
    while rij < len(speelVeld):
        if speelVeld[rij][positie] != None:
            return (rij-1)
        rij += 1
    return 5
            
#voer een kolom in met een gegeven speler
def invoeren(kolom,speler):
    speelVeld[laagstePlek(kolom)][kolom] = speler

        

def controlleerRechts(rij,kolom,speler):
    for i in range(1,4):
        if speelVeld[rij][kolom+i] != speler:
            return False
    return True

def controlleerOnder(rij,kolom,speler):
    for i in range(1,4):
        if speelVeld[rij+1][kolom] != speler:
            return False
    return True

def schuinRechtsOnder(rij,kolom,speler):
    for i in range(1,4):
        if speelVeld[rij+i][kolom+i] != speler:
            return False
    return True

def schuinLinksOnder(rij,kolom,speler):
    for i in range(1,4):
        if speelVeld[rij+1][kolom-i] != speler:
            return False
    return True


def winnaarZoeken():
    for speler in True,False:
        for rij in range(len(speelVeld)):
            for kolom in range(len(speelVeld[rij])):
                if kolom <= 3:
                    if controlleerRechts(rij,kolom,speler):
                        return "gevonden"
                if rij <= 2:
                    if controlleerOnder(rij,kolom,speler):
                        return "gevonden"
                if kolom <= 3 and rij <= 2:
                    if schuinRechtsOnder(rij,kolom,speler):
                        return "gevonden"
                if kolom >= 3 and rij <= 2:
                    if schuinLinksOnder(rij,kolom,speler):
                        return "gevonden"
    return "niet gevonden"
print(winnaarZoeken())



    
