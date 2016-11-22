$(function(){
  $.get('/bikes', appendToList);

  function appendToList(blocks) {
    // var list = [];
    // for(var i in blocks) {
    //   list.push($('<li>', { text: blocks[i] }));
    // }
    const list = blocks.map( block => $('<li>', {text: block }));
    $('.bike-list').append(list);
  }
})
