# Közlemények és bannerek

## Mit kell tudni?

A közlemények és bannerek rövid, fontos üzenetek, amelyeket az oldal tetején vagy más helyeken jeleníthetsz meg. Például: "Szünet az év végén" vagy "Új oktatóink érkeztek!" stb.

Ez az útmutató elmagyarázza, hogyan hozhatsz létre, módosíthatsz és publikálhatsz közleményeket és bannereket.

---

## Mik a bannerek?

### Közlemény banner (Announcement)
Egy lezárható üzenet az oldal tetején, általában **piros/sárga szín**. Például:

```
⚠️ FONTOS: Hétfő szünnap - nincs órák
[X] Bezárás
```

### Új szolgáltatás banner (New Service)
Egy promóciós banner egy új vagy kiemelt szolgáltatásról. Például:

```
🎉 ISMERETS: Pilátesz órák nyitottak most!
[További információ]
```

---

## Automatikus bannerek

A rendszer bizonyos műveletekkor **automatikusan generál és publikál** bannereket:

### Szolgáltatás törlése → Közlemény banner
Ha **törölsz egy szolgáltatást**, a rendszer automatikusan létrehoz és publikál egy **Announcement (Közlemény) bannert**. Például:

```
⚠️ A "Jóga kezdő" szolgáltatás már nem elérhető
```

Ez a látogatókat automatikusan értesíti, hogy egy szolgáltatás már nem elérhető.

### Új szolgáltatás hozzáadása → New Service banner
Ha **új szolgáltatást adsz hozzá**, a rendszer automatikusan létrehoz és publikál egy **New Service bannert**. Például:

```
🎉 ÚJ SZOLGÁLTATÁS: Pilátesz órák most indulnak!
[További információ]
```

Ez automatikusan kiemeli az új szolgáltatást a látogatóknak.

### Fontos:
- Ezek a bannerek **automatikusan publikálódnak** (azonnal láthatók)
- Később **módosíthatod vagy kikapcsolhatod** őket a Beállításokban
- A rendszer felülírja a meglévő bannereket.

---

## Hol lehet a bannereket kezelni?

### Közlemény (Announcement):

1. **Megy a "Beállítások"-ra**
2. **A bal oldali menüben válaszd a "Közlemény"-t**
3. Egy szerkesztő felület jelenik meg

### Új szolgáltatás (New Service):

1. **Megy a "Beállítások"-ra**
2. **A bal oldali menüben válaszd az "Új szolgáltatás"-t**
3. Egy szerkesztő felület jelenik meg

---

## Közlemény létrehozása/módosítása

### Lépések:

1. **Megy a "Beállítások" > "Közlemény"-re**
2. **Kitöltsd a mezőket:**

#### Megjelenítés be/ki:
- **Bekapcsolva (pipa):** A közlemény látható az oldal tetején
- **Kikapcsolva:** A közlemény rejtett (de mentheted később)

#### Szöveg:
- **Cím:** Az üzenet fő szövege (pl. "Szünet az év végén")
- **Leírás:** További részletek (opcionális, pl. "2024. december 20-31-ig zárva")

#### Szín beállítások:
- **Háttér szín:** Az üzenet háttere (pl. piros vagy sárga)
- **Szöveg szín:** Az üzenet szövegének szín

#### Ikon (opcionális):
- **Választható ikon:** Figyelmeztető, információ, stb.

3. **Kattints a "Közzététel" gombra** - Az oldal módosul és a közlemény látható!

### Praktikus példa:

```
Bekapcsolva: ✓ IGEN
Cím: "Szünet az év végén"
Leírás: "2024. december 20-31-ig zárva vagyunk. Szép ünnepeket!"
Háttér szín: Sárga
Szöveg szín: Fekete
```

---

## Új szolgáltatás banner létrehozása/módosítása

### Lépések:

1. **Megy a "Beállítások" > "Új szolgáltatás"-ra**
2. **Kitöltsd a mezőket:**

#### Megjelenítés be/ki:
- **Bekapcsolva (pipa):** A banner látható az oldal tetején
- **Kikapcsolva:** A banner rejtett

#### Szöveg:
- **Cím:** Az új szolgáltatás neve (pl. "Pilátesz órák indulnak!")
- **Leírás:** Rövid információ (pl. "Egy fantasztikus új oktatóval")

