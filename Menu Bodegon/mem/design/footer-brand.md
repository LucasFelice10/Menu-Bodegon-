---
name: Footer & brand rules
description: Footer content, developer credit and link, Google review block and star color for the Mailo menu
type: design
---

- Developer credit at the very bottom reads "Desarrollado por GastroQode" (values live in `developerCredit` and `developerUrl` in the menu data file). Never revert to "Creado por DVL Developer" or "QResto".
- "GastroQode" is a link that opens the developer's site in a new tab. `developerUrl` is currently the placeholder "https://gastroqode.com" — confirm/replace with the real page once the owner supplies it.
- Directly above the credit sits a reviews block: the MAILO wordmark plus a Google "G" and five gold stars, with the label "Dejá tu reseña en Google".
- The whole reviews block is one link that opens the restaurant's Google Maps profile in a new tab so the customer can leave a review. The URL lives in `googleReviewUrl` in the menu data file — it currently points at a Google Maps search for "Mailo" and must be replaced with the exact review link once the owner supplies it.
- Star gold comes from the `--star` design token; never hardcode the color.
