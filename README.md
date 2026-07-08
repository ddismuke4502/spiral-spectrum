# Spiral Spectrum

[![CI](https://github.com/ddismuke4502/spiral-spectrum/actions/workflows/ci.yml/badge.svg)](https://github.com/ddismuke4502/spiral-spectrum/actions/workflows/ci.yml)

Spiral Spectrum is a React Native Expo mobile app focused on creating a calm, privacy-conscious educational self-screening experience for reflecting on adult autism-related traits.

The project is built as a portfolio-quality mobile application with typed navigation, reusable UI components, CI verification, pull-request-based development, and deliberate performance practices.

## Important Disclaimer

Spiral Spectrum is not a diagnostic tool. It does not diagnose autism, ADHD, anxiety, trauma, or any medical or mental health condition.

The app is intended for educational reflection only. Results should be treated as a starting point for personal awareness or a conversation with a qualified medical or mental health professional.

## Current Status

The app currently includes:

- Expo React Native TypeScript setup
- Android and iPhone testing through Expo Go
- Branded splash screen and app logo
- Welcome screen with safety disclaimer
- Typed stack navigation
- Placeholder screens for screening, results, history, and resources
- ESLint setup
- GitHub Actions CI
- Pull request workflow with review checklist
- GitHub Copilot code review instructions

## Planned Features

Upcoming features include:

- Multi-question screening flow
- Answer progress tracking
- Pure scoring service
- Result interpretation bands
- Saved result history
- Educational resources screen using API/fetch
- Local persistence with AsyncStorage
- Fast local progress persistence with MMKV through development builds
- Optional privacy-related secure storage using Keychain through development builds
- Unit tests for scoring and state logic
- Accessibility pass for interactive controls

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Safe Area Context
- React Native SVG
- AsyncStorage
- GitHub Actions
- ESLint

Planned native storage additions:

- React Native MMKV
- React Native Keychain

## App Screens

### Splash Screen

The splash screen uses the Spiral Spectrum rainbow spiral mark as the primary brand asset.

### Welcome Screen

The welcome screen introduces the app, presents the educational self-screening context, and clearly states that the app is not a diagnosis.

### Screening Flow

The screening flow will allow users to answer one question at a time, move forward and backward, and track completion progress.

### Results

The results screen will summarize the score and provide non-diagnostic educational interpretation.

### History

The history screen will allow users to view previously saved results locally on the device.

### Resources

The resources screen will render educational support content from a fetch/axios-powered service.

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Expo Go on Android or iPhone
- Git

Optional for Android emulator testing:

- Android Studio
- Android Emulator

## Installation

Clone the repository:

```bash
git clone https://github.com/ddismuke4502/spiral-spectrum.git
cd spiral-spectrum