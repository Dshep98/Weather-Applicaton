## Weather-Applicaton
### Description:

This program is a real-life weather application that's easy to use. It uses real-time data from a [ Weather API](https://openweathermap.org/) to collect information for features that usually come with finding the weather such as: a city thats being searched, current location, temperature in Fahrenheit or Celsius, high/lows, 5 day forecast,etc.Instead of a normal weather app this one gives funny southern sayings according to the change in temperature of the weather.

### Instructions
 - The program was ran and edited in [VSCODE](https://code.visualstudio.com/)
 - Its easy to operate just go directly to the site link [Dom's Weather Application](https://pedantic-swirles-d0df47.netlify.app/)

### Files

|   #   | File                       | Description                                                |
| :---: | -------------------------- | ---------------------------------------------------------- |
|   1   | [styles.css](https://github.com/Dshep98/Weather-Applicaton/blob/main/src/styles.css) | CSS file |
|   2   | [index.js](https://github.com/Dshep98/Weather-Applicaton/blob/main/src/index.js)     | Java Script file |
|   3   | [index.html](https://github.com/Dshep98/Weather-Applicaton/blob/main/index.html)     | HTML file |


### Sources
- [Open Weather Map API](https://openweathermap.org/api)
- [Axios](https://github.com/axios/axios#axios-api)
- [Bootstrap](https://getbootstrap.com/)
- [Netlify](https://getbootstrap.com/)
I used this site to host the weather app on
- [Wind Direction Map](http://snowfence.umn.edu/Components/winddirectionanddegreeswithouttable3.htm)  
 I used this as a source to brute force the wind directions since all the API gave was the degree direction. I passed that number into the wind function and it matched the number passed in to the cardinal direction. Ex: cod: 200 cardinal direction: SSW 
- [Background Source](https://codepen.io/P1N2O/pen/pyBNzX)
- [Southern Sayings](https://wanderwisdom.com/travel-destinations/Funny-Southern-Sayings-and-Southern-Expressions)
- [Invision](https://dominique766495.invisionapp.com/freehand/Weather-App-with-a-twist-POeXgl9xR) 
- I used this to create my wireframe for how I wanted my application to look with all its features.

### Problems
- The time for some areas may be slightly off as far as accuracy. That's just how the API is.
- For the southern sayings function it's not completely accurate since they API has many different weather names and not just one set weather condition. 
I managed to tweak it just a little in terms of breaking it down either by weather description or weather temperature. Eventually I'd like to create a library of sayings to match up to each one the API has. 
