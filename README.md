# Tweeter Project

Tweeter is a simple, single-page Twitter clone developed under the tutelage of Lighthouse Labs.

## Final Product

!["screenshot of page on screens with a width of 1024 pixels or above"](https://github.com/SymphonicRain/tweeter/blob/master/docs/tweeterLargeScreen.JPG)
!["screenshot of page on screens with a width under 1024 pixels"](https://github.com/SymphonicRain/tweeter/blob/master/docs/tweeterSmallerScreen.JPG)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Features
- Clicking on "write a new tweet" or the arrow directly below the text in the banner will toggle the text submission field with real-time character-counter.
- Scrolling down more than 200 pixels will display an arrow button that brings the user back to the top of the page and open the text submission field.
- User-submitted messages will display directly below the text submission field.
- If user attempts to refresh or leave the page while the text submission field has unsent messages, the browser will show a warning dialogue.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- Chance