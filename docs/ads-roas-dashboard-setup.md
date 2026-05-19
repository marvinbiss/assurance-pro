# Dashboard ROAS — Setup Guide

## Stack tracking

```
[User clic ad] → URL avec UTM params (?utm_source=google&utm_medium=cpc&utm_campaign=X)
   ↓
[Landing page Vivos] → captureFirstTouch() → cookie 30j first-touch attribution
   ↓
[Conversion] → trackAdsConversion() → push GA4 + Meta + Google Ads
   ↓
[Dashboard] → GA4 reports + Looker Studio
```

## Configuration GA4 (Google Analytics 4)

### Events à créer comme conversions

Dans GA4 → Admin → Events → Mark as conversion :

- `ads_conversion` (event principal, paramètres dynamiques)
- `preinscription_warm_lead` (pré-ORIAS)
- `devis_submitted` (post-ORIAS)
- `contract_signed` (revenue final)

### Custom dimensions à créer

Dans GA4 → Admin → Custom definitions :

| Dimension name | Event parameter | Scope |
| -------------- | --------------- | ----- |
| Source UTM     | source          | Event |
| Campaign UTM   | campaign        | Event |
| Keyword UTM    | keyword         | Event |
| Vertical       | vertical        | Event |
| Métier         | metier          | Event |
| Ville          | ville           | Event |

### Goal value (revenue tracking)

`ads_conversion` event a un paramètre `value` (commission estimée €).
GA4 reportera revenue par campaign / source / keyword automatiquement.

---

## Configuration Google Ads

### Conversion actions

Dans Google Ads → Tools → Conversions → New conversion action :

1. **Préinscription** (lead generation)
   - Category: Lead
   - Value: 0€ (warm lead, pas revenue immédiat)
   - Count: One per click

2. **Devis envoyé** (intent strong)
   - Category: Submit lead form
   - Value: 50€ (proxy intent value)
   - Count: One per click

3. **Contrat signé** (revenue final)
   - Category: Purchase
   - Value: Use the value from event (`commission` param)
   - Count: One per click

### Import GA4 conversions vers Google Ads

Linker GA4 ↔ Google Ads:

- GA4 Admin → Product Links → Google Ads
- Importer les events `ads_conversion` comme conversions Google Ads
- Permet smart bidding (Target ROAS) une fois > 30 conversions

---

## Configuration Meta Pixel (Facebook Ads)

### Events standard à fire

```js
// Capturé automatiquement par trackAdsConversion() si fbclid présent
fbq('track', 'Lead', {
  content_name: 'Préinscription Vivos',
  value: 0,
  currency: 'EUR',
})

fbq('track', 'SubmitApplication', {
  content_name: 'Devis Vivos',
  value: 50,
  currency: 'EUR',
})

fbq('track', 'Purchase', {
  value: 500, // commission moyenne
  currency: 'EUR',
})
```

### CAPI (Conversion API) côté serveur — optionnel mais reco

Backend send events via Facebook CAPI pour bypass iOS 14+ tracking restrictions :

- Hash email/téléphone client (SHA-256) → match Meta user
- Send avec `event_source_url` + `fbclid` capturé
- ~30-50% lift sur attribution

À implémenter dans `/api/preinscription/route.ts` (server-side) post-MVP.

---

## Dashboard Looker Studio (gratuit)

### Connecter sources

1. **GA4** (compte Vivos)
2. **Google Ads** (compte Vivos)
3. **Supabase** (via Supabase REST API + connector custom)

### Pages dashboard recommandées

#### Page 1 — ROAS par campagne

Tableau :

- Campaign
- Impressions / Clics / CPC
- Conversions (préinscription / devis / contrat)
- Coût / Revenue / ROAS
- Filtrer par : période, vertical, statut

#### Page 2 — Funnel conversion

Visualisation funnel :

- Ad clic → Landing view → Form start → Form submit → Devis → Contrat signé
- Conversion rate chaque étape
- Identifier dropoff points

#### Page 3 — Attribution multi-touch

Comparaison :

- First-touch (UTM premier landing)
- Last-touch (UTM dernière session)
- Position-based (40% first, 40% last, 20% middle)

#### Page 4 — Cohorte LTV

Mesure :

- Mois de signup
- Revenue cumulé / client / mois (M1, M3, M6, M12)
- Calcul LTV par canal d'acquisition

