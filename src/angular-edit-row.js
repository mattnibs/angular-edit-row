angular.module('angular-edit-row', [])

angular.module("angular-edit-row").directive('editRowView', function() {
	return {
		restrict:'E',
		template: '<div>Hello</div>',
		scope: true,
		link: function(scope, element, attrs) {
			console.log('got here');
		}
	}
});

angular.module('angular-edit-row').directive('editRow', ['$http', '$templateCache', '$compile', '$controller', 
function($http, $templateCache, $compile, $controller) {
  	return {
    	restrict: 'A',
    	scope: {
      		editRowTemplate: '@',
      		editRowController: '@',
      		showEditRow: '='
    	},
    	link: function(scope, element, attrs) {

    		var rowEditEl = '';
    		var rowEditScope = null;

    		function DestroyRowEditCtrl() {
    			if(rowEditScope != null) {
      				rowEditEl.remove();
      				rowEditScope.$destroy();
      			}
    		}

      		scope.$watch('showEditRow', function(){
	      		if(scope.showEditRow) {
		      		$http.get(scope.editRowTemplate, {cache: $templateCache})
		      		.then(function(result) {

		      			// create rowEditInstance
		      			var rowEditInstance = {
		      				close: function() {
		      					scope.showEditRow = false;
		      				}
		      			}

		      			// create locals and  init controller
		      			rowEditScope = element.scope().$new();
		      			var ctrlLocals = { $scope: rowEditScope, $rowEditInstance: rowEditInstance };
		      			$controller(scope.editRowController, ctrlLocals);	

		      			// create row edit element
	      				rowEditEl = angular.element("<tr class='edit-row'><td colspan='" + element[0].children.length + "'>" + result.data + "</td></tr>");
	      				
	      				// insert and compile
	      				element.after(rowEditEl);
	      				$compile(rowEditEl)(rowEditScope);
		      		})
	      		}
	      		else { // need to remove edit row from table
	      			DestroyRowEditCtrl();
	      		}
      		})
    	}
	}
}]);


