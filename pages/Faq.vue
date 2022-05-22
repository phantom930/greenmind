<template>
  <div class="text-wrap">
    <div class="container">
      <h1 class="font-bold title">FAQ – Ofte stillede spørgsmål</h1>

      <h3 class="font-bold subtitle">Skal jeg bestille tid til min reparation?</h3>
      <p>
        Vi har ikke tidsbestilling på reparationer, så du kommer bare ind forbi en af vores butikker, når det passer dig. Du er meget velkommen til at kontakte os forud for dit besøg, for at forhøre dig om forventet reparationstid den pågældende dag. <br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvor lang tid tager en skærm-reparation?</h3>
      <p>
        Hvis der kun er tale om skærmen, så kan vi som regel udføre reparationen på 1-3 timer – dette afhænger dog selvfølgelig af travlhed i butikken, og om de nødvendige reservedele er på lager.
      </p>

      <h3 class="font-bold subtitle">Kan I reparere samme dag?</h3>
      <p>
        Ja, langt de fleste reparationer kan vi udføre samme dag. Visse reparationer tager dog ofte flere dage. Dette gælder skader som eksempelvis væskeskader, hvor vi skal lave en tidskrævende diagnose og rense hovedenheden med vores specialværktøj. Ligeledes kan det ske, at vi ikke har reservedelen på lager, hvilket selvfølgelig også forlænger reparationstiden.
      </p>

      <h3 class="font-bold subtitle">Jeg har sendt min enhed til jer med posten. Hvornår får jeg den tilbage?</h3>
      <p>
        Ved indsendelse med posten får du typisk din enhed retur inden for 3-7 arbejdsdage. Reparationstiden kan dog blive forlænget ved diagnose af væskeskade, mangel på reservedele eller lignende. Hvis enheden skal ombyttes, forlænges reparationstiden med yderligere 4-7 arbejdsdage.
      </p>

      <h3 class="font-bold subtitle">Jeg har fundet en reparatør, der er meget billigere end jer. Hvorfor er jeres priser så forskellige?</h3>
      <p>
        Man skal være opmærksom på, at der kan være stor kvalitetsforskel på reservedele til smartphones og tablets. Vi har valgt kun at tilbyde vores kunder de absolut bedste reservedele på markedet, hvilket sikrer at din enhed fungerer fuldstændigt som før efter en reparation hos os.
      </p>

      <h3 class="font-bold subtitle">Bruger I originale dele?</h3>
      <p>
        Ved udskiftning af skærm eller batteri på iPhones benytter vi i de fleste tilfælde originale Apple-reservedele leveret direkte fra Apple. Alternativt benytter vi OEM-dele (Original Equipment Manufacturer), som er reservedele direkte fra producenten. I alle tilfælde er vores reservedele af absolut højeste kvalitet, og vi yder 2 års garanti på den udskiftede reservedel. På vores prislister fremgår det altid tydeligt, om vi benytter os af originale reservedele fra Apple eller OEM-dele på den pågældende model. Uanset om reservedelen er en original reservedel fra Apple eller en OEM-reservedel, udføres reparationen altid af en Apple-certificeret tekniker. Ved reparation af andre mærker og modeller end iPhones benytter vi altid originale reservedele, hvis muligt og alternativt OEM-dele af højeste kvalitet. Altid med 2 års garanti på den udskiftede reservedel.
      </p>

      <h3 class="font-bold subtitle">Tilbyder I lånetelefoner ved reparationerne?</h3>
      <p>
        Ja. Vi tilbyder lånetelefoner, hvis vi har nogle ledige. Lånetelefoner skal afhentes i en af vores butikker, og vi opkræver et depositum 1.000 kr. som returneres, når du afleverer lånetelefonen tilbage.
      </p>

      <h3 class="font-bold subtitle">Hvordan fungerer overtagelse af garanti og reklamationsret?</h3>
      <p>
        Det foregår ved, at vi overtager de resterende måneder af garantien og reklamationsretten på enheden, hvis den bliver repareret af os.
        <nuxt-link :to="{ name: 'terms-of-trade' }" class="underline text-center y-link">
          Læs GreenMinds handelsbetingelser
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Kan I hjælpe med en fejlsøgning/reparation på en MacBook/iMac?</h3>
      <p>Ja, det kan vi sagtens.</p>

      <h3 class="font-bold subtitle">Køber I brugte telefoner/tablets?</h3>
      <p>
          Ja, det gør vi. Kom ind forbi én af vores butikker og få et uforpligtende pristilbud.
      </p>

      <h3 class="font-bold subtitle">Er der studierabat på reparationerne hos jer?</h3>
      <p>
        Nej, desværre ikke. Vi har dog ofte kampagner, hvor vi yder rabat på udvalgte produkter/reparationer. Disse vil blive annonceret på vores <a href=”https://www.facebook.com/greenmind.dk”>Facebook-side</a> og igennem vores nyhedsbrev.
      </p>

      <h3 class="font-bold subtitle">Kan man få mængderabat, hvis man skal have repareret flere enheder?</h3>
      <p>
        Vi har ikke nogen faste mængderabatter, men skal du have foretaget mange reparationer, så kan butikschefen i butikken ofte finde en god pris til dig. Kom ned i butikken og hør ad.
      </p>



      <h2 class="font-bold subtitle">Reparation (forsikringskunder)</h2>
      <h3 class="font-bold subtitle">Hvor lang tid vil reparationen tage?</h3>
      <p>
        Reparationstiden kommer an på, hvordan du indleverer din enhed til os og hvilken type reparation, der er tale om.<br>
        Indleverer du din forsikringsanmeldte enhed personligt i én af vores butikker, så kan du i langt de fleste tilfælde forvente at få din enhed tilbage igen samme dag – ofte inden for 1-2 timer. Visse reparationer kræver dog længere tid. Dette gælder eksempelvis skader som væskeskader, hvor vi skal lave en tidskrævende diagnose og rense hovedenheden med vores specialværktøj. Disse reparationer tager typisk 2-7 arbejdsdage, helt afhængigt af skadesomfanget.<br>
        Vælger du at sende din enhed til os med posten, skal du regne med at undvære din enhed i 3-7 arbejdsdage – op til 5 arbejdsdage på værksted, og 1 dag til fragt hver vej. Ved diagnoser af eksempelvis vandskader kan behandlingstiden blive yderligere forlænget med 1-3 arbejdsdage.
      </p>

      <h3 class="font-bold subtitle">Hvad med min selvrisiko?</h3>
      <p>
        Proceduren vedr. selvrisiko varierer fra forsikringsselskab til forsikringsselskab. GreenMind opkræver selvrisikoen på vegne af nogle forsikringsselskaber, og andre forsikringsselskaber opkræver den selv. Hvis du er i tvivl om, hvordan selvrisikoen opkræves i din reparationssag, bedes du sende en e-mail til <a href=”mailto:forsikring@greenmind.dk">forsikring@greenmind.dk</a>.
      </p>

      <h3 class="font-bold subtitle">Skal jeg sende tilbehør med, når jeg sender min telefon til jer?</h3>
      <p>
        Nej. Det eneste du skal sende til os, er din forsikringsanmeldte enhed og en kopi af din købskvittering på enheden, hvis du har den. Kopi af købskvittering kan alternativt sendes til os pr. mail på <a href=”mailto:forsikring@greenmind.dk">forsikring@greenmind.dk</a>. Tilbehør som covers, opladere etc. og SIM-kort skal altså ikke sendes med. GreenMind kan ikke stilles til ansvar for bortkommet tilbehør.
      </p>

      <h3 class="font-bold subtitle">Vil min garanti stadig gælde efter reparationen af min forsikringsanmeldte enhed?</h3>
      <p>
        Ja. Vi overtager de resterende måneder af din garanti og reklamationsret. Derudover yder vi 24 mdr. garanti på den udskiftede reservedel.
      </p>

      <h3 class="font-bold subtitle">Bruger I originale dele?</h3>
      <p>
        Ved udskiftning af skærm eller batteri på iPhones benytter vi i de fleste tilfælde originale Apple-reservedele leveret direkte fra Apple. Alternativt benytter vi OEM-dele (Original Equipment Manufacturer), som er reservedele direkte fra producenten. I alle tilfælde er vores reservedele af absolut højeste kvalitet, og vi yder 2 års garanti på den udskiftede reservedel. På vores prislister fremgår det altid tydeligt, om vi benytter os af originale reservedele fra Apple eller OEM-dele på den pågældende model. Uanset om reservedelen er en original reservedel fra Apple eller en OEM-reservedel, udføres reparationen altid af en Apple-certificeret tekniker. Ved reparation af andre mærker og modeller end iPhones benytter vi altid originale reservedele, hvis muligt, og alternativt OEM-dele af højeste kvalitet. Altid med 2 års garanti på den udskiftede reservedel.
      </p>

      <h3 class="font-bold subtitle">Skal jeg bestille tid eller blot komme forbi?</h3>
      <p>
        Hos GreenMind tager vi ikke imod tidsbestilling, men beder vores kunder om at komme forbi butikkerne, når det passer dem. Vi bestræber os på altid at have bemanding til at kunne behandle de enheder, som kommer ind til reparation – dog med forbehold for perioder med spidsbelastning, manglende reservedele og forlænget reparationstid ved diagnoser. Der er typisk travlt om eftermiddagen omkring fyraften, men som kunde kan man altid ringe på forhånd og høre om, hvor lang kø der er på den pågældende reparation inden man tager af sted.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvordan sender jeg min enhed til jer med posten?</h3>
      <p>
        Hvis du planlægger at sende din forsikringsanmeldte enhed ind til os med posten, så kan vi sende dig fragtlabel og fragtemballage således, at fragten er betalt.
      </p>

      <h3 class="font-bold subtitle">Vi kan enten sende dig:</h3>
      <ul class="list-disc">
        <li>
          Fragtemballage og fragtlabel med posten. Så skal enheden blot lægges ned i emballagen, fragtlabel påklistres og pakken afleveres i en pakkeshop
        </li>
      </ul>
      <h3 class="font-bold subtitle">ELLER</h3>
      <ul>
        <li>
          Fragtlabel pr. e-mail (Hvis du allerede selv har fragtemballage, så kan du spare lidt tid ved at modtage fragtlabel pr. mail, påklistre det pakken og aflevere den i en pakkeshop)
        </li>
      </ul>
      <p>
        Hvis du ønsker at benytte dig af et af disse tilbud, så skal du blot skrive en mail til <a href=”mailto:forsikring@greenmind.dk">forsikring@greenmind.dk</a>. Fragtlabel og fragtemballage bliver ikke sendt ud automatisk, men udleveres kun efter anmodning, som beskrevet ovenfor. Bemærk også, at pakken ikke må afleveres i en postkasse. Den skal afleveres i en pakkeshop.Vælger du selv at sende enheden ind uden brug af vores fragtlabel, så anmoder vi om, at du sender enheden som en pakke med et forsendelsesnummer således, at indholdet er forsikret.
      </p>

      <h3 class="font-bold subtitle">Tilbyder I lånetelefoner ved reparationerne?</h3>
      <p>
        Ja. Vi tilbyder lånetelefoner, hvis vi har nogle ledige. Lånetelefoner skal afhentes i en af vores butikker, og vi opkræver et depositum 1.000 kr. som returneres, når du afleverer lånetelefonen tilbage.
      </p>

      <h3 class="font-bold subtitle">Hvad med garanti og reklamationsret på min ombytningsenhed?</h3>
      <p>
        Dette punkt er specifikt for Apple-produkter, da Apple i visse tilfælde tilbyder tilbyder ombytning.<br><br>
