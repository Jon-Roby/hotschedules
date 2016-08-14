## Notes

# Tentative Assumptions
1. I wasn't able to access $scope.$parent.SalesTransactionData in visualize.directive.js. I suspect the reason is because SalesTransactions.json is requested asynchronously with $http, and the code in visual.directive.js isn't run again when the data is received in the parent scope. (Somewhat surprisingly, when I console.log($scope.$parent) in visual.directive.js, I can click on the SalesTransactionData object in Chrome dev tools. But when I console.log($scope.$parent.SalesTransactionData), I receive undefined. ???). For now, I just $broadcast the data once it's received to the child. If there is a better solution, I can modify accordingly.

2. net_total.value is presumably given in cents (and scale at 2 indicates the decimal place?). So 3445 is $34.45.

# Display

3. I used used the Raleway Google font, which HotSchedules using on the landing page for body text.

4. I used Angular Chart for display. It surprisingly doesn't allow you to name the x and y axes (out of the box), so for this assignment, I just used flexbox to show them, as well as for the title.  

## Hot Schedules Front End Software Engineer Takehome project

This take home project is designed to give us an idea of how you code. It is designed to be a more representative example of the work you would be doing than a traditional, whiteboarding technical interview. It is therefore designed to be a lower stress alternative to other interviewing techniques. If you have any concerns or feedback about the requirements, please don't hesitate to reach out to your interviewer.

There are three parts to the exercise, however all three parts build on each other. It should not take more than 2-3 hours to complete. If you think that the requirements will take significantly longer than that, please give that feedback.

Clone the repo. There should be four files

- index.html
- SalesTransactions.json
- transform.factory.js
- visualize.directive.js

as well as a template file and css file. The app is initialized inside index.html.

First, in `transform.factory.js`, complete the given Angular Factory by writing a function or functions that are capable of taking SalesTransactions.json data as an input, and return 1) the aggregated net_total for the entire collection of data, and 2) the average net_total per guest for each unique employee. The format of the returned data is up to you.

Then in `visualize.directive.js`, create an angular directive that uses your transformation factory to display the average net sales per guest for each employee in a separate div. As you can see, the raw SalesTransactions are available in the parent controller scope. First you should pass this raw data into your directive, then inside the directive, call your factory to transform the data. Div's should be given a background color, and div width should be determined by the calculated metric. For example, if employee 1's net sales per guest is $10 and employee 2's net sales per gues is $15 dollars, employee 2s div should be wider. The exact proportions are up to you.

The easiest way to test the app is to install the http-server package `npm install -g http-server` and then run `http-server` inside the project directory.
