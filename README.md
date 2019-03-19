# Streart
Streart is a project about Street Art.
If all goes well, it should become an app everyone can use to find art pieces in their city, and check them
as they get found. A feature can also be used to not be given the exact coordinates for the pieces finding
to feel more like a game (inspired by Geocaching). 

## TODO (checked are done/fixed)
### Known bugs 
- [ ] [Technical] Some functions are not idempotent
- [ ] Popups are not shown when clicking on circles on map
- [x] Adding or removing lots of pieces screw up the maxscore count on artists progression
- [x] Marking all pieces of an artist as found does not update score correctly (fixed using transaction)
- [X] Search for pieces does not work on Artist Component
- [x] Leaflet "Cannot remove of undefined" occurring randomly (fixed by refactoring maps more cleanly)

### Priority 1
- [ ] Make the app website compatible
- [ ] Allow admins to add artists
- [ ] Allow admins to remove artists
- [ ] Allow admins to mark artists as published/unpublished
- [ ] [Technical] Better CI/DC --> Travis, tests & deployment automation...
- [x] User transactions and batches in functions to avoid data lose
- [x] Allow users to delete all their data

### Priority 2
- [ ] Allow users to reset their password
- [ ] More complete '/my-data' page, including speech about external services (Firebase, Algolia...)
- [ ] *[Technical]* Use Cypress to e2e test all processes (see how to mock data into/out of Firestore)
- [ ] *[Technical]* Convert all interfaces default implements to the class format
- [ ] *[Technical]* Unit test all components 
- [x] Better way to see vanished pieces
- [x] *[Technical]* Check for un-unsubscribed observables in components
- [x] Check if city found when entering geolocation
- [x] Itineraries should go to randomized location when using circles.

### Priority 3
- [ ] Get geolocation from picture metadata when creating a piece
- [ ] Ask for geolocation only when needed
- [ ] Make the app core functionalities work offline (dashboard progression)
- [ ] Make a nicer "Javascript is required" screen
- [ ] Better not found page
- [x] Allow more precise piece geolocation placement using a map and a movable marker