For at være sikker på, at du får en god oplevelse med din nye iPhone, iPad eller Apple Watch, så giver vi altid tre måneders garanti. Så hvis du oplever fabrikationsrelaterede fejl inden for de første tre måneder, så henvender du dig blot til os. Med ombytningen af din Apple-enhed, følger naturligvis også fornyet reklamationsret. Du vil altså med andre ord aldrig være ringere stillet end før ombytningen – tværtimod vil du som oftest være bedre stillet. Længden af denne reklamationsret afhænger af, i hvilket land enheden er købt. Det er derfor et krav, at du kan fremvise den originale købskvittering ved en eventuel reklamation, så vi kan fastslå købslandet og dermed længden af reklamationsretten.
      </p>
      <h3 class="font-bold subtitle">Eksempler:</h3>
      <ul>
        <li>
          Enhed købt i Danmark = 24 mdr. reklamationsret
        </li>
        <li>
          Enhed købt i USA = 12 mdr. reklamationsret
        </li>
      </ul>
      <p>
        Den originale købskvittering er kvitteringen, du fik udleveret, da du oprindeligt købte din iPhone, iPad eller Apple Watch. Et billede af købskvitteringen indsendt pr. mail er tilstrækkeligt, så længe teksten er læsbar.
      </p>

      <h3 class="font-bold subtitle">Kan jeg få en kvittering på min ombytningsenhed fra greenmind.dk?</h3>
      <p>
        Hvis du ønsker en kvittering på ombytningsenheden, så skal du blot rette henvendelse til vores kundeservice. Du behøver dog ikke kvitteringen ved evt. reklamationer til os, da det er nok blot at henvende sig med reparationsnummeret.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Medfølger der tilbehør til en ombytningsenhed?</h3>
      <p>
        Nej. En ombytning svarer til en reparation af enheden, og der medfølger derfor intet tilbehør (ladekabel, ladestik, hovedtelefoner osv.).
      </p>

      <h2 class="font-bold subtitle">Reparation af Macbooks og iMacs</h2>
      <h3 class="font-bold subtitle">Bruger i originale reservedele til MacBooks og iMacs?</h3>
      <p>
        Ja, til reparationer af MacBooks og iMacs bruger vi kun originale reservedele, med undtagelse af visse opgraderinger af harddisk og RAM, da Apple kun leverer standardstørrelserne. Harddisken vil dog være af samme fabrikat som originalen.
      </p>

      <h3 class="font-bold subtitle">Hvilke computere kan I reparere?</h3>
      <p>
        Vi tilbyder reparation af følgende computer-modeller fra Apple: MacBook, MacBook Pro, MacBook Air og iMac.<br>
        <br>
        Dertil kan vi også reparere langt de fleste laptops og desktop computere som ikke er Apple. Herunder Lenovo, Acer, ASUS m.m.
      </p>

      <h3 class="font-bold subtitle">Hvor kan jeg indlevere produktet?</h3>
      <p>
        Computere kan indleveres i alle vores butikker. Reparation af computere vil blive udført på vores centrale værksted.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Kan jeg sende min computer til jer?</h3>
      <p>
        Ja. Såfremt du ønsker at sende produktet skal FØR afsendelse være oprettet en sag, og forsendelsen skal være markeret med et sagsnummer.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvordan sender jeg min computer?</h3>
      <p>
        Såfremt du ønsker det, kan vi tilsende dig enten returlabel (hvis du selv har emballage) eller en returpakke med både fragtemballage og returlabel. Vi gør opmærksom på, at produktet skal være forsvarligt emballeret, og vi ikke tager ansvar for uforsvarligt emballerede pakker. Vi anbefaler derfor, at vores emballage benyttes.
      </p>

      <h3 class="font-bold subtitle">Hvor lang tid tager en reparation?</h3>
      <p>Den gennemsnitlige reparationstid er 3-5 arbejdsdage.</p>

      <h3 class="font-bold subtitle">Hvad koster en reparation?</h3>
      <p>
        Pris på reparation af diverse computere kræver altid en diagnose på vores værksted. For vejledende prisoverslag er du dog velkommen til at sende en mail til vores Kundeservice med oplysning om fejlbeskrivelse og enhedens serienummer.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvad koster diagnosen?</h3>
      <p>
        En diagnose og tilbud på reparation af en telefon/tablet koster 200 kr. inkl. moms.<br>
        En diagnose og tilbud på reparation af en desktop/laptop computer koster 350 kr. inkl. moms.<br>
        Såfremt tilbuddet accepteres, frafalder omkostningen ved diagnosen. Diagnosen opkræves altså kun, hvis produktet ikke ønskes repareret.

      </p>

      <h3 class="font-bold subtitle">Kan jeg få lavet min computer, mens jeg venter?</h3>
      <p>
        Nej, desværre ikke. Computere repareres på vores centrale værksted. Produktet undersøges hvorefter der gives et pristilbud. Det er til hver en tid muligt at afvise tilbuddet og få produktet retur uden reparation.
      </p>

      <h3 class="font-bold subtitle">Kan jeg få mere lagringsplads eller flere RAM i min computer?</h3>
      <p>
        Ja, vi kan udskifte harddisken/RAM til anden størrelse, såfremt det ønskes. Vi gør dog opmærksom på, at vi til Apple produkter vil benytte opgraderingsdele som ikke er produceret af Apple, da de ikke leverer andet end standardstørrelserne. Harddisken vil dog være af samme fabrikat som originalen.
      </p>

      <h3 class="font-bold subtitle">Har I reservedele på lager?</h3>
      <p>
        Nej. Alle reservedele bestilles specifikt til din model og med de ønskede indstillinger. Vi bruger KUN originale reservedele til Apple-computere, medmindre opgraderinger ønskes af f.eks. harddisk eller RAM. Reservedele leveres fra dag til dag og købes fra en dansk Apple-forhandler.
      </p>

      <h3 class="font-bold subtitle">Mister jeg mine data ved en reparation?</h3>
      <p>
        Vi vil altid forsøge at undgå at slette data i det omfang, det er muligt. Ved skade på harddisken, er der dog stor risiko for, at produktet vil blive leveret retur nulstillet med alt personlig data slettet.
      </p>

      <h3 class="font-bold subtitle">Kan I redde mine data?</h3>
      <p>
        Vi kan forsøge at lave en omfattende backup af hele harddisken, også selvom den er gået i stykker. Dette vil normalt tage 24-48 timer, og vil redde så meget data som muligt. Vi kan ikke garantere, at alt data kan reddes. Backup af en harddisk koster 500 kr. inkl. moms – dette kræver dog, at der indleveres eller udskiftes et medie som data kan overføres til.
      </p>

      <h3 class="font-bold subtitle">Ydes der reklamationsret på reparationen?</h3>
      <p>Ja, vi giver altid 24 måneders reklamationsret på alle reparationer og udskiftede reservedele.</p>

      <h3 class="font-bold subtitle">Mister jeg min oprindelige garanti, hvis jeg får produktet lavet hos jer?</h3>
      <p>
        I langt de fleste tilfælde vil du efter endt reparation fortsat være dækket af den oprindelige garanti. Der er dog undtagelser, hvor så store dele af maskinen er udskiftet, at det ikke længere betegnes som samme enhed.
      </p>

      <h2 class="font-bold subtitle">
        Køb og salg på web
      </h2>
      <h3 class="font-bold subtitle">
        Hvor lang er leveringstiden ved køb af smartphones og tablets?
      </h3>
      <p>
        Vi forsøger at have så mange modeller som muligt på lager, så vi kan levere hurtigst muligt. Ved køb på vores hjemmeside vil produktet blive afsendt indenfor 1-3 hverdage.<br>
        <br>
        Er modellen ikke på lager, så kan vi desværre ikke sige, hvornår den vil komme på lager igen, da det kommer an på, hvornår vi kan købe et brugt eksemplar af denne model af en kunde.
      </p>

      <h3 class="font-bold subtitle">Kan jeg fortryde mit køb på jeres webshop?</h3>
      <p>Ja. Du har altid 14 dages fortrydelsesret på dit køb, hvis du køber dit produkt via vores webshop. Læs mere i vores handelsbetingelser for brug af fortrydelsesretten.<br>
      <nuxt-link :to="{ name: 'terms-of-trade' }" class="underline text-center y-link">
          Handelsbetingelser
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvad gør jeg, hvis min købte smartphone eller tablet ikke virker?</h3>
      <p>
        Oplever du mod forventning problemer med din smartphone eller tablet, så skal du blot henvende dig i en af vores butikker eller kontakte vores Kundeservice. Hos os har du altid 24 måneders garanti på din smartphone eller tablet – uanset hvilken stand den er købt i.<br>
        <nuxt-link :to="{ name: 'customer-service' }" class="underline text-center y-link">
          Kontakt kundeservice
        </nuxt-link><br>
        <nuxt-link :to="{ name: 'shops' }" class="underline text-center y-link">
          Find butik
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvordan sælger jeg min smartphone eller tablet til jer?</h3>
      <p>
        Læs nærmere mere under Sælg til os.<br>
        <nuxt-link :to="{ name: 'how-to-sell' }" class="underline text-center y-link">
          Sælg til os
        </nuxt-link>
      </p>

      <h3 class="font-bold subtitle">Hvor lang tid går der, før jeg får min betaling ved salg til jer?</h3>
      <p>Vi overfører pengene til dig, så snart vi har gennemgået enheden. Typisk vil vi have gennemgået enheden indenfor 2-5 hverdage, hvorefter vi overfører pengene til din NemKonto.
      </p>

    </div>
  </div>

</template>

<style lang="scss" scoped>
@import '~/assets/css/infoPages.scss';
</style>
