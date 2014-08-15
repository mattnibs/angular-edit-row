
angular.module("TestApp", ['angular-edit-row'])

function TestCtrl($scope) {
  $scope.tracks = [
    { No: 1, Title: "Let's Go For A Ride", Artist: "Rac" },
    { No: 2, Title: "Awake", Artist: "Tycho" }
  ];
}

function EditTrackCtrl($scope, $rowEditInstance) {
	$scope.editTrack = angular.copy($scope.track);

	$scope.save = function() {
		$scope.track.Title = $scope.editTrack.Title;
		$rowEditInstance.close();
	}

	$scope.delete = function() {
		$rowEditInstance.close();
	}

}
