//localStorage functions
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('tbody').html('');
  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var values = JSON.parse(window.localStorage.getItem(key));
    $('tbody').append(`<tr><td>${key}</td><td>${values[0]}</td><td>${values[1]}</td><td>${values[2]}</td></tr>`)
  }
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  var values = [$('.value1').val(), $('.value2').val(), $('.value3').val()];
  return JSON.stringify(values);
}

var resetInputs = function() {
  $('.key').val('');
  $('.value1').val('');
  $('.value2').val('');
  $('.value3').val('');
}

$(document).ready(function() {
  showDatabaseContents();

  $('.create').click(function() {
    if (getKeyInput() !== '' && $('.value2').val() !== '' && $('.value3').val() !== '' && $('.value1').val() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('song already exists in database, do you want to update the song details instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('inputs must not be blank');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && $('.value2').val() !== '' && $('.value3').val() !== '' && $('.value1').val() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('song does not exist in database');
      }
    } else {
      alert('song and artist must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('song does not exist in database');
      }
    } else {
      alert('song must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  })

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the playlist? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  })
})