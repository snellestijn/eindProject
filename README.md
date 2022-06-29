Copyright [2022] [Stijn Beekelaar]

# eindProject
AI Individual Propedeuse Assessment

# applicatie
De applicatie is opgebouwd in HTML en vormgegeven met CSS. De taken die gedaan moeten worden in de
applicatie zijn geschreven in functies in JavaScript. Documentatie over hoe deze functies in detail werken staat uitgelegd in de code.
In hoofdlijnen laat het programma gebruiker 1 als eerste een zet kiezen. Vervolgens wordt deze zet nagekeken, als de gebruiker heeft gewonne wordt dat laten weten en stopt het spel. Als er nog niet gewonnen is, veranderd de beurt naar de andere speler. Deze mag nu een van de kolommen invullen.

# nakijken
Het vinden van een winnaar wordt op vier manieren gedaan. Het zoeken naar vier op een rij schuin naar links, naar rechts, horizontaal en verticaal. Elk van deze manieren om te winnen geldt een andere functie voor. De functies kijken naar alle mogelijkheden waar er 3 opeenvolgende vakjes beschikbaar zijn. Als al deze vakjes dezelfde kleur bevatten (vier op een rij) heeft de speler gewonnen.

# manieren van spelen
Het spel wordt door 2 spelers gespeeld in een veld van zes rijen en zeven kolommen. Per speler is er een mogelijkheid hoe de speler speelt. Dit is te bepalen in het beginscherm. De mogelijkheden zijn: handmatig, makkelijk, normaal, moeilijk. De laatste drie manieren zijn gespeeld door de computer.

# handmatig
Wanneer er gekozen wordt voor een speler dat het handmatig gespeeld moet worden, staan er knoppen onder aan het veld die gebruikt kunnen worden om een kolom te kiezen. Na het kiezen van een kolom, wordt het onderste vakje ingekleurd, en verandert de beurt naar de tegenstander

# makkelijk
Het makkelijkste niveau van de computer bepaalt zijn zetten op basis van willekeurig kiezen uit de mogelijke kolommen. Er zit dus geen vorm van kunstmatige inteligentie verwerkt in dit niveau

# normaal
Bij de normale modus kijkt de computer een stap vooruit en bekijkt of het kan winnen, en zet de stap om te winnen. Als de computer geen mogelijkheid heeft om te winnen, kijkt het naar alle stappen dat de tegenstander kan winnen. Als er daar een van is, zet de computer daar zijn zet neer om de tegenstander te weerhouden van winnen. Als beide gevallen niet aan bod komen, kies de computer alsnog een willekeurige stap.
De pseudocode staat geschreven in de projectsamenvatting en vermeld in de code zelf

# moeilijk
Het moeilijkste niveau dat de computer kan aannemen is gebasseerd op het bekende algoritme 'minimax': bron is te vinden in de projectsamenvatting, net zoals de pseudocode. Dit algoritme geeft aan alle mogelijke zetten een bepaalde scoren, op basis van die scoren kiest de computer welke zet het moet nemen, de hoogste. Deze scoren wordt bepaald door steeds een stap vooruit te gaan in het spel en wanneer de tegenstander aan de beurt is, te laten kiezen tussen de slechtse scoren (mini). Dit zou heel veel stappen vooruit gedaan kunnen worden maar om de snelheid van het programma hoog te houden kijkt de computer slechts drie stappen vooruit. Wanneer er gewonnen wordt krijgt de zet een score van 1, bij verlies -1 en bij gelijkspel 0. Dit is de reden dat er uitgegaan wordt dat de tegenstander de laagste scoren zou kiezen, dit is voor haar/hem de beste mogelijkheid.
In de code worden alle stappen omschreven.
