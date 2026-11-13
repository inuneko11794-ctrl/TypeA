# BATTLE BANK-KUN AI Point Engine v1

## Purpose
Estimate the relative payout level of a 2-car exacta combination. This is separate from the existing hit-candidate ranking model. It does not estimate hit probability or profitability.

## Training data and split
- Source: supplied `brain races 2024-08 all_印配置変換.csv`
- Scope: all 25,477 races; no filtering by car count or line type
- Excluded: `pt`, `chaos_score`, and post-race fields other than the target payout
- Target: `log(exa_yen)`
- Chronological training/validation split: 20,350 training races and 5,127 validation races
- Training period: 2024-07-30 through 2026-03-21
- Validation period: 2026-03-22 through 2026-06-15
- Entire dates are kept in one split; no date leakage across the boundary

## Model
Ridge regression with one-hot categorical features, rare-category pooling, and deterministic coefficients. Inputs:
- First and second place marks, plus ordered mark pair
- Same-line / different-line / single-rider relationship
- First and second rider positions (lead, second, third-or-later, solo)
- Individual line lengths
- Ordered line-size pattern and full ordered line structure
- Singleton count, car count, race class segment, and line type

Line order is preserved. For example, 3+2+2 and 2+3+2 are distinct. A solo rider is never treated as a member of a multi-rider line. Mark symbols ◎, ◯, △, ✕, ⑳, ●, ▲, ✖, ☆, ★, T, and 星 remain distinct.

## Validation
- Validation log-scale MAE: 0.4542
- Baseline log-scale MAE (training median): 1.0337
- Validation log-scale RMSE: 0.5827
- Prediction/actual correlation: 0.8848
- Training median payout reference: 990 yen

The model reduces log-scale MAE against the constant-median baseline on the latest holdout. This evaluates payout estimation for realized winning pairs, not whether the model can identify which candidate pair will hit.

## Point conversion
`points = clamp(10 * ln(predicted_median_payout / 990) / ln(2), -30, 30)`

- +10: estimated payout level is about 2x the reference
- -10: estimated payout level is about half the reference
- 0: estimated payout level is near the reference

The points are deterministic for identical inputs and model version. They are a relative payout indicator, not a betting recommendation or guarantee.

## Integration status
A fitted coefficient JSON and reproducible training script have been generated locally and independently rerun. They are not yet connected to `index.html`. The existing prediction model and its learning key must remain untouched. Runtime integration must be a separate payout-scoring module and must be tested before the engine is described as active.
