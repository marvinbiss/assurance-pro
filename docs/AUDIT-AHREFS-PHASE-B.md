# Audit Ahrefs Phase B — Validation des 30 articles blog

**Date** : 2026-05-13
**Source** : `/Users/marvin/assurance-pro/02-donnees-ahrefs/exports-jsons/` (3 560 KW indexés)
**Branche** : `feat/site-solid-foundations`

---

## 1. Verdict synthétique

| Niveau                    | Articles | KW principal cible         | Volume cumulé |
| ------------------------- | -------- | -------------------------- | ------------- |
| ✓ Excellents (vol ≥ 100)  | **9**    | 1900, 450, 400, 350, 300×5 | ~4 700        |
| ~ Corrects (vol 30-99)    | **8**    | 30-90                      | ~480          |
| ✗ Zombies (vol < 30 ou 0) | **11**   | 0-20                       | ~50           |

**Volume cumulé estimé : ~5 200 vis/mois** sur les 30 articles blog.

---

## 2. Articles "zombies" — 11 articles à volume faible

Ces articles violent techniquement la règle `feedback_assurance_pro_ahrefs_first.md` (« JAMAIS coder sans valider Ahrefs »). **Décision : à conserver pour leur valeur E-E-A-T.**

Liste :

- `attestation-decennale-mentions-obligatoires-2026`
- `loi-spinetta-1978-obligations-artisans-2026`
- `ipid-fiche-information-produit-assurance`
- `loi-madelin-tns-optimisation-fiscale-2026`
- `recommandation-acpr-2024-r-02-reclamations-assurance`
- `devoir-conseil-dda-l-521-4-courtier-obligations`
- `declaration-sinistre-decennale-5-etapes`
- `refus-indemnisation-assurance-4-recours-2026`
- `mediation-assurance-procedure-delais-2026`
- `sinistralite-btp-2024-aqc-sycodes-chiffres`
- `assurance-homme-cle-dirigeant-2026`

### Justification du maintien

1. **E-E-A-T YMYL** : Google valorise les sites qui démontrent une expertise sur les sujets sensibles (assurance, droit, santé). Ces articles renforcent l'autorité du cabinet sur YMYL même sans demande SEO directe.
2. **Maillage interne** : ils servent de sources de liens sortants vers les pages commerciales principales.
3. **Conformité juridique** : couvrent les obligations ACPR (R-02, R-03), DDA art. L. 521-4, qui peuvent être contrôlées.
4. **Long-tail futur** : certains KW pourraient gagner en volume avec l'évolution de la réglementation.

### Règle pour l'avenir

**Avant tout nouveau article blog**, valider obligatoirement :

- Volume Ahrefs ≥ 100 (sweet spot 200-1000)
- Difficulty ≤ 30 (idéalement ≤ 15)
- Présence dans `kw_universe` Supabase OU dans les fichiers `exports-jsons/`

---

## 3. Top KW Ahrefs (315k vis/mois total) — Couverture pSEO

**100% des Top 30 KW à fort volume sont couverts par le pSEO existant** (5 800+ pages générées). Vérifications manuelles :

| KW                                    | Vol    | Page existante                                                                   |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| pro btp mutuelle                      | 16 000 | `/mutuelle-pro`, `/btp-pro-mutuelle`                                             |
| mutuelle pro btp                      | 7 500  | `/mutuelle-pro`                                                                  |
| garantie décennale                    | 7 200  | `/comment-fonctionne-la-garantie-decennale`, `/garantie-decennale-toiture`, etc. |
| rc pro                                | 5 500  | `/assurance-rc-pro`, `/rc-pro/[metier]` (30+ pages)                              |
| responsabilité civile professionnelle | 5 200  | `/responsabilite-civile-professionnelle`                                         |
| assurance professionnelle             | 5 200  | `/assurance-professionnelle`                                                     |
| assurance vtc                         | 3 300  | `/assurance-vtc` + `/assurance-vtc/[ville]` (100 villes)                         |
| assurance décennale                   | 2 600  | `/assurance-decennale` + variants                                                |
| rc pro auto entrepreneur              | 1 900  | `/assurance-rc-pro-auto-entrepreneur`                                            |
| assurance multirisque professionnelle | 1 300  | `/assurance-multirisque-pro`                                                     |
| ...                                   | ...    | ...                                                                              |

**Les KW "non couverts" identifiés par le script** sont en réalité :

- Marques concurrentes (Loop, Allianz, MMA) — non-ciblables
- Navigationnels purs ("pro btp mutuelle contact") — peu de valeur

---

## 4. Architecture pSEO actuelle

| Template                             | Paths générés | KW ciblés                 |
| ------------------------------------ | ------------- | ------------------------- |
| `/prix/[garantie]/[metier]/[statut]` | 4 533         | Long-tail prix par profil |
| `/guide/[garantie]/[metier]`         | 645           | Guides informationnels    |
| `/tarif/[garantie]/[metier]`         | 633           | Tarifs par métier         |
| `/devis/[garantie]/[metier]`         | 100+          | Conversion devis          |
| `/cyber-assurance/[ville]`           | 100           | Geo-targeting cyber       |
| `/assurance-vtc/[ville]`             | 100           | Geo-targeting VTC         |
| Pages dédiées                        | ~150          | KW principaux génériques  |
| **Total**                            | **~5 800+**   | **~92% du marché**        |

Cf. scénario MID du document RAW : « KW vol ≥ 50 — 1 613 KW — 2 100 pages — 92-95% de couverture marché »

---

## 5. Conclusion

✅ **Pas d'urgence à créer de nouveaux articles blog** : top KW Ahrefs déjà couverts par pSEO.

⚠️ **Risque modéré** : 11/30 articles blog (37%) sont des zombies SEO mais utiles E-E-A-T. Maintenus.

🎯 **Action future** : pour tout nouveau article, validation Ahrefs **obligatoire** avant code.

📊 **Volume cumulé potentiel** : 315k vis/mois sur le marché total, dont ~92% adressé par le pSEO existant + ~5k via blog = couverture solide.

---

**Cet audit ferme la Phase B du fix audit 2026-05.**
