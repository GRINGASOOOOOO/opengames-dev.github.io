// Football timeline data, 1960–2026. Plain data only; app.js renders it.
// Players: Ballon d'Or podium (France Football; FIFA Ballon d'Or 2010–15).
// Before 1995 only European players were eligible. 2020 had no Ballon d'Or.
// Seasons are listed by the year they ended (1960 = 1959–60).
var FOOTBALL = (function () {
  var FIRST = 1960, LAST = 2026;

  var eras = [
    { id: '60s', from: 1960, to: 1969, accent: '#416149', name: 'The King and catenaccio',
      blurb: 'Pelé’s Brazil win two World Cups, Benfica and Inter break Real Madrid’s grip on Europe, and England win at home.',
      keys: ['Pelé', 'Eusébio', 'Grande Inter', 'England ’66'] },
    { id: '70s', from: 1970, to: 1979, accent: '#92542b', name: 'Total Football',
      blurb: 'Ajax and the Netherlands turn every player into an attacker and defender, while Beckenbauer’s Bayern and West Germany win almost everything.',
      keys: ['Brazil ’70', 'Cruyff', 'Beckenbauer', 'Liverpool'] },
    { id: '80s', from: 1980, to: 1989, accent: '#785783', name: 'Genius and grief',
      blurb: 'Maradona and Platini rule, English clubs dominate Europe until Heysel, and Sacchi’s Milan reinvent pressing.',
      keys: ['Maradona', 'Platini', 'Zico', 'Sacchi’s Milan'] },
    { id: '90s', from: 1990, to: 1999, accent: '#3f6377', name: 'Football goes global',
      blurb: 'The Champions League and Premier League launch, the Bosman ruling frees players, and Ronaldo and Zidane light up the game.',
      keys: ['Ronaldo', 'Zidane', 'Bosman', 'Premier League'] },
    { id: '00s', from: 2000, to: 2009, accent: '#50557a', name: 'Galácticos to tiki-taka',
      blurb: 'Real Madrid collect superstars, Ronaldinho makes football joyful, and Guardiola’s Barcelona and Spain change how the game is played.',
      keys: ['Ronaldinho', 'Galácticos', 'Istanbul', 'Guardiola'] },
    { id: '10s', from: 2010, to: 2019, accent: '#8f3a2a', name: 'Messi vs Ronaldo',
      blurb: 'Two players win nine of ten Ballon d’Ors, Spain and Germany win World Cups, and Real Madrid win four Champions Leagues in five years.',
      keys: ['Messi', 'Cristiano Ronaldo', 'Tiki-taka', '7–1'] },
    { id: '20s', from: 2020, to: 2026, accent: '#5d6b2f', name: 'A new order',
      blurb: 'A pandemic empties stadiums, Messi finally wins the World Cup, PSG and City reach the top of Europe, and Spain win everything.',
      keys: ['Mbappé', 'Lamine Yamal', 'Spain', 'Club World Cup'] }
  ];

  // Domestic champions, one entry per year from 1960. null = season in progress.
  function list(text) { return text.split(';').map(function (s) { s = s.trim(); return s === '-' ? null : s; }); }
  function repeat(name, n) { return Array(n + 1).join(name + ';').slice(0, -1); }
  var leagues = [
    { id: 'eng', country: 'England', name: 'First Division / Premier League', champions: list(
      'Burnley;Tottenham Hotspur;Ipswich Town;Everton;Liverpool;Manchester United;Liverpool;Manchester United;Manchester City;Leeds United;' +
      'Everton;Arsenal;Derby County;Liverpool;Leeds United;Derby County;Liverpool;Liverpool;Nottingham Forest;Liverpool;' +
      'Liverpool;Aston Villa;Liverpool;Liverpool;Liverpool;Everton;Liverpool;Everton;Liverpool;Arsenal;' +
      'Liverpool;Arsenal;Leeds United;Manchester United;Manchester United;Blackburn Rovers;Manchester United;Manchester United;Arsenal;Manchester United;' +
      'Manchester United;Manchester United;Arsenal;Manchester United;Arsenal;Chelsea;Chelsea;Manchester United;Manchester United;Manchester United;' +
      'Chelsea;Manchester United;Manchester City;Manchester United;Manchester City;Chelsea;Leicester City;Chelsea;Manchester City;Manchester City;' +
      'Liverpool;Manchester City;Manchester City;Manchester City;Manchester City;Liverpool;Arsenal') },
    { id: 'esp', country: 'Spain', name: 'La Liga', champions: list(
      'Barcelona;Real Madrid;Real Madrid;Real Madrid;Real Madrid;Real Madrid;Atlético Madrid;Real Madrid;Real Madrid;Real Madrid;' +
      'Atlético Madrid;Valencia;Real Madrid;Atlético Madrid;Barcelona;Real Madrid;Real Madrid;Atlético Madrid;Real Madrid;Real Madrid;' +
      'Real Madrid;Real Sociedad;Real Sociedad;Athletic Bilbao;Athletic Bilbao;Barcelona;Real Madrid;Real Madrid;Real Madrid;Real Madrid;' +
      'Real Madrid;Barcelona;Barcelona;Barcelona;Barcelona;Real Madrid;Atlético Madrid;Real Madrid;Barcelona;Barcelona;' +
      'Deportivo La Coruña;Real Madrid;Valencia;Real Madrid;Valencia;Barcelona;Barcelona;Real Madrid;Real Madrid;Barcelona;' +
      'Barcelona;Barcelona;Real Madrid;Barcelona;Atlético Madrid;Barcelona;Barcelona;Real Madrid;Barcelona;Barcelona;' +
      'Real Madrid;Atlético Madrid;Real Madrid;Barcelona;Real Madrid;Barcelona;Barcelona') },
    { id: 'ita', country: 'Italy', name: 'Serie A', champions: list(
      'Juventus;Juventus;AC Milan;Inter;Bologna;Inter;Inter;Juventus;AC Milan;Fiorentina;' +
      'Cagliari;Inter;Juventus;Juventus;Lazio;Juventus;Torino;Juventus;Juventus;AC Milan;' +
      'Inter;Juventus;Juventus;Roma;Juventus;Hellas Verona;Juventus;Napoli;AC Milan;Inter;' +
      'Napoli;Sampdoria;AC Milan;AC Milan;AC Milan;Juventus;AC Milan;Juventus;Juventus;AC Milan;' +
      'Lazio;Roma;Juventus;Juventus;AC Milan;Not assigned (Calciopoli);Inter (assigned);Inter;Inter;Inter;' +
      'Inter;AC Milan;' + repeat('Juventus', 9) + ';' +
      'Inter;AC Milan;Napoli;Inter;Napoli;Inter') },
    { id: 'ger', country: 'Germany', name: 'German champion / Bundesliga', champions: list(
      'Hamburger SV;1. FC Nürnberg;1. FC Köln;Borussia Dortmund;1. FC Köln;Werder Bremen;1860 Munich;Eintracht Braunschweig;1. FC Nürnberg;Bayern Munich;' +
      'Borussia Mönchengladbach;Borussia Mönchengladbach;Bayern Munich;Bayern Munich;Bayern Munich;Borussia Mönchengladbach;Borussia Mönchengladbach;Borussia Mönchengladbach;1. FC Köln;Hamburger SV;' +
      'Bayern Munich;Bayern Munich;Hamburger SV;Hamburger SV;VfB Stuttgart;Bayern Munich;Bayern Munich;Bayern Munich;Werder Bremen;Bayern Munich;' +
      'Bayern Munich;1. FC Kaiserslautern;VfB Stuttgart;Werder Bremen;Bayern Munich;Borussia Dortmund;Borussia Dortmund;Bayern Munich;1. FC Kaiserslautern;Bayern Munich;' +
      'Bayern Munich;Bayern Munich;Borussia Dortmund;Bayern Munich;Werder Bremen;Bayern Munich;Bayern Munich;VfB Stuttgart;Bayern Munich;VfL Wolfsburg;' +
      'Bayern Munich;Borussia Dortmund;Borussia Dortmund;' + repeat('Bayern Munich', 11) + ';' +
      'Bayer Leverkusen;Bayern Munich;Bayern Munich') },
    { id: 'fra', country: 'France', name: 'Division 1 / Ligue 1', champions: list(
      'Reims;Monaco;Reims;Monaco;Saint-Étienne;Nantes;Nantes;Saint-Étienne;Saint-Étienne;Saint-Étienne;' +
      'Saint-Étienne;Marseille;Marseille;Nantes;Saint-Étienne;Saint-Étienne;Saint-Étienne;Nantes;Monaco;Strasbourg;' +
      'Nantes;Saint-Étienne;Monaco;Nantes;Bordeaux;Bordeaux;Paris Saint-Germain;Bordeaux;Monaco;Marseille;' +
      'Marseille;Marseille;Marseille;Not awarded (Marseille stripped);Paris Saint-Germain;Nantes;Auxerre;Monaco;Lens;Bordeaux;' +
      'Monaco;Nantes;' + repeat('Lyon', 7) + ';Bordeaux;' +
      'Marseille;Lille;Montpellier;Paris Saint-Germain;Paris Saint-Germain;Paris Saint-Germain;Paris Saint-Germain;Monaco;Paris Saint-Germain;Paris Saint-Germain;' +
      'Paris Saint-Germain;Lille;Paris Saint-Germain;Paris Saint-Germain;Paris Saint-Germain;Paris Saint-Germain;Paris Saint-Germain') },
    { id: 'bra', country: 'Brazil', name: 'Taça Brasil / Brasileirão', champions: list(
      'Palmeiras;Santos;Santos;Santos;Santos;Santos;Cruzeiro;Palmeiras;Santos and Botafogo;Palmeiras;' +
      'Fluminense;Atlético Mineiro;Palmeiras;Palmeiras;Vasco da Gama;Internacional;Internacional;São Paulo;Guarani;Internacional;' +
      'Flamengo;Grêmio;Flamengo;Flamengo;Fluminense;Coritiba;São Paulo;Sport (Flamengo won the Copa União);Bahia;Vasco da Gama;' +
      'Corinthians;São Paulo;Flamengo;Palmeiras;Palmeiras;Botafogo;Grêmio;Vasco da Gama;Corinthians;Corinthians;' +
      'Vasco da Gama;Athletico Paranaense;Santos;Cruzeiro;Santos;Corinthians;São Paulo;São Paulo;São Paulo;Flamengo;' +
      'Fluminense;Corinthians;Fluminense;Cruzeiro;Cruzeiro;Corinthians;Palmeiras;Corinthians;Palmeiras;Flamengo;' +
      'Flamengo;Atlético Mineiro;Palmeiras;Palmeiras;Botafogo;Flamengo;-') }
  ];

  // [winner, final, host]
  var worldCup = {
    1962: ['Brazil', '3–1 v Czechoslovakia', 'Chile'],
    1966: ['England', '4–2 v West Germany (aet)', 'England'],
    1970: ['Brazil', '4–1 v Italy', 'Mexico'],
    1974: ['West Germany', '2–1 v Netherlands', 'West Germany'],
    1978: ['Argentina', '3–1 v Netherlands (aet)', 'Argentina'],
    1982: ['Italy', '3–1 v West Germany', 'Spain'],
    1986: ['Argentina', '3–2 v West Germany', 'Mexico'],
    1990: ['West Germany', '1–0 v Argentina', 'Italy'],
    1994: ['Brazil', '0–0 v Italy, 3–2 on penalties', 'USA'],
    1998: ['France', '3–0 v Brazil', 'France'],
    2002: ['Brazil', '2–0 v Germany', 'South Korea and Japan'],
    2006: ['Italy', '1–1 v France, 5–3 on penalties', 'Germany'],
    2010: ['Spain', '1–0 v Netherlands (aet)', 'South Africa'],
    2014: ['Germany', '1–0 v Argentina (aet)', 'Brazil'],
    2018: ['France', '4–2 v Croatia', 'Russia'],
    2022: ['Argentina', '3–3 v France, 4–2 on penalties', 'Qatar'],
    2026: ['Spain', '1–0 v Argentina (aet)', 'USA, Canada and Mexico']
  };
  var euro = {
    1960: ['USSR', '2–1 v Yugoslavia (aet)', 'France'],
    1964: ['Spain', '2–1 v USSR', 'Spain'],
    1968: ['Italy', '2–0 v Yugoslavia (replay after 1–1)', 'Italy'],
    1972: ['West Germany', '3–0 v USSR', 'Belgium'],
    1976: ['Czechoslovakia', '2–2 v West Germany, 5–3 on penalties', 'Yugoslavia'],
    1980: ['West Germany', '2–1 v Belgium', 'Italy'],
    1984: ['France', '2–0 v Spain', 'France'],
    1988: ['Netherlands', '2–0 v USSR', 'West Germany'],
    1992: ['Denmark', '2–0 v Germany', 'Sweden'],
    1996: ['Germany', '2–1 v Czech Republic (golden goal)', 'England'],
    2000: ['France', '2–1 v Italy (golden goal)', 'Belgium and Netherlands'],
    2004: ['Greece', '1–0 v Portugal', 'Portugal'],
    2008: ['Spain', '1–0 v Germany', 'Austria and Switzerland'],
    2012: ['Spain', '4–0 v Italy', 'Poland and Ukraine'],
    2016: ['Portugal', '1–0 v France (aet)', 'France'],
    2021: ['Italy', '1–1 v England, 3–2 on penalties', 'Across Europe (Euro 2020)'],
    2024: ['Spain', '2–1 v England', 'Germany']
  };
  var copaAmerica = {
    1963: ['Bolivia', 'Round-robin; Paraguay second', 'Bolivia'],
    1967: ['Uruguay', 'Round-robin; Argentina second', 'Uruguay'],
    1975: ['Peru', 'Final play-off 1–0 v Colombia', 'No single host'],
    1979: ['Paraguay', 'Final v Chile', 'No single host'],
    1983: ['Uruguay', 'Final v Brazil', 'No single host'],
    1987: ['Uruguay', '1–0 v Chile', 'Argentina'],
    1989: ['Brazil', 'Final round; Uruguay second', 'Brazil'],
    1991: ['Argentina', 'Final round; Brazil second', 'Chile'],
    1993: ['Argentina', '2–1 v Mexico', 'Ecuador'],
    1995: ['Uruguay', '1–1 v Brazil, 5–3 on penalties', 'Uruguay'],
    1997: ['Brazil', '3–1 v Bolivia', 'Bolivia'],
    1999: ['Brazil', '3–0 v Uruguay', 'Paraguay'],
    2001: ['Colombia', '1–0 v Mexico', 'Colombia'],
    2004: ['Brazil', '2–2 v Argentina, 4–2 on penalties', 'Peru'],
    2007: ['Brazil', '3–0 v Argentina', 'Venezuela'],
    2011: ['Uruguay', '3–0 v Paraguay', 'Argentina'],
    2015: ['Chile', '0–0 v Argentina, 4–1 on penalties', 'Chile'],
    2016: ['Chile', '0–0 v Argentina, 4–2 on penalties', 'USA (Centenario)'],
    2019: ['Brazil', '3–1 v Peru', 'Brazil'],
    2021: ['Argentina', '1–0 v Brazil', 'Brazil'],
    2024: ['Argentina', '1–0 v Colombia (aet)', 'USA']
  };
  var womensWorldCup = {
    1991: ['USA', '2–1 v Norway', 'China'],
    1995: ['Norway', '2–0 v Germany', 'Sweden'],
    1999: ['USA', '0–0 v China, 5–4 on penalties', 'USA'],
    2003: ['Germany', '2–1 v Sweden (golden goal)', 'USA'],
    2007: ['Germany', '2–0 v Brazil', 'China'],
    2011: ['Japan', '2–2 v USA, 3–1 on penalties', 'Germany'],
    2015: ['USA', '5–2 v Japan', 'Canada'],
    2019: ['USA', '2–0 v Netherlands', 'France'],
    2023: ['Spain', '1–0 v England', 'Australia and New Zealand']
  };

  // European Cup / Champions League: [winner, final]
  var europe = list(
    'Real Madrid|7–3 v Eintracht Frankfurt;Benfica|3–2 v Barcelona;Benfica|5–3 v Real Madrid;AC Milan|2–1 v Benfica;Inter|3–1 v Real Madrid;' +
    'Inter|1–0 v Benfica;Real Madrid|2–1 v Partizan;Celtic|2–1 v Inter;Manchester United|4–1 v Benfica (aet);AC Milan|4–1 v Ajax;' +
    'Feyenoord|2–1 v Celtic (aet);Ajax|2–0 v Panathinaikos;Ajax|2–0 v Inter;Ajax|1–0 v Juventus;Bayern Munich|4–0 v Atlético Madrid (replay);' +
    'Bayern Munich|2–0 v Leeds United;Bayern Munich|1–0 v Saint-Étienne;Liverpool|3–1 v Borussia Mönchengladbach;Liverpool|1–0 v Club Brugge;Nottingham Forest|1–0 v Malmö;' +
    'Nottingham Forest|1–0 v Hamburger SV;Liverpool|1–0 v Real Madrid;Aston Villa|1–0 v Bayern Munich;Hamburger SV|1–0 v Juventus;Liverpool|1–1 v Roma, 4–2 on penalties;' +
    'Juventus|1–0 v Liverpool;Steaua Bucharest|0–0 v Barcelona, 2–0 on penalties;Porto|2–1 v Bayern Munich;PSV Eindhoven|0–0 v Benfica, 6–5 on penalties;AC Milan|4–0 v Steaua Bucharest;' +
    'AC Milan|1–0 v Benfica;Red Star Belgrade|0–0 v Marseille, 5–3 on penalties;Barcelona|1–0 v Sampdoria (aet);Marseille|1–0 v AC Milan;AC Milan|4–0 v Barcelona;' +
    'Ajax|1–0 v AC Milan;Juventus|1–1 v Ajax, 4–2 on penalties;Borussia Dortmund|3–1 v Juventus;Real Madrid|1–0 v Juventus;Manchester United|2–1 v Bayern Munich;' +
    'Real Madrid|3–0 v Valencia;Bayern Munich|1–1 v Valencia, 5–4 on penalties;Real Madrid|2–1 v Bayer Leverkusen;AC Milan|0–0 v Juventus, 3–2 on penalties;Porto|3–0 v Monaco;' +
    'Liverpool|3–3 v AC Milan, 3–2 on penalties;Barcelona|2–1 v Arsenal;AC Milan|2–1 v Liverpool;Manchester United|1–1 v Chelsea, 6–5 on penalties;Barcelona|2–0 v Manchester United;' +
    'Inter|2–0 v Bayern Munich;Barcelona|3–1 v Manchester United;Chelsea|1–1 v Bayern Munich, 4–3 on penalties;Bayern Munich|2–1 v Borussia Dortmund;Real Madrid|4–1 v Atlético Madrid (aet);' +
    'Barcelona|3–1 v Juventus;Real Madrid|1–1 v Atlético Madrid, 5–3 on penalties;Real Madrid|4–1 v Juventus;Real Madrid|3–1 v Liverpool;Liverpool|2–0 v Tottenham Hotspur;' +
    'Bayern Munich|1–0 v Paris Saint-Germain;Chelsea|1–0 v Manchester City;Real Madrid|1–0 v Liverpool;Manchester City|1–0 v Inter;Real Madrid|2–0 v Borussia Dortmund;' +
    'Paris Saint-Germain|5–0 v Inter;Paris Saint-Germain|1–1 v Arsenal, 4–3 on penalties');

  // Copa Libertadores: [winner, final]
  var libertadores = list(
    'Peñarol|v Olimpia;Peñarol|v Palmeiras;Santos|v Peñarol;Santos|v Boca Juniors;Independiente|v Nacional;' +
    'Independiente|v Peñarol;Peñarol|v River Plate;Racing Club|v Nacional;Estudiantes|v Palmeiras;Estudiantes|v Nacional;' +
    'Estudiantes|v Peñarol;Nacional|v Estudiantes;Independiente|v Universitario;Independiente|v Colo-Colo;Independiente|v São Paulo;' +
    'Independiente|v Unión Española;Cruzeiro|v River Plate;Boca Juniors|v Cruzeiro;Boca Juniors|v Deportivo Cali;Olimpia|v Boca Juniors;' +
    'Nacional|v Internacional;Flamengo|v Cobreloa;Peñarol|v Cobreloa;Grêmio|v Peñarol;Independiente|v Grêmio;' +
    'Argentinos Juniors|v América de Cali;River Plate|v América de Cali;Peñarol|v América de Cali;Nacional|v Newell’s Old Boys;Atlético Nacional|v Olimpia;' +
    'Olimpia|v Barcelona SC;Colo-Colo|v Olimpia;São Paulo|v Newell’s Old Boys;São Paulo|v Universidad Católica;Vélez Sarsfield|v São Paulo;' +
    'Grêmio|v Atlético Nacional;River Plate|v América de Cali;Cruzeiro|v Sporting Cristal;Vasco da Gama|v Barcelona SC;Palmeiras|v Deportivo Cali;' +
    'Boca Juniors|v Palmeiras;Boca Juniors|v Cruz Azul;Olimpia|v São Caetano;Boca Juniors|v Santos;Once Caldas|v Boca Juniors;' +
    'São Paulo|v Athletico Paranaense;Internacional|v São Paulo;Boca Juniors|v Grêmio;LDU Quito|v Fluminense;Estudiantes|v Cruzeiro;' +
    'Internacional|v Guadalajara;Santos|v Peñarol;Corinthians|v Boca Juniors;Atlético Mineiro|v Olimpia;San Lorenzo|v Nacional (Paraguay);' +
    'River Plate|v Tigres;Atlético Nacional|v Independiente del Valle;Grêmio|v Lanús;River Plate|v Boca Juniors (in Madrid);Flamengo|2–1 v River Plate;' +
    'Palmeiras|1–0 v Santos;Palmeiras|2–1 v Flamengo (aet);Flamengo|1–0 v Athletico Paranaense;Fluminense|2–1 v Boca Juniors (aet);Botafogo|3–1 v Atlético Mineiro;' +
    'Flamengo|1–0 v Palmeiras;-');

  // World club title: [competition, winner, final]
  var worldClub = {};
  var icc = list(
    'Real Madrid|v Peñarol;Peñarol|v Benfica;Santos|v Benfica;Santos|v AC Milan;Inter|v Independiente;' +
    'Inter|v Independiente;Peñarol|v Real Madrid;Racing Club|v Celtic;Estudiantes|v Manchester United;AC Milan|v Estudiantes;' +
    'Feyenoord|v Estudiantes;Nacional|v Panathinaikos;Ajax|v Independiente;Independiente|v Juventus;Atlético Madrid|v Independiente;' +
    'Not played|Bayern and Independiente could not agree dates;Bayern Munich|v Cruzeiro;Boca Juniors|v Borussia Mönchengladbach;Not played|Liverpool declined;Olimpia|v Malmö;' +
    'Nacional|v Nottingham Forest;Flamengo|3–0 v Liverpool;Peñarol|v Aston Villa;Grêmio|v Hamburger SV;Independiente|v Liverpool;' +
    'Juventus|v Argentinos Juniors;River Plate|v Steaua Bucharest;Porto|v Peñarol;Nacional|v PSV Eindhoven;AC Milan|v Atlético Nacional;' +
    'AC Milan|v Olimpia;Red Star Belgrade|v Colo-Colo;São Paulo|v Barcelona;São Paulo|v AC Milan;Vélez Sarsfield|v AC Milan;' +
    'Ajax|v Grêmio;Juventus|v River Plate;Borussia Dortmund|v Cruzeiro;Real Madrid|v Vasco da Gama;Manchester United|v Palmeiras;' +
    'Boca Juniors|v Real Madrid;Bayern Munich|v Boca Juniors;Real Madrid|v Olimpia;Boca Juniors|v AC Milan;Porto|v Once Caldas');
  icc.forEach(function (entry, i) { worldClub[FIRST + i] = [['Intercontinental Cup'].concat(entry.split('|'))]; });
  worldClub[2000].push(['FIFA Club World Championship', 'Corinthians', 'v Vasco da Gama, on penalties']);
  var cwc = list(
    'São Paulo|v Liverpool;Internacional|v Barcelona;AC Milan|v Boca Juniors;Manchester United|v LDU Quito;Barcelona|v Estudiantes;' +
    'Inter|v TP Mazembe;Barcelona|v Santos;Corinthians|v Chelsea;Bayern Munich|v Raja Casablanca;Real Madrid|v San Lorenzo;' +
    'Barcelona|v River Plate;Real Madrid|v Kashima Antlers;Real Madrid|v Grêmio;Real Madrid|v Al Ain;Liverpool|v Flamengo;' +
    'Bayern Munich|v Tigres;Chelsea|v Palmeiras;Real Madrid|v Al-Hilal;Manchester City|v Fluminense');
  cwc.forEach(function (entry, i) { worldClub[2005 + i] = [['Club World Cup'].concat(entry.split('|'))]; });
  worldClub[2024] = [['Intercontinental Cup', 'Real Madrid', 'v Pachuca']];
  worldClub[2025] = [['Club World Cup (32 teams)', 'Chelsea', '3–0 v Paris Saint-Germain'],
    ['Intercontinental Cup', 'Paris Saint-Germain', '1–1 v Flamengo, 2–1 on penalties']];

  // Per-year story: headline, podium [name, club, nation], moments [title, text].
  var P = function (a, b, c) { return [a.split('|'), b.split('|'), c.split('|')]; };
  var years = {
    1960: { h: 'Real Madrid’s fifth European Cup in a row',
      p: P('Luis Suárez|Barcelona|Spain', 'Ferenc Puskás|Real Madrid|Hungary', 'Uwe Seeler|Hamburger SV|West Germany'),
      m: [['Seven goals at Hampden', 'Real Madrid beat Eintracht Frankfurt 7–3 in Glasgow in front of about 127,000. Puskás scored four and Di Stéfano three.'],
        ['The first Euro', 'The USSR, with Lev Yashin in goal, beat Yugoslavia 2–1 after extra time in Paris to win the first European Nations’ Cup.'],
        ['South America’s new club cup', 'Peñarol won the first Copa Libertadores, then lost the first Intercontinental Cup to Real Madrid.']] },
    1961: { h: 'Benfica end the Madrid era',
      p: P('Omar Sívori|Juventus|Italy', 'Luis Suárez|Inter|Spain', 'Johnny Haynes|Fulham|England'),
      m: [['Square posts in Bern', 'Benfica beat Barcelona 3–2 in the European Cup final. Barcelona had knocked out Real Madrid, the first European Cup tie Madrid ever lost.'],
        ['Spurs do the double', 'Tottenham became the first club of the 20th century to win England’s league and FA Cup in the same season.'],
        ['The maximum wage ends', 'English football scrapped its £20-a-week cap. Johnny Haynes became the first £100-a-week player.']] },
    1962: { h: 'Garrincha’s World Cup',
      p: P('Josef Masopust|Dukla Prague|Czechoslovakia', 'Eusébio|Benfica|Portugal', 'Karl-Heinz Schnellinger|1. FC Köln|West Germany'),
      m: [['Brazil without Pelé', 'Pelé was injured in the second game. Garrincha carried Brazil to a second straight title, beating Czechoslovakia 3–1 in Santiago.'],
        ['The Battle of Santiago', 'Chile v Italy saw two players sent off and police on the pitch, one of the most violent matches in World Cup history.'],
        ['Eusébio’s arrival', 'Benfica beat Real Madrid 5–3 in Amsterdam. Puskás scored a hat-trick, but 20-year-old Eusébio scored twice to win it.']] },
    1963: { h: 'The Black Spider’s year',
      p: P('Lev Yashin|Dynamo Moscow|USSR', 'Gianni Rivera|AC Milan|Italy', 'Jimmy Greaves|Tottenham Hotspur|England'),
      m: [['A goalkeeper wins', 'Lev Yashin became the only goalkeeper ever to win the Ballon d’Or.'],
        ['Milan conquer Europe', 'AC Milan beat Benfica 2–1 at Wembley, the first European Cup for an Italian club.'],
        ['The Bundesliga is born', 'West Germany created a national league. Its first season kicked off in August 1963.']] },
    1964: { h: 'Spain and the Grande Inter',
      p: P('Denis Law|Manchester United|Scotland', 'Luis Suárez|Inter|Spain', 'Amancio|Real Madrid|Spain'),
      m: [['Spain win at home', 'Spain beat the USSR 2–1 in Madrid. Marcelino’s header won the European Nations’ Cup.'],
        ['Herrera’s Inter', 'Helenio Herrera’s catenaccio Inter beat Real Madrid 3–1 in Vienna, with two goals from Sandro Mazzola.'],
        ['Tragedy in Lima', 'A disallowed goal in Peru v Argentina sparked a crush at the Estadio Nacional that killed more than 300 people.']] },
    1965: { h: 'Inter make it two',
      p: P('Eusébio|Benfica|Portugal', 'Giacinto Facchetti|Inter|Italy', 'Luis Suárez|Inter|Spain'),
      m: [['Inter retain', 'Inter beat Benfica 1–0 at San Siro, then beat Independiente again to stay world club champions.'],
        ['The first substitute', 'English league football allowed substitutes from 1965–66. Charlton’s Keith Peacock was the first to come off the bench.'],
        ['Eusébio crowned', 'Benfica’s striker became the first African-born winner of the Ballon d’Or.']] },
    1966: { h: 'England’s summer',
      p: P('Bobby Charlton|Manchester United|England', 'Eusébio|Benfica|Portugal', 'Franz Beckenbauer|Bayern Munich|West Germany'),
      m: [['They think it’s all over', 'England beat West Germany 4–2 after extra time at Wembley. Geoff Hurst scored a hat-trick, including the disputed “Wembley goal”.'],
        ['Pickles finds the trophy', 'The Jules Rimet trophy was stolen in London in March. A dog named Pickles found it under a hedge a week later.'],
        ['North Korea and Eusébio', 'North Korea beat Italy, then led Portugal 3–0 before Eusébio scored four in a 5–3 comeback. He finished with nine goals.']] },
    1967: { h: 'The Lisbon Lions',
      p: P('Flórián Albert|Ferencváros|Hungary', 'Bobby Charlton|Manchester United|England', 'Jimmy Johnstone|Celtic|Scotland'),
      m: [['Lisbon Lions', 'Celtic beat Inter 2–1 in Lisbon to become the first British European champions, with a team born within about 30 miles of Glasgow.'],
        ['A rough world title', 'Racing Club beat Celtic in a bad-tempered play-off in Montevideo to win the Intercontinental Cup.'],
        ['Scotland beat the champions', 'Scotland won 3–2 at Wembley, England’s first defeat since winning the World Cup.']] },
    1968: { h: 'Ten years after Munich',
      p: P('George Best|Manchester United|Northern Ireland', 'Bobby Charlton|Manchester United|England', 'Dragan Džajić|Red Star Belgrade|Yugoslavia'),
      m: [['Manchester United’s night', 'Ten years after the Munich air disaster, Matt Busby’s United beat Benfica 4–1 at Wembley. Charlton scored twice and Best once.'],
        ['A coin and a replay', 'Italy reached the Euro final on a coin toss after a 0–0 draw with the USSR, then beat Yugoslavia in a replay.'],
        ['Estudiantes rise', 'Estudiantes won their first Libertadores and beat Manchester United for the world title.']] },
    1969: { h: 'Pelé’s thousandth goal',
      p: P('Gianni Rivera|AC Milan|Italy', 'Luigi Riva|Cagliari|Italy', 'Gerd Müller|Bayern Munich|West Germany'),
      m: [['O Milésimo', 'Pelé scored his 1,000th goal, a penalty against Vasco at the Maracanã on 19 November 1969.'],
        ['Milan beat young Ajax', 'AC Milan beat Ajax 4–1 in Madrid. Pierino Prati scored a hat-trick against a 22-year-old Johan Cruyff.'],
        ['Bayern’s first title', 'Bayern Munich won their first Bundesliga, the start of a club that would dominate Germany.']] },
    1970: { h: 'Brazil keep the Jules Rimet',
      p: P('Gerd Müller|Bayern Munich|West Germany', 'Bobby Moore|West Ham United|England', 'Luigi Riva|Cagliari|Italy'),
      m: [['The beautiful team', 'Brazil beat Italy 4–1 in Mexico City, finished by Carlos Alberto’s team goal. A third title meant Brazil kept the trophy for good.'],
        ['Game of the Century', 'Italy beat West Germany 4–3 in the semi-final, with five goals in extra time. Beckenbauer played on with a dislocated shoulder.'],
        ['The save', 'Gordon Banks somehow clawed away Pelé’s downward header in Guadalajara, still called the greatest save ever made.']] },
    1971: { h: 'Ajax begin a dynasty',
      p: P('Johan Cruyff|Ajax|Netherlands', 'Sandro Mazzola|Inter|Italy', 'George Best|Manchester United|Northern Ireland'),
      m: [['Total Football', 'Ajax beat Panathinaikos 2–0 at Wembley, the first of three straight European Cups.'],
        ['Ibrox disaster', '66 supporters died in a stairway crush at the end of a Rangers v Celtic match in January.'],
        ['Brazil’s national league', 'The first Campeonato Brasileiro was won by Atlético Mineiro.']] },
    1972: { h: 'West Germany’s golden side',
      p: P('Franz Beckenbauer|Bayern Munich|West Germany', 'Gerd Müller|Bayern Munich|West Germany', 'Günter Netzer|Borussia Mönchengladbach|West Germany'),
      m: [['Euro in Brussels', 'West Germany beat the USSR 3–0. Müller scored twice; the whole podium of the Ballon d’Or came from that team.'],
        ['Cruyff’s double', 'Ajax beat Inter 2–0 in Rotterdam, with both goals from Cruyff.'],
        ['85 goals', 'Gerd Müller scored 85 goals in 1972, a calendar-year record that stood until Messi in 2012.']] },
    1973: { h: 'Ajax’s third, Cruyff’s move',
      p: P('Johan Cruyff|Barcelona|Netherlands', 'Dino Zoff|Juventus|Italy', 'Gerd Müller|Bayern Munich|West Germany'),
      m: [['Three in a row', 'Ajax beat Juventus 1–0 in Belgrade for a third straight European Cup.'],
        ['Cruyff to Barcelona', 'Cruyff moved for a world-record fee. Barcelona won La Liga that season, including a 5–0 win at the Bernabéu.'],
        ['Sunderland’s upset', 'Second-tier Sunderland beat Leeds United 1–0 in the FA Cup final.']] },
    1974: { h: 'Total Football falls one step short',
      p: P('Johan Cruyff|Barcelona|Netherlands', 'Franz Beckenbauer|Bayern Munich|West Germany', 'Kazimierz Deyna|Legia Warsaw|Poland'),
      m: [['Hosts lift the new trophy', 'West Germany came from behind to beat the Netherlands 2–1 in Munich, the first final played for today’s World Cup trophy.'],
        ['The Cruyff turn', 'Against Sweden, Cruyff faked a pass and dragged the ball behind his standing leg, a move now named after him.'],
        ['Bayern’s first', 'Bayern needed a last-minute equaliser and a replay to beat Atlético Madrid 4–0 for their first European Cup.']] },
    1975: { h: 'Bayern rule Europe again',
      p: P('Oleg Blokhin|Dynamo Kyiv|USSR', 'Franz Beckenbauer|Bayern Munich|West Germany', 'Johan Cruyff|Barcelona|Netherlands'),
      m: [['Bayern retain', 'Bayern beat Leeds United 2–0 in Paris. Leeds fans rioted after a disallowed goal.'],
        ['Pelé goes to New York', 'Pelé came out of retirement to join the New York Cosmos, putting the North American league on the map.'],
        ['Copa América reborn', 'The South American Championship returned as the Copa América. Peru won it.']] },
    1976: { h: 'Panenka’s chip',
      p: P('Franz Beckenbauer|Bayern Munich|West Germany', 'Rob Rensenbrink|Anderlecht|Netherlands', 'Ivo Viktor|Dukla Prague|Czechoslovakia'),
      m: [['The chip that named a penalty', 'Antonín Panenka chipped the decisive penalty as Czechoslovakia beat West Germany, the first major final settled by a shootout.'],
        ['Bayern’s hat-trick', 'Bayern beat Saint-Étienne 1–0 in Glasgow for a third European Cup in a row.'],
        ['Cruzeiro’s first', 'Cruzeiro won the Libertadores, beating River Plate in a play-off.']] },
    1977: { h: 'Liverpool’s first European Cup',
      p: P('Allan Simonsen|Borussia Mönchengladbach|Denmark', 'Kevin Keegan|Hamburger SV|England', 'Michel Platini|Nancy|France'),
      m: [['Rome, 1977', 'Bob Paisley’s Liverpool beat Mönchengladbach 3–1, the first of their European Cups.'],
        ['Pelé says goodbye', 'Pelé played his last match in October: one half for the Cosmos, one for Santos.'],
        ['Boca’s first Libertadores', 'Boca Juniors beat Cruzeiro on penalties to win their first Libertadores.']] },
    1978: { h: 'Argentina at home',
      p: P('Kevin Keegan|Hamburger SV|England', 'Hans Krankl|Barcelona|Austria', 'Rob Rensenbrink|Anderlecht|Netherlands'),
      m: [['Kempes and the ticker tape', 'Argentina beat the Netherlands 3–1 after extra time in Buenos Aires. Mario Kempes scored twice and won the Golden Boot.'],
        ['Rensenbrink’s post', 'At 1–1 in the last minute of normal time, Rensenbrink hit the post. The Netherlands lost a second final in a row.'],
        ['Liverpool retain', 'Liverpool beat Club Brugge 1–0 at Wembley with a Kenny Dalglish chip.']] },
    1979: { h: 'Clough’s Forest',
      p: P('Kevin Keegan|Hamburger SV|England', 'Karl-Heinz Rummenigge|Bayern Munich|West Germany', 'Ruud Krol|Ajax|Netherlands'),
      m: [['Forest on top of Europe', 'Brian Clough’s Nottingham Forest, promoted two years earlier, beat Malmö 1–0 in Munich.'],
        ['Maradona’s first title', 'An 18-year-old Diego Maradona led Argentina to the World Youth Championship in Japan.'],
        ['Olimpia’s year', 'Olimpia won the first Libertadores for a Paraguayan club, then the world title.']] },
    1980: { h: 'West Germany’s second Euro',
      p: P('Karl-Heinz Rummenigge|Bayern Munich|West Germany', 'Bernd Schuster|Barcelona|West Germany', 'Michel Platini|Saint-Étienne|France'),
      m: [['Hrubesch’s header', 'West Germany beat Belgium 2–1 in Rome. Horst Hrubesch scored both, the winner two minutes from time.'],
        ['Forest retain', 'Nottingham Forest beat Hamburg and Kevin Keegan 1–0 in Madrid.'],
        ['Totonero', 'A betting scandal shook Italy. AC Milan were relegated and Paolo Rossi was banned.']] },
    1981: { h: 'Zico’s Flamengo',
      p: P('Karl-Heinz Rummenigge|Bayern Munich|West Germany', 'Paul Breitner|Bayern Munich|West Germany', 'Bernd Schuster|Barcelona|West Germany'),
      m: [['Flamengo conquer the world', 'Zico’s Flamengo won the Libertadores, then beat Liverpool 3–0 in Tokyo.'],
        ['Liverpool’s third', 'Alan Kennedy’s goal beat Real Madrid 1–0 in Paris.'],
        ['Three points for a win', 'England introduced three points for a win from 1981–82. The rest of the world followed.']] },
    1982: { h: 'Rossi’s World Cup',
      p: P('Paolo Rossi|Juventus|Italy', 'Alain Giresse|Bordeaux|France', 'Zbigniew Boniek|Juventus|Poland'),
      m: [['Paolo Rossi', 'Back from his ban, Rossi’s hat-trick knocked out the Brazil of Zico, Sócrates and Falcão. Italy beat West Germany 3–1 in the final.'],
        ['Night in Seville', 'France v West Germany: Schumacher’s collision with Battiston, a 3–3 thriller and the first World Cup penalty shootout.'],
        ['Tardelli’s scream', 'Marco Tardelli’s goal celebration in the final became one of the sport’s defining images.']] },
    1983: { h: 'Platini’s first Ballon d’Or',
      p: P('Michel Platini|Juventus|France', 'Kenny Dalglish|Liverpool|Scotland', 'Allan Simonsen|Vejle|Denmark'),
      m: [['Hamburg’s night', 'Felix Magath’s long-range goal beat Juventus 1–0 in Athens.'],
        ['Ferguson’s Aberdeen', 'Alex Ferguson’s Aberdeen beat Real Madrid 2–1 to win the Cup Winners’ Cup.'],
        ['The trophy disappears', 'The Jules Rimet trophy Brazil kept was stolen in Rio in December. It was never recovered.']] },
    1984: { h: 'Platini’s France',
      p: P('Michel Platini|Juventus|France', 'Jean Tigana|Bordeaux|France', 'Preben Elkjær|Hellas Verona|Denmark'),
      m: [['Nine goals in one Euro', 'Platini scored nine times as France won at home, beating Spain 2–0 in the final.'],
        ['Wobbly legs in Rome', 'Liverpool beat Roma on penalties in Rome after Bruce Grobbelaar’s distracting antics.'],
        ['Maradona to Napoli', 'Maradona left Barcelona for Napoli for a world-record fee.']] },
    1985: { h: 'Heysel',
      p: P('Michel Platini|Juventus|France', 'Preben Elkjær|Hellas Verona|Denmark', 'Bernd Schuster|Barcelona|West Germany'),
      m: [['Heysel disaster', '39 people died before the Juventus v Liverpool final in Brussels. English clubs were banned from Europe for five years.'],
        ['Bradford fire', '56 people died when fire spread through the main stand at Bradford City in May.'],
        ['Verona’s miracle', 'Hellas Verona won their only Serie A title, and Platini won a third straight Ballon d’Or.']] },
    1986: { h: 'Maradona’s World Cup',
      p: P('Igor Belanov|Dynamo Kyiv|USSR', 'Gary Lineker|Barcelona|England', 'Emilio Butragueño|Real Madrid|Spain'),
      m: [['Hand of God, Goal of the Century', 'Against England, Maradona punched in one goal and then dribbled past half the team for another, four minutes apart.'],
        ['Champions at the Azteca', 'Argentina beat West Germany 3–2. Burruchaga’s late winner came from a Maradona pass.'],
        ['Duckadam’s four saves', 'Steaua Bucharest beat Barcelona on penalties; goalkeeper Helmuth Duckadam saved all four kicks.']] },
    1987: { h: 'Napoli’s first Scudetto',
      p: P('Ruud Gullit|AC Milan|Netherlands', 'Paulo Futre|Atlético Madrid|Portugal', 'Emilio Butragueño|Real Madrid|Spain'),
      m: [['Naples celebrates', 'Maradona led Napoli to their first Serie A title, plus the Coppa Italia.'],
        ['Madjer’s backheel', 'Porto came from behind to beat Bayern 2–1 in Vienna, equalising with Rabah Madjer’s backheel.'],
        ['For Mandela', 'Ruud Gullit dedicated his Ballon d’Or to the imprisoned Nelson Mandela.']] },
    1988: { h: 'Van Basten’s volley',
      p: P('Marco van Basten|AC Milan|Netherlands', 'Ruud Gullit|AC Milan|Netherlands', 'Frank Rijkaard|AC Milan|Netherlands'),
      m: [['The volley in Munich', 'Van Basten’s volley from an impossible angle sealed a 2–0 win over the USSR and the Netherlands’ only major title.'],
        ['PSV’s treble', 'Guus Hiddink’s PSV won the league, the cup and the European Cup, on penalties against Benfica.'],
        ['The Crazy Gang', 'Wimbledon beat champions Liverpool 1–0 in the FA Cup final.']] },
    1989: { h: 'Sacchi’s Milan and Hillsborough',
      p: P('Marco van Basten|AC Milan|Netherlands', 'Franco Baresi|AC Milan|Italy', 'Frank Rijkaard|AC Milan|Netherlands'),
      m: [['Hillsborough', '97 Liverpool supporters were killed in a crush at the FA Cup semi-final in Sheffield on 15 April.'],
        ['It’s up for grabs now', 'Arsenal won the league at Anfield with Michael Thomas’s goal in the last minute of the last game.'],
        ['Milan’s masterclass', 'Sacchi’s Milan beat Steaua 4–0 in Barcelona, with two goals each from Gullit and van Basten.']] },
    1990: { h: 'Italia 90',
      p: P('Lothar Matthäus|Inter|West Germany', 'Salvatore Schillaci|Juventus|Italy', 'Andreas Brehme|Inter|West Germany'),
      m: [['Germany’s third', 'West Germany beat Argentina 1–0 in Rome with Andreas Brehme’s late penalty.'],
        ['Milla and Cameroon', 'Cameroon beat the holders in the opening game and reached the quarter-finals; Roger Milla, 38, danced at the corner flag.'],
        ['Gazza’s tears', 'Paul Gascoigne cried after a booking in the semi-final. England then lost on penalties.']] },
    1991: { h: 'Red Star and the first Women’s World Cup',
      p: P('Jean-Pierre Papin|Marseille|France', 'Dejan Savićević|Red Star Belgrade|Yugoslavia', 'Darko Pančev|Red Star Belgrade|Yugoslavia'),
      pn: 'Savićević, Pančev and Lothar Matthäus tied for second place.',
      m: [['Red Star in Bari', 'Red Star Belgrade beat Marseille on penalties after a 0–0 draw.'],
        ['The first Women’s World Cup', 'The USA beat Norway 2–1 in China; Michelle Akers scored both goals.'],
        ['English clubs return', 'Back in Europe after the Heysel ban, Manchester United beat Barcelona to win the Cup Winners’ Cup.']] },
    1992: { h: 'Denmark’s fairytale',
      p: P('Marco van Basten|AC Milan|Netherlands', 'Hristo Stoichkov|Barcelona|Bulgaria', 'Dennis Bergkamp|Ajax|Netherlands'),
      m: [['From holiday to trophy', 'Denmark replaced Yugoslavia days before the Euro and beat Germany 2–0 in the final.'],
        ['Koeman at Wembley', 'Ronald Koeman’s free-kick in extra time gave Cruyff’s Barcelona their first European Cup.'],
        ['New rules, new league', 'Goalkeepers could no longer pick up back-passes, and England’s Premier League was founded.']] },
    1993: { h: 'The first Champions League',
      p: P('Roberto Baggio|Juventus|Italy', 'Dennis Bergkamp|Inter|Netherlands', 'Eric Cantona|Manchester United|France'),
      m: [['Boli’s header', 'Marseille beat AC Milan 1–0 in Munich, the first French European champions, but a bribery scandal cost them the French title.'],
        ['Zambia air disaster', 'A plane carrying Zambia’s national team crashed off Gabon in April, killing 18 players.'],
        ['5–0 in Buenos Aires', 'Colombia thrashed Argentina in a World Cup qualifier and got a standing ovation from the home crowd.']] },
    1994: { h: 'Romário’s Brazil',
      p: P('Hristo Stoichkov|Barcelona|Bulgaria', 'Roberto Baggio|Juventus|Italy', 'Paolo Maldini|AC Milan|Italy'),
      m: [['Tetra in Pasadena', 'Brazil beat Italy on penalties after 0–0, the first final decided that way. Baggio missed the last kick.'],
        ['Milan 4–0 Barcelona', 'Capello’s Milan, missing key defenders, destroyed Cruyff’s Dream Team in Athens.'],
        ['Andrés Escobar', 'Colombia’s defender was shot dead in Medellín after scoring an own goal against the USA.']] },
    1995: { h: 'Bosman changes everything',
      p: P('George Weah|AC Milan|Liberia', 'Jürgen Klinsmann|Bayern Munich|Germany', 'Jari Litmanen|Ajax|Finland'),
      m: [['The Bosman ruling', 'In December the European Court of Justice allowed free transfers at the end of contracts and ended quotas on EU players.'],
        ['Kluivert, 18', 'Patrick Kluivert’s late goal beat AC Milan 1–0 and won the Champions League for a young Ajax.'],
        ['A Ballon d’Or for the world', 'The award opened to all nationalities. George Weah became the first African winner.']] },
    1996: { h: 'Germany win at Wembley',
      p: P('Matthias Sammer|Borussia Dortmund|Germany', 'Ronaldo|Barcelona|Brazil', 'Alan Shearer|Newcastle United|England'),
      m: [['Golden goal', 'Oliver Bierhoff’s golden goal beat the Czech Republic 2–1, the first major final decided that way.'],
        ['Nigeria’s gold', 'Nigeria won Olympic gold in Atlanta, beating Brazil and Argentina.'],
        ['Juventus on penalties', 'Juventus beat holders Ajax on penalties in Rome.']] },
    1997: { h: 'O Fenômeno',
      p: P('Ronaldo|Inter|Brazil', 'Predrag Mijatović|Real Madrid|FR Yugoslavia', 'Zinedine Zidane|Juventus|France'),
      m: [['Ronaldo, 21', 'After one dazzling season at Barcelona, Ronaldo moved to Inter for a world record and became the youngest Ballon d’Or winner yet.'],
        ['Ricken’s chip', 'Dortmund beat Juventus 3–1 in Munich. Substitute Lars Ricken scored with his first touch, a lob from 25 metres.'],
        ['The impossible free-kick', 'Roberto Carlos bent a free-kick around the wall against France, a shot that still defies physics.']] },
    1998: { h: 'Zidane’s France',
      p: P('Zinedine Zidane|Juventus|France', 'Davor Šuker|Real Madrid|Croatia', 'Ronaldo|Inter|Brazil'),
      m: [['Two headers at Saint-Denis', 'France beat Brazil 3–0 for their first World Cup. Zidane headed two goals; Ronaldo had been taken ill hours before.'],
        ['Owen and Bergkamp', 'Michael Owen’s solo goal against Argentina, then Dennis Bergkamp’s perfect touch and finish against them too.'],
        ['La Séptima', 'Real Madrid beat Juventus 1–0 for their first European Cup in 32 years.']] },
    1999: { h: 'Manchester United’s treble',
      p: P('Rivaldo|Barcelona|Brazil', 'David Beckham|Manchester United|England', 'Andriy Shevchenko|AC Milan|Ukraine'),
      m: [['Camp Nou injury time', 'Sheringham and Solskjær scored in stoppage time to beat Bayern 2–1 and complete the treble.'],
        ['The Rose Bowl', 'The USA won the Women’s World Cup on penalties against China in front of 90,000.'],
        ['Palmeiras’ first', 'Luiz Felipe Scolari’s Palmeiras won their first Libertadores, on penalties.']] },
    2000: { h: 'A golden goal and a galáctico',
      p: P('Luís Figo|Real Madrid|Portugal', 'Zinedine Zidane|Juventus|France', 'Andriy Shevchenko|AC Milan|Ukraine'),
      m: [['Trezeguet’s golden goal', 'France equalised in stoppage time and beat Italy 2–1 to hold the World Cup and the Euro at once.'],
        ['Figo crosses the divide', 'Barcelona’s captain joined Real Madrid for a world record. The first galáctico.'],
        ['Corinthians, world champions', 'Corinthians won the first FIFA Club World Championship in Brazil in January.']] },
    2001: { h: 'Kahn’s penalties',
      p: P('Michael Owen|Liverpool|England', 'Raúl|Real Madrid|Spain', 'Oliver Kahn|Bayern Munich|Germany'),
      m: [['Bayern on penalties', 'Oliver Kahn saved three penalties as Bayern beat Valencia.'],
        ['Germany 1–5 England', 'Michael Owen scored a hat-trick in Munich in a World Cup qualifier.'],
        ['Zidane to Madrid', 'Zidane joined Real Madrid for a world-record fee.']] },
    2002: { h: 'Ronaldo’s redemption',
      p: P('Ronaldo|Real Madrid|Brazil', 'Roberto Carlos|Real Madrid|Brazil', 'Oliver Kahn|Bayern Munich|Germany'),
      m: [['Penta', 'Brazil beat Germany 2–0 in Yokohama. Ronaldo scored both, eight in the tournament, four years after the 1998 final.'],
        ['Surprises in Asia', 'Senegal beat holders France in the opening game, and co-hosts South Korea reached the semi-finals.'],
        ['Zidane’s volley', 'Zidane’s left-foot volley at Hampden beat Bayer Leverkusen 2–1 in the Champions League final.']] },
    2003: { h: 'New money, new stars',
      p: P('Pavel Nedvěd|Juventus|Czech Republic', 'Thierry Henry|Arsenal|France', 'Paolo Maldini|AC Milan|Italy'),
      m: [['All-Italian at Old Trafford', 'AC Milan beat Juventus on penalties after 0–0. Shevchenko scored the winning kick.'],
        ['Abramovich buys Chelsea', 'The Russian billionaire’s takeover changed the economics of English football.'],
        ['Big moves', 'Beckham joined Real Madrid, Ronaldinho joined Barcelona, and an 18-year-old Cristiano Ronaldo joined Manchester United.']] },
    2004: { h: 'Greece, the great upset',
      p: P('Andriy Shevchenko|AC Milan|Ukraine', 'Deco|Barcelona|Portugal', 'Ronaldinho|Barcelona|Brazil'),
      m: [['Greece stun Portugal', 'Greece beat the hosts in the opener and again in the final, 1–0 in Lisbon.'],
        ['Mourinho’s Porto', 'José Mourinho’s Porto beat Monaco 3–0 in the Champions League final.'],
        ['The Invincibles', 'Arsenal went through the whole Premier League season unbeaten. In October, a 17-year-old Messi made his Barcelona debut.']] },
    2005: { h: 'Istanbul',
      p: P('Ronaldinho|Barcelona|Brazil', 'Frank Lampard|Chelsea|England', 'Steven Gerrard|Liverpool|England'),
      m: [['The miracle of Istanbul', '3–0 down to AC Milan at half-time, Liverpool scored three in six minutes and won on penalties.'],
        ['The Bernabéu applauds', 'Ronaldinho scored twice in a 3–0 win at Real Madrid, and the home fans gave him a standing ovation.'],
        ['Rogério Ceni’s São Paulo', 'São Paulo won the Libertadores and beat Liverpool 1–0 to become world champions.']] },
    2006: { h: 'Italy’s fourth, Zidane’s farewell',
      p: P('Fabio Cannavaro|Real Madrid|Italy', 'Gianluigi Buffon|Juventus|Italy', 'Thierry Henry|Arsenal|France'),
      m: [['Berlin', 'Italy beat France on penalties after 1–1. Zidane was sent off for a headbutt on Materazzi in his final match.'],
        ['Calciopoli', 'A match-fixing scandal cost Juventus two titles and sent them down to Serie B.'],
        ['Internacional shock Barcelona', 'Internacional won the Libertadores and beat Ronaldinho’s Barcelona 1–0 for the world title.']] },
    2007: { h: 'Kaká’s year',
      p: P('Kaká|AC Milan|Brazil', 'Cristiano Ronaldo|Manchester United|Portugal', 'Lionel Messi|Barcelona|Argentina'),
      m: [['Milan’s revenge', 'Two years after Istanbul, Filippo Inzaghi scored twice to beat Liverpool 2–1 in Athens.'],
        ['Messi’s Maradona goal', 'Messi ran from his own half past five players against Getafe, almost a copy of Maradona’s 1986 goal.'],
        ['Brazil beat Argentina', 'Brazil won the Copa América 3–0 against Argentina in Venezuela.']] },
    2008: { h: 'Spain’s golden age begins',
      p: P('Cristiano Ronaldo|Manchester United|Portugal', 'Lionel Messi|Barcelona|Argentina', 'Fernando Torres|Liverpool|Spain'),
      m: [['Torres in Vienna', 'Fernando Torres’s goal beat Germany 1–0 for Spain’s first major title since 1964.'],
        ['Moscow in the rain', 'Manchester United beat Chelsea on penalties after John Terry slipped taking the potential winner.'],
        ['LDU Quito', 'LDU won the first Libertadores for an Ecuadorian club, on penalties at the Maracanã.']] },
    2009: { h: 'Guardiola’s six trophies',
      p: P('Lionel Messi|Barcelona|Argentina', 'Cristiano Ronaldo|Real Madrid|Portugal', 'Xavi|Barcelona|Spain'),
      m: [['The sextuple', 'In his first full season, Pep Guardiola’s Barcelona won all six trophies they played for in a calendar year.'],
        ['Iniesta at Stamford Bridge', 'Iniesta’s stoppage-time goal at Chelsea took Barça to the final, where they beat Manchester United 2–0 in Rome.'],
        ['£80 million', 'Cristiano Ronaldo joined Real Madrid for a world-record fee.']] },
    2010: { h: 'Spain, champions of the world',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Lionel Messi|Barcelona|Argentina', 'Andrés Iniesta|Barcelona|Spain', 'Xavi|Barcelona|Spain'),
      m: [['Iniesta, minute 116', 'Iniesta’s extra-time goal beat the Netherlands 1–0 in Johannesburg at the first African World Cup.'],
        ['Suárez’s handball', 'Luis Suárez stopped a goal with his hands, and Ghana missed the penalty and a place in the semi-finals.'],
        ['Mourinho’s treble', 'Inter beat Bayern 2–0 in Madrid to complete the first treble by an Italian club.']] },
    2011: { h: 'Barcelona at their peak',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Lionel Messi|Barcelona|Argentina', 'Cristiano Ronaldo|Real Madrid|Portugal', 'Xavi|Barcelona|Spain'),
      m: [['Wembley masterclass', 'Barcelona beat Manchester United 3–1, a performance often called the best by any club side.'],
        ['Japan’s title', 'Months after the tsunami, Japan beat the USA on penalties to win the Women’s World Cup.'],
        ['Neymar’s Santos', 'Santos won the Libertadores with a 19-year-old Neymar, then lost 4–0 to Barcelona in Japan.']] },
    2012: { h: 'Agüero, 93:20',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Lionel Messi|Barcelona|Argentina', 'Cristiano Ronaldo|Real Madrid|Portugal', 'Andrés Iniesta|Barcelona|Spain'),
      m: [['93:20', 'Sergio Agüero’s stoppage-time goal against QPR won Manchester City their first title in 44 years.'],
        ['Spain make history', 'Spain beat Italy 4–0, becoming the first team to win Euro, World Cup and Euro in a row.'],
        ['91 goals', 'Messi scored 91 goals in the calendar year, beating Gerd Müller’s 1972 record. Chelsea won the Champions League in Bayern’s own stadium.']] },
    2013: { h: 'Bayern’s treble, Ferguson’s goodbye',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Cristiano Ronaldo|Real Madrid|Portugal', 'Lionel Messi|Barcelona|Argentina', 'Franck Ribéry|Bayern Munich|France'),
      m: [['All-German Wembley', 'Arjen Robben’s late goal beat Dortmund 2–1, and Bayern completed Germany’s first treble.'],
        ['Fergie retires', 'Alex Ferguson left Manchester United after 26 years and 38 trophies.'],
        ['Ronaldinho’s Galo', 'Atlético Mineiro won the Libertadores on penalties, and Brazil beat Spain 3–0 in the Confederations Cup.']] },
    2014: { h: 'The 7–1',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Cristiano Ronaldo|Real Madrid|Portugal', 'Lionel Messi|Barcelona|Argentina', 'Manuel Neuer|Bayern Munich|Germany'),
      m: [['Mineirazo', 'Germany beat hosts Brazil 7–1 in the semi-final in Belo Horizonte, five goals in the first 29 minutes.'],
        ['Götze at the Maracanã', 'Mario Götze’s extra-time goal beat Argentina 1–0 for Germany’s fourth title.'],
        ['La Décima', 'Sergio Ramos equalised at 92:48 and Real Madrid beat Atlético 4–1 for their tenth European Cup.']] },
    2015: { h: 'MSN and FIFAgate',
      pl: 'FIFA Ballon d’Or podium',
      p: P('Lionel Messi|Barcelona|Argentina', 'Cristiano Ronaldo|Real Madrid|Portugal', 'Neymar|Barcelona|Brazil'),
      m: [['A second treble', 'Messi, Suárez and Neymar scored 122 goals between them as Barcelona beat Juventus 3–1 in Berlin.'],
        ['FIFAgate', 'Police arrested FIFA officials at a Zurich hotel in May. Sepp Blatter was later banned.'],
        ['Chile’s first Copa', 'Hosts Chile beat Argentina on penalties; Alexis Sánchez chipped the winning kick.']] },
    2016: { h: 'Leicester, 5000–1',
      p: P('Cristiano Ronaldo|Real Madrid|Portugal', 'Lionel Messi|Barcelona|Argentina', 'Antoine Griezmann|Atlético Madrid|France'),
      m: [['The impossible title', 'Leicester City, 5000–1 outsiders, won the Premier League.'],
        ['Éder’s strike', 'Portugal lost Ronaldo to injury early in the final, then beat France 1–0 in extra time in Paris.'],
        ['Chapecoense', 'A plane carrying the Chapecoense team to the Copa Sudamericana final crashed in Colombia, killing 71. Their opponents asked that the title go to Chapecoense.']] },
    2017: { h: 'Real Madrid repeat',
      p: P('Cristiano Ronaldo|Real Madrid|Portugal', 'Lionel Messi|Barcelona|Argentina', 'Neymar|Paris Saint-Germain|Brazil'),
      m: [['Cardiff', 'Real Madrid beat Juventus 4–1, the first club to retain the trophy in the Champions League era.'],
        ['La Remontada', 'Barcelona lost 4–0 in Paris, then beat PSG 6–1 with three goals in the last seven minutes.'],
        ['€222 million', 'Neymar left Barcelona for PSG, more than doubling the world transfer record.']] },
    2018: { h: 'France, champions again',
      p: P('Luka Modrić|Real Madrid|Croatia', 'Cristiano Ronaldo|Juventus|Portugal', 'Antoine Griezmann|Atlético Madrid|France'),
      m: [['Moscow final', 'France beat Croatia 4–2. A 19-year-old Mbappé scored in the final; VAR was used at a World Cup for the first time.'],
        ['Bale’s bicycle kick', 'Gareth Bale’s overhead kick helped Real Madrid beat Liverpool 3–1 for a third title in a row.'],
        ['Superclásico in Madrid', 'After Boca’s bus was attacked, the River v Boca Libertadores final moved to the Bernabéu. River won 3–1 after extra time.']] },
    2019: { h: 'Anfield nights and Flamengo’s comeback',
      p: P('Lionel Messi|Barcelona|Argentina', 'Virgil van Dijk|Liverpool|Netherlands', 'Cristiano Ronaldo|Juventus|Portugal'),
      m: [['Corner taken quickly', 'Liverpool overturned a 3–0 deficit against Barcelona with a 4–0 win, then beat Tottenham 2–0 in the final.'],
        ['Gabigol’s three minutes', 'Flamengo were losing to River in Lima until Gabriel Barbosa scored in the 89th and 92nd minutes.'],
        ['Rapinoe’s summer', 'The USA retained the Women’s World Cup in France, and Brazil won the Copa América at home.']] },
    2020: { h: 'Football in empty stadiums',
      pl: 'FIFA The Best podium',
      pn: 'The Ballon d’Or was not awarded in 2020 because of the pandemic.',
      p: P('Robert Lewandowski|Bayern Munich|Poland', 'Cristiano Ronaldo|Juventus|Portugal', 'Lionel Messi|Barcelona|Argentina'),
      m: [['The pandemic', 'COVID-19 stopped football in March. It came back behind closed doors, and the Euro and Copa América moved to 2021.'],
        ['Lisbon’s Final Eight', 'Bayern beat Barcelona 8–2 and PSG 1–0, the first club to win every game of a Champions League campaign.'],
        ['Goodbye, Diego', 'Diego Maradona died on 25 November, aged 60. Liverpool had won their first league title in 30 years.']] },
    2021: { h: 'Messi’s first Copa',
      p: P('Lionel Messi|Paris Saint-Germain|Argentina', 'Robert Lewandowski|Bayern Munich|Poland', 'Jorginho|Chelsea|Italy'),
      m: [['At the Maracanã', 'Ángel Di María’s goal beat Brazil 1–0, Messi’s first major title with Argentina.'],
        ['Wembley shootout', 'Italy beat England on penalties to win Euro 2020. Earlier, Christian Eriksen collapsed and was resuscitated on the pitch.'],
        ['Super League collapses', 'Twelve clubs announced a breakaway European Super League. Fan protests sank it within 48 hours.']] },
    2022: { h: 'Messi’s World Cup',
      p: P('Karim Benzema|Real Madrid|France', 'Sadio Mané|Bayern Munich|Senegal', 'Kevin De Bruyne|Manchester City|Belgium'),
      m: [['The greatest final?', 'Argentina and France drew 3–3 in Lusail; Mbappé scored a hat-trick, Messi two, and Argentina won on penalties.'],
        ['Morocco’s run', 'Morocco became the first African team to reach a World Cup semi-final.'],
        ['O Rei', 'Pelé died on 29 December, aged 82.']] },
    2023: { h: 'City’s treble',
      p: P('Lionel Messi|Inter Miami|Argentina', 'Erling Haaland|Manchester City|Norway', 'Kylian Mbappé|Paris Saint-Germain|France'),
      m: [['Istanbul', 'Rodri’s goal beat Inter 1–0, and Manchester City completed the treble.'],
        ['Spain’s women', 'Spain beat England 1–0 in Sydney to win the Women’s World Cup.'],
        ['Fluminense’s first', 'Fluminense beat Boca Juniors 2–1 after extra time at the Maracanã. Napoli won Serie A for the first time in 33 years.']] },
    2024: { h: 'Spain’s fourth Euro',
      p: P('Rodri|Manchester City|Spain', 'Vinícius Júnior|Real Madrid|Brazil', 'Jude Bellingham|Real Madrid|England'),
      m: [['Berlin', 'Spain beat England 2–1. Sixteen-year-old Lamine Yamal had scored a stunning goal against France in the semi-final.'],
        ['Unbeaten Leverkusen', 'Xabi Alonso’s Bayer Leverkusen won the Bundesliga without losing a game, ending Bayern’s run of 11 titles.'],
        ['Botafogo’s double', 'Botafogo beat Atlético Mineiro 3–1 in the Libertadores final despite a red card in the first minute, then won the league.']] },
    2025: { h: 'PSG at last',
      p: P('Ousmane Dembélé|Paris Saint-Germain|France', 'Lamine Yamal|Barcelona|Spain', 'Vitinha|Paris Saint-Germain|Portugal'),
      m: [['Munich rout', 'PSG beat Inter 5–0, the biggest winning margin in a European Cup final.'],
        ['A new Club World Cup', 'Chelsea won the first 32-team Club World Cup in the USA, beating PSG 3–0.'],
        ['Flamengo’s double', 'Danilo’s header beat Palmeiras 1–0 in Lima for Flamengo’s fourth Libertadores, and they won the Brasileirão too.']] },
    2026: { h: 'Spain rule the world again',
      w: 'Alexia Putellas|Barcelona|Spain',
      p: P('Harry Kane|Bayern Munich|England', 'Kylian Mbappé|Real Madrid|France', 'Lamine Yamal|Barcelona|Spain'),
      note: 'Season in progress: the Libertadores final (Palmeiras v Estudiantes) is on 28 November and the Brasileirão is still being played.',
      m: [['MetLife Stadium', 'Ferran Torres scored in the 106th minute to beat Argentina 1–0 in the first 48-team World Cup. Spain held the men’s and women’s titles at once.'],
        ['PSG retain', 'PSG drew 1–1 with Arsenal in Budapest and won the shootout 4–3, keeping the Champions League.'],
        ['Kane’s year', 'Arsenal won their first league title in 22 years. Harry Kane became the first English Ballon d’Or winner since 2001; Mbappé won a second Golden Boot.']] }
  };
  var womensBallon = { 2018: 'Ada Hegerberg|Lyon|Norway', 2019: 'Megan Rapinoe|Reign FC|USA', 2021: 'Alexia Putellas|Barcelona|Spain',
    2022: 'Alexia Putellas|Barcelona|Spain', 2023: 'Aitana Bonmatí|Barcelona|Spain', 2024: 'Aitana Bonmatí|Barcelona|Spain',
    2025: 'Aitana Bonmatí|Barcelona|Spain' };
  Object.keys(womensBallon).forEach(function (y) { years[y].w = womensBallon[y]; });

  // Assemble one object per year for the page.
  function trophy(label, entry) { return entry && { label: label, winner: entry[0], detail: entry[1], host: entry[2] }; }
  function split(label, entry) { if (!entry) return null; var parts = entry.split('|'); return { label: label, winner: parts[0], detail: parts[1] }; }
  var all = {};
  for (var y = FIRST; y <= LAST; y++) {
    var story = years[y], i = y - FIRST;
    all[y] = {
      year: y,
      headline: story.h,
      podiumLabel: story.pl || 'Ballon d’Or podium',
      podiumNote: story.pn || '',
      podium: story.p.map(function (p) { return { name: p[0], club: p[1], nation: p[2] }; }),
      womensBallon: story.w ? (function (w) { return { name: w[0], club: w[1], nation: w[2] }; })(story.w.split('|')) : null,
      note: story.note || '',
      moments: story.m.map(function (m) { return { title: m[0], text: m[1] }; }),
      international: [trophy('World Cup', worldCup[y]), trophy('Euro', euro[y]), trophy('Copa América', copaAmerica[y]),
        trophy('Women’s World Cup', womensWorldCup[y])].filter(Boolean),
      clubs: [split(y < 1993 ? 'European Cup' : 'Champions League', europe[i]),
        libertadores[i] ? split('Copa Libertadores', libertadores[i]) : { label: 'Copa Libertadores', winner: 'In progress', detail: 'Final 28 Nov: Palmeiras v Estudiantes', pending: true }]
        .concat((worldClub[y] || []).map(function (c) { return { label: c[0], winner: c[1], detail: c[2] }; })),
      leagues: leagues.map(function (l) {
        var champ = l.champions[i];
        return { id: l.id, country: l.country, name: l.name, winner: champ || 'In progress', pending: !champ };
      })
    };
  }

  return { first: FIRST, last: LAST, eras: eras, leagues: leagues, years: all, worldCupYears: Object.keys(worldCup).map(Number) };
})();

if (typeof module !== 'undefined') module.exports = FOOTBALL;
