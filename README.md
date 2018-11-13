# Streart



## TODO (checked are done/fixed)
### Known bugs 
- [ ] Popups are not shown when clicking on circles on map
- [x] Adding or removing lots of pieces screw up the maxscore count on artists progression
- [x] Marking all pieces of an artist as found does not update score correctly (fixed using transaction)
- [X] Search for pieces does not work on Artist Component
- [x] Leaflet "Cannot remove of undefined" occurring randomly (fixed by refactoring maps more cleanly)

### Priority 1
- [ ] Allow admins to add artists
- [ ] Allow admins to remove artists
- [ ] Allow admins to mark artists as published/unpublished
- [x] User transactions and batches in functions to avoid data lose
- [x] Allow users to delete all their data

### Priority 2
- [ ] Allow users to reset their password
- [ ] Better way to see vanished pieces
- [ ] More complete '/my-data' page, including speech about external services (Firebase, Algolia...)
- [ ] *[Technical]* Use Cypress to e2e test all processes (see how to mock data into/out of Firestore)
- [ ] *[Technical]* Convert all interfaces default implements to the class format
- [ ] *[Technical]* Unit test all components 
- [x] *[Technical]* Check for un-unsubscribed observables in components
- [x] Check if city found when entering geolocation
- [x] Itineraries should go to randomized location when using circles.

### Priority 3
- [ ] Get geolocation from picture metadata when creating a piece
- [ ] Ask for geolocation only when needed
- [ ] Make the app core functionalities work offline (dashboard progression)
- [ ] Make a nicer "Javascript is required" screen
- [ ] Allow more precise piece geolocation placement using a map and a movable marker
- [ ] Better not found page