#### Kép:
- **Banner képe:** Egy nagy kép vagy grafika
- Kattints a "Kép kiválasztása"-ra és válassz az előre feltöltött képekből

#### Gombok (opcionális):
- **Gomb szövege:** Pl. "További információ"
- **Gomb hivatkozása:** Hova mutasson (pl. `/service/pilates`)

3. **Kattints a "Közzététel" gombra** - Kész!

### Praktikus példa:

```
Bekapcsolva: ✓ IGEN
Cím: "Új pilátesz órák!"
Leírás: "Csatlakozz a modern pilátesz edzéshez, hétfő 18:00-19:00-ig"
Kép: pilates-2024
Gomb szövege: "Tudj meg többet"
Gomb hivatkozása: /#services
```

---

## Banner elsüllyedése/rejtése

### Ha szeretnél elrejteni egy bannert:

**Közlemény:**
1. Megy a "Beállítások" > "Közlemény"-re
2. **Kapcsold ki az "Engedélyezés" kapcsolót**
3. Kattints a "Közzététel" gombra
4. A banner már nem látható

**Új szolgáltatás:**
1. Megy a "Beállítások" > "Új szolgáltatás"-ra
2. **Kapcsold ki az "Engedélyezés" kapcsolót**
3. Kattints a "Közzététel" gombra
4. A banner már nem látható

### Figyelem:
- Az oldal **még mutatja a szerkesztő felületet** (jelöléssel: TIPP!)
- Ha **kikapcsolod**, a látogató nem látja
- Később **újra bekapcsolhatod**

---

## Bannerek helyei az oldalon

### Közlemény helyét:
- Az oldal tetején jelenik meg, az összes oldal felett
- Ha a látogató bezárja, már nem látja a végig (amíg vissza nem frissít)

### Új szolgáltatás banner helyét:
- Az oldal tetején jelenik meg, a közlemény alatt
- Promóciós célra használd

---

## Gyakorlatok és tanácsok

### Mikor használj közleményt?

✅ **Jó esetek:**
- Szünet vagy bezárás
- Fontos biztonsági figyelmeztetés
- Szél-e az óra időpontjaiban
- Speciális esemény
- Technikai probléma

❌ **Kerüld el:**
- Marketing üzenetek (inkább az "Új szolgáltatás" bannert használd)
- Hosszú szövegek (max. 1-2 mondat)
- Gyakori módosítás (zavaró lehet)

### Mikor használj "Új szolgáltatás" bannert?

✅ **Jó esetek:**
- Tényleg új szolgáltatás
- Speciális promóció
- Kedvezményes ajánlat
- Kiemelt esemény
- Visszatérő hirdetés

❌ **Kerüld el:**
- Régi információ
- Hamis promóciók
- Túl sok szöveg
- Rossz szín kombináció (nehezen olvasható)

---

## Problémamegoldás

### "A banner nem jelenik meg"
- Ellenőrizd, hogy az **"Engedélyezés" bekapcsolt**-e
- Kattints a **"Közzététel"** gombra (ne csak piszkozat mentése)
- Frissítsd az oldalt (F5)

### "A banner szövege nem jó"
- Módosítsd a szöveget
- Kattints a **"Közzététel"** gombra

### "A kép nem jelenik meg a banneren"
- Előbb fel kell tölteni a képet az "Képek" szekció
- Válassz ki egy feltöltött képet a sorkészítőben

### "Túl sok banner van egyszerre"
- Ez zavaró lehet a látogatóknak
- Egy-két banner ideális
- Kapcsold ki a régieket

### "Az előnézet nem mutat semmit"
- Ha **kikapcsolt** az engedélyezés, nem látod az előnézetet
- Kattints az "Engedélyezés" kapcsolóra a bekapcsoláshoz

---

## Tippek az effektív bannerekhez

### Közlemény:
- Rövid és érthető
- Fontossá kell lennie
- Például: "Szünet december 24-31-ig 🎄"

### Új szolgáltatás:
- Vonzó kép
- Érdekes cím
- Akciógomb az információhoz
- Például: "Spanyol tánc osztályok! 💃"

---

## Kapcsolódó útmutatók
- [Az oldal szerkesztése](./03-oldal-szerkesztese.md)
- [Képek kezelése](./04-kepek-kezelese.md)
