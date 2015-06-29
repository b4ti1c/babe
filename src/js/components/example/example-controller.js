import parameterize from 'parameterize'

sampleApp.components.controller('ExampleController', ['$scope', 'exampleGetMyIPService', function($scope, exampleGetMyIPService){
	$scope.$watch('name', () => $scope.reversedName = $scope.name.split('').reverse().join(''));
	$scope.$watch('name', () => $scope.parameterizedName = parameterize($scope.name));

console.log('yes');
	$scope.playSound = () => {
		var audio = new Audio('rsc/example.wav');
		audio.play();
	};

	$scope.lookup = () => exampleGetMyIPService.lookup().then((ip) => $scope.ip = ip);
}]);
