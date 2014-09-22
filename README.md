# Angular Lightbox Route


Angular Lightbox Route uses AngularJS + AngularUI + Foundation to build a modal routing app. The app retrieves a set of activities from a given JSON resource. At the root path, it displays the activity titles as a list. When an activity is clicked, the app routes to /card/activityname, and displays detailed activity information. If the user navigates manually to /card/activityname, the card is also displayed. The menu remains visible in the background at all times.

Angular Lightbox Route comes bundled with gruntfile to build development & production versions.

Angular Lightbox Route will run as static files. Installing the dependencies requires Node.js.

##Application Set-up


Clone the repository:
```
git clone https://github.com/alihaberfield/angular-lightbox-route/
cd angular-lightbox-route
```

Install dependencies:


```
npm install
```

Set grunt to watch for changes:

```
grunt watch
```

Or, manually build for dev or prod:

```
grunt dev
grunt prod
```