---

## Métriques clés à monitorer (weekly review)

### Métriques santé ads

| Métrique                       | Cible            | Action si raté                     |
| ------------------------------ | ---------------- | ---------------------------------- |
| CTR ad                         | > 3%             | Refactor headline + extensions     |
| Quality Score Google           | > 7/10           | Améliorer landing + match keywords |
| CPC moyen                      | < 12€            | Bid down + negative keywords       |
| Conversion rate landing        | > 8%             | A/B test hero, simplifier form     |
| Cost per Lead (préinscription) | < 60€            | Pause campagne si > 120€/7j        |
| Cost per Devis (post-ORIAS)    | < 30% commission | Kill si > 50% commission           |

### Métriques santé pipeline

| Métrique                   | Cible                | Action                                 |
| -------------------------- | -------------------- | -------------------------------------- |
| Taux d'ouverture email J+1 | > 60%                | Subject A/B test                       |
| Taux clic email J+7        | > 15%                | CTA copy + design test                 |
| Taux clic email J+14       | > 12%                | Case study testimonial diversification |
| Désinscription rate global | < 2%                 | Revoir fréquence + pertinence          |
| Activation ORIAS day-1     | > 40% des warm leads | Email blast + retargeting Meta         |

---

## Setup checklist (à compléter)

- [ ] GA4 events `ads_conversion`, `preinscription_warm_lead`, etc. créés comme conversions
- [ ] Custom dimensions GA4 (source, campaign, keyword, vertical, metier, ville)
- [ ] Google Ads conversion actions configurées (Lead, SubmitApplication, Purchase)
- [ ] GA4 ↔ Google Ads link activé + imports conversions
- [ ] Meta Pixel ID configuré dans variables env (`NEXT_PUBLIC_META_PIXEL_ID`)
- [ ] Meta CAPI token configuré (post-MVP)
- [ ] Looker Studio dashboard créé avec 4 pages ci-dessus
- [ ] Cron `/api/cron/nurture-emails` activé (Vercel Cron 9h UTC)
- [ ] Migration Supabase `024_nurture_pipeline.sql` appliquée
- [ ] Variables env Vercel : `RESEND_API_KEY`, `CRON_SECRET`, `NEXT_PUBLIC_GTM_ID`

---

## Coûts mensuels stack tracking

| Outil                            | Coût mensuel               |
| -------------------------------- | -------------------------- |
| GA4                              | 0€ (gratuit)               |
| Google Ads tracking              | 0€ (inclus)                |
| Meta Pixel                       | 0€ (inclus)                |
| Resend (email transactionnel)    | 20€/mois (10k emails/mois) |
| Looker Studio                    | 0€ (gratuit)               |
| Supabase Pro (volume warm leads) | 25€/mois                   |
| **Total**                        | **45€/mois**               |

---

## Activation séquentielle

### Phase 0 — Avant lancement ads (NOW)

1. Appliquer migration Supabase 024
2. Tester `/ads/decennale-plombier-auto-entrepreneur` (form submission OK)
3. Vérifier dataLayer events fire (Chrome DevTools → Console → `dataLayer`)
4. Setup GA4 events + conversions
5. Setup Looker Studio dashboard

### Phase 1 — Soft launch ads (500€/mois)

1. Activer 1-2 ads Google sur TIER 1 niches (décennale plombier AE / RC Pro freelance IT)
2. URL ads = landing `/ads/decennale-plombier-auto-entrepreneur` (ou équivalent)
3. Monitor ROAS daily pendant 14 jours
4. Si CPL < 60€ + conversion > 8% → continuer
5. Si non → kill + retravailler landing/copy

### Phase 2 — Scale ads (post-ORIAS, 2-5k€/mois)

1. Activate full TIER 1 (5 niches)
2. Tester TIER 2 (10 niches) progressivement
3. Lancer email nurture pipeline (cron actif)
4. Mesurer ROAS par cohorte mensuelle

### Phase 3 — Optimization (post-PMF, 5-15k€/mois)

1. Smart bidding (Target ROAS 250%) sur campagnes mûres
2. Lookalike audiences Meta basées sur convertisseurs Vivos
3. Retargeting visiteurs landing sans conversion
4. Embedded API distribution (Malt / Pennylane partnerships)
