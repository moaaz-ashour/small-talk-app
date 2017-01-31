# Small Talk App
A Hacker News/ Reddit-like web app which allows for registration/ login through Facebook, commenting, liking and replying.

##Features
* Only users who are logged in may post links or comment so there must be a mechanism for users to register and log in.

* Posted links should be shown in reverse chronological order based on the time at which they were posted.

* When posting a link users should be able to specify the text to show for the link.

* When a posted link is shown there should be beneath it a link to comments. When users click this link they should see a view of all of the comments that have been posted about the link.

* When links and comments are shown, the name of the user who created them should also be shown. The user name should be clickable to a view of information about the user, including lists of all the links and all the comments the user has posted.

* The comments should be threaded. Users can respond to specific comments.

* The site must look good and it must look good on both desktops and phones.

* At least one optional feature must be implemented and you should implement as many as you can.

* Crawl the link posted and find an appropriate image to display with the link. If the page has a `<meta property="og:image">` tag, use that. <a href="https://github.com/cheeriojs/cheerio">Cheerio</a> is a module that can help you find what you want in the html files you retrieve.

* Allow users to upvote links and show the number of votes each link has received. The next step is to create a view in which links are shown in order of popularity.

* Allow users to upvote comments and sort comment threads by how many votes they have received.

* Allow users to <a href="https://developers.facebook.com/docs/facebook-login/web">log in with Facebook</a>.

* Allow users to favorite or bookmark links and make a view of all of their favorited links available to them.

* Allow users to add tags to the links they submit. Display the tags with the link and make them clickable to a view of all links that have that tag.

## Stack

* Node/Express. To reduce the number of dependencies, do not use Redis.
* PostgreSQL.
* jQuery.
* Angular.js.
