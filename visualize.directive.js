(function() {
    function directive() {
        return {
            templateUrl: 'visualize.data.tpl.html',
            scope: {

            },
            restrict: 'E',
            controller: ['$scope', 'transformFactory', function($scope, transformFactory) {
                $scope.aggregateNetTotal = 0;
                $scope.averageNetTotal = {};

                $scope.$on('receivedData', function(event, data) {
                  let aggregateNetTotal = transformFactory.aggregateNetTotal(data.SalesTransactionData);
                  let averageNetTotal = transformFactory.averageNetTotal(data.SalesTransactionData);

                  let employeeIds = Object.keys(averageNetTotal)
                  $scope.labels = employeeIds;

                  let averagePerEmployee = employeeIds.map(employee => {
                    return averageNetTotal[employee];
                  });

                  $scope.data = [averagePerEmployee];
                });
            }]
        }
    }

    angular.module('takeHomeApp').directive('visualizeData', directive)
})();
