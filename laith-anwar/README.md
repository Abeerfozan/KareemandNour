# Laith & Anwar Invitation

A responsive wedding invitation rebuilt from scratch as a standalone HTML/CSS/JavaScript site.

## Files
- `index.html` — page structure
- `styles.css` — visual design and responsive layout
- `script.js` — opening interaction, reveal animations, countdown, and editable event config

## Edit event details
Open `script.js` and update `INVITATION_CONFIG`:

```js
const INVITATION_CONFIG = {
  eventDate: '2026-09-18T19:00:00+03:00',
  venueName: 'Venue name',
  venueAddress: 'Amman, Jordan',
  mapsUrl: 'https://maps.google.com/...',
  rsvpUrl: 'https://forms.gle/...'
};
```

The countdown and action buttons activate automatically once the matching values are provided.
