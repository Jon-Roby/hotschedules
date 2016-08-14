(function() {
    function factory() {
        return {

          /**
          * @param {Array} orders
          * @param {Object} orders.net_total
          * @param {Number} orders.net_total.value - Amount given in cents
          * @returns {Number} The aggregate net total of all orders
          * Time Complexity: O(n)
          * Space Complexity: O(1)
          */
          aggregateNetTotal: orders => {
            return orders.reduce((curr, next) => {

              // The right side of this check ensures an error isn't thrown
              // if the net_total object doesn't include a key of "value".
              // Though in the data set provided, this doesn't occur.
              if (!next.net_total || !next.net_total.value) return curr;
              return curr + next.net_total.value;
            }, 0);
          },

          /**
          * @param {Array} orders
          * @param {Object} orders.net_total
          * @param {Number} orders.net_total.value
          * @param {Object} orders.employee
          * @param {Number} orders.employee.id
          * @returns {Object} Object with employee ids as keys and average net total per guest for values
          * Time Complexity: O(n)
          * Space Complexity: O(n)
          */
          averageNetTotal: orders => {

            // var employees is assigned to an object with the employee ids as keys
            // and an object with the total value and number of guests as its values
            let employees = orders.reduce(function(curr, next) {
              if (!next.employee) return curr;

              let nextId = next.employee.id;
              let nextValue = next.net_total.value;

              if (!curr[nextId]) curr[nextId] = {};

              // if curr[nextId].total/.guests is undefined then they're
              // initialized with the value of right disjunct
              curr[nextId].total = curr[nextId].total + nextValue || nextValue;
              curr[nextId].guests = curr[nextId].guests + 1 || 1;

              return curr;
            }, {});

            // iterate through employees object and assign ids to the average amount for each employee
            Object.keys(employees).forEach(employee => {
              let average = employees[employee].total / employees[employee].guests;

              // Obtain the average and divide by 100 to move the decimal two places to the right
              employees[employee] = Math.floor(average)/100;
            });

            return employees;
          }
        };
    }

    angular.module('takeHomeApp').factory('transformFactory', factory)
})();
