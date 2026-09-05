# Calendar ture

A small, static project for generating a rotating duty calendar ("calendar ture") for a team or individual based on a yearly shift pattern.

## What it does

The project provides a simple way to compute a shift calendar showing work days and rest days using a repeating pattern such as:

- Z = day shift
- N = night shift
- - = off / free

The logic is available in both:

- a Bash script (`ture.sh`)
- a browser-based HTML/JS implementation (`index.html`, `script.js`)

## Project structure

- `ture.sh` — original shell script that prints a yearly calendar to the terminal
- `index.html` — main browser entry point
- `script.js` — calendar generation logic for the browser version
- `style.css` — styling for the HTML page
- `index0.html` and `index1.html` — alternate prototype/mockup versions
- `prompt.txt` — source prompt describing the original Bash transformation task

## Quick start

### Bash version

```bash
chmod +x ture.sh
./ture.sh "Andrei" 2026 2
```

This prints a calendar for the selected year and user, using the specified shift start offset.

### Browser version

Open `index.html` in a browser, or serve the directory with a simple local web server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Example output

The shell version prints a month-by-month layout with day numbers and shift labels, for example:

```text
Calendar ture anul 2026 Andrei

    01 02 03 ...
01  Z N - -
...
```

## Notes

- The script supports a bounded year range (up to 2037 in the JS implementation and shell logic).
- The browser version also allows selecting a year and month dynamically.
- This is a static front-end project; there are no package installs or build steps required.

## License

This project does not currently specify a license. If you plan to reuse or distribute it, add an appropriate license file before publishing.
