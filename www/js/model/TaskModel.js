function getTasks() {
  this.tasks = [];

  var lista = localStorage.getItem("taskList");

  if (lista != null) {
    this.tasks = angular.fromJson(lista);
  }

  this.save = function () {
    var lista = angular.toJson(this.tasks);
    localStorage.setItem("taskList", lista);
  }

  this.remove = function(item) {
    var pos = this.tasks.indexOf(item);
    this.tasks.splice(pos, 1);
  };

  this.add = function(item) {
    this.tasks.push(item);
  };
}
