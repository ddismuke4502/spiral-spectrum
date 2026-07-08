# Copilot Code Review Instructions

Review this repository as a React Native Expo TypeScript mobile app.

## Project priorities

- Keep the app cross-platform for Android and iOS.
- Prefer readable, maintainable TypeScript over clever abstractions.
- Keep UI components small and reusable.
- Avoid unnecessary re-renders in screens, lists, answer options, and questionnaire state.
- Use `useMemo`, `useCallback`, `React.memo`, and custom hooks only when they improve stability or performance.
- Keep scoring logic pure, deterministic, and testable.
- Keep storage responsibilities separated:
  - AsyncStorage for completed result history.
  - MMKV for fast local progress state once development builds are added.
  - Keychain only for sensitive user/privacy settings once development builds are added.
- Do not store medical, diagnostic, or sensitive personal data unnecessarily.
- Do not introduce claims that the app diagnoses autism or any medical/mental health condition.
- Preserve clear disclaimer language that this is educational self-screening only.
- Do not copy copyrighted questionnaire text or website copy wholesale.
- Ensure touch targets are usable on small phones.
- Add accessibility labels to important buttons and interactive controls.
- Prefer explicit types for navigation params, scoring models, and storage models.

## Blocker-level concerns

Flag PRs that:

- Break TypeScript compilation.
- Add untyped `any` without a strong reason.
- Mix UI, scoring, and storage logic in one component.
- Introduce diagnosis language.
- Save sensitive information without clear user consent.
- Add native packages without noting whether Expo Go still supports the app.
- Add complex state without tests or clear reasoning.

## Testing expectations

For logic changes, request tests for:

- Scoring functions.
- Answer selection and progress calculation.
- Result band interpretation.
- Storage serialization/deserialization.

For UI changes, request manual confirmation on Android and iPhone through Expo Go or development builds.