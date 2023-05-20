var form = document.getElementById('crud-form');
var inputText = document.getElementById('input-text');
var listItems = document.getElementById('list-items');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var text = inputText.value;
  if (text) {
    createItem(text);
    inputText.value = '';
  }
});

function createItem(text) {
  var li = document.createElement('li');
  var itemText = document.createTextNode(text);
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function() {
    deleteItem(li);
  });

  li.appendChild(itemText);
  li.appendChild(deleteButton);
  listItems.appendChild(li);
}

function deleteItem(item) {
  listItems.removeChild(item);
}