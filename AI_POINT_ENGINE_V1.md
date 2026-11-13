# BATTLE BANK-KUN AI Point Engine v1

## Purpose
Estimate whether a 2-car exacta combination is likely to be relatively high- or low-priced. This score represents payout tendency, not hit probability.

## Inputs
- First-place mark and second-place mark, including transformed marks: ◎, ◯, △, ✕, ⑳, ●, ▲, ✖, ☆, ★, T, 星
- Ordered mark pair
- Same-line / different-line / single-rider relationship
- Within-line position pair
- Ordered line-shape signature (do not merge 3+2+2 with 2+3+2)
- Winner's and second-place rider's line lengths
- Single-rider status for each finisher

## Learning policy
- Determine all point weights from historical race data; do not hand-tune individual conditions.
- Use chronological validation. Keep all races from the same date in the same split.
- Prefer patterns that remain predictive in the newest holdout period.
- Shrink or suppress low-sample effects.
- Refit weights when new confirmed race results are added.
- Identical inputs and identical model version must produce identical points.

## Point scale
The model predicts log(2-car exacta payout). Convert the difference from the reference log payout into points:

`points = round((predicted_log_payout - reference_log_payout) / ln(2) * 10)`

Interpretation:
- +10 points: predicted payout is about 2x the reference.
- -10 points: predicted payout is about 1/2 the reference.
- 0 points: near the reference level.

This is a relative payout scale, not a guarantee or a probability.

## v1 validation record
- Training: 20,410 races
- Validation: 5,067 races
- Chronological split by unique race dates; same date never split
- Training dates: 2024-07-30 to 2026-03-22
- Validation dates: 2026-03-23 to 2026-06-15
- Log-scale MAE: 0.4591 (baseline 1.0335)
- Log-scale RMSE: 0.5884 (baseline 1.2470)
- Prediction/actual correlation: 0.8818

## Integration status
This file records the engine specification and validation. The fitted coefficient JSON and runtime integration into `index.html` are separate steps. Do not treat the engine as active in the live app until the coefficient asset is committed and the input-to-score code is connected and tested.
