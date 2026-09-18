# Native Android app

This repository now includes a native Kotlin Android version of the web calendar.

## Features

- Select a year from the current year through 2037.
- Select a month from 01 through 12.
- Select one of the supported users (`ljc1q`, `xxtoo`, `fras0`, `l3hb4`) or view the neutral rotation.
- Render the month as a Monday-first calendar grid.
- Preserve the last selected year, month, and user on the device.
- Apply the same 2024 baseline and user offsets as `script.js`.

The native UI is implemented without runtime third-party dependencies. `ShiftCalendar` contains the calculation logic and `CalendarView` draws the month grid.

## Build and install

Requirements: JDK 17, Android SDK platform 35, and Gradle.

```sh
./gradlew assembleDebug
./gradlew check
./gradlew installDebug
```

The APK is written to:

```text
app/build/outputs/apk/debug/app-debug.apk
```

The original static web app and Bash implementation remain available for comparison.
