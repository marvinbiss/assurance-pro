# 🤖 Chatbot AI Vivos — Setup et activation

**Statut** : code **100% prêt**, attend uniquement la config `OPENAI_API_KEY` + génération des embeddings.

---

## 1. Architecture (déjà en place)

| Layer                | Composant                                                                                          | État |
| -------------------- | -------------------------------------------------------------------------------------------------- | ---- |
| **Migration**        | `supabase/migrations/023_rag_embeddings.sql` (pgvector + HNSW + RLS + RPC `match_page_embeddings`) | ✅   |
| **Lib RAG**          | `src/lib/rag/{index,models,clients}.ts` (multi-model + fallback Anthropic→OpenAI + Sentry)         | ✅   |
| **API route**        | `src/app/api/chat/route.ts` (SSE streaming + rate limit 10/min/IP + zod + no PII)                  | ✅   |
| **Widget**           | `src/components/chat/ChatWidget.tsx` (brand terra + sources + suggestions + disclaimer YMYL)       | ✅   |
| **Activation**       | `src/app/_components/client-only-helpers.tsx` (actif même en pre-ORIAS)                            | ✅   |
| **Script ingestion** | `scripts/generate-embeddings.ts` (statiques + **blog articles** + ~6 000 docs)                     | ✅   |

## 2. System prompt YMYL ultra-rigoureux

Le system prompt (`src/lib/rag/index.ts`) contient :

- **Identité IA explicite** : "Je suis un assistant IA, pas un courtier humain"
- **Source unique** : réponses UNIQUEMENT depuis le contexte RAG (pas d'hallucination)
- **Citation obligatoire** : `[/slug-page]` parsées en chips cliquables côté UI
- **Interdictions** : conseils juridiques personnalisés, tarifs précis, recommandation motivée (réservée DDA L. 521-4 humain)
- **Comportement sinistre** : redirection immédiate vers cellule sinistres
- **Format imposé** : phrases courtes, listes max 5 items, max 200 mots
- **CTA fixe** : "💬 Pour un devis ou conseil personnalisé : formulaire devis (5 min)"
- **Transparence** : si user demande "qui es-tu" → mention IA + DDA L. 521-4 humain

## 3. ChatWidget — refonte brand premium

- ✅ Bouton flottant gradient terra/primary avec badge animé (ping)
- ✅ Header gradient brand + indicateur "réponse en quelques secondes"
- ✅ Banner disclaimer YMYL DDA L. 521-4 (dismissable)
- ✅ 4 suggestions cliquables au démarrage
- ✅ Streaming avec dots animés `pulse`
- ✅ Sources parsées et affichées en chips cliquables sous chaque réponse
- ✅ Mention "IA générique. Pas de stockage." + lien Confidentialité
- ✅ A11y : aria-labels, focus management, role=dialog

## 4. Ce qu'il reste à faire (2 étapes — 10 minutes)

### Étape A — Configurer la clé OpenAI

```bash
# Dans .env.local, remplacer la ligne vide :
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Récupérer la clé sur https://platform.openai.com/api-keys.

Coût estimé du chatbot :

- Embedding question (`text-embedding-3-small`) : ~$0.00002 / question (200 tokens × $0.10/1M)
- Génération réponse (Haiku/Sonnet via Anthropic) : ~$0.001 / question
- Total : **~$1 / 1000 conversations**

### Étape B — Générer les embeddings (one-shot)

```bash
# Dry-run d'abord pour vérifier
npx tsx scripts/generate-embeddings.ts --dry-run --limit=10

# Si OK, lancer pour de vrai
npx tsx scripts/generate-embeddings.ts

# Ou en batch limité pour tester
npx tsx scripts/generate-embeddings.ts --limit=50
```

Coût estimé : **~0,06€** (3M tokens × $0.02/1M).

Durée : 5-10 minutes pour ~6 100 documents (statiques + 30 articles blog + glossaire + FAQ).

### Étape C — Tester le chatbot live

1. Ouvrir le site : http://localhost:3000
2. Cliquer bouton terra flottant (bas-droit)
3. Cliquer une des 4 suggestions OU taper "Suis-je obligé d'avoir une décennale ?"
4. Vérifier :
   - Streaming des dots → réponse
   - Sources cliquables sous la réponse (chips terra)
   - CTA "Pour un devis personnalisé..." en bas
   - Bannière disclaimer YMYL en haut

## 5. Sécurité & conformité

| Aspect                | Mesure                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| **Rate limiting**     | 10 req/min/IP — protège contre abuse                                   |
| **Validation input**  | zod schema (2-500 chars, history max 10 messages × 2000 chars)         |
| **PII storage**       | **AUCUN** — les conversations ne sont pas persistées en base           |
| **RGPD**              | Note "Pas de stockage" + lien `/confidentialite`                       |
| **YMYL**              | System prompt + disclaimer UI + interdictions strictes                 |
| **DDA art. L. 521-4** | Mention explicite que l'IA NE remplace PAS le devoir de conseil humain |
| **Hallucinations**    | RAG retrieval threshold 0.55 — refuse si rien de pertinent             |
| **Citations**         | Toutes les réponses citent leurs sources avec slug cliquable           |
| **Observability**     | Sentry tags `chat.tier`, `chat.provider`, `chat.model`                 |

## 6. Coût opérationnel projection

Hypothèse : 100 conversations/jour avec 5 messages chacune = 500 calls/jour.

| Mois      | Conversations | Coût mensuel estimé |
| --------- | ------------- | ------------------- |
| Lancement | 1 000         | ~$2                 |
| Mois 3    | 5 000         | ~$10                |
| Mois 12   | 20 000        | ~$40                |

Vs un chatbot humain 24/7 (~30 000 €/an minimum), c'est imbattable.

## 7. Évolutions futures (V2)

- [ ] Reranker Cohere/Voyage AI pour améliorer le retrieval
- [ ] Embeddings open-source (Snowflake Arctic, BGE-M3) pour réduire à $0 OpenAI
- [ ] Mémoire conversationnelle persistante (avec opt-in RGPD)
- [ ] Routing intelligent vers courtier humain quand complexité dépasse seuil
- [ ] Multi-langue (EN pour expat business)
- [ ] Voice input (mobile)
- [ ] Analytics : top questions, taux de satisfaction (👍/👎 par réponse)
