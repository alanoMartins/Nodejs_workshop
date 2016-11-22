$(function(){
  $.get('/bikes', appendToList);

  function appendToList(bikes) {
    // var list = [];
    // for(var i in blocks) {
    //   list.push($('<li>', { text: blocks[i] }));
    // }
    const list = Object.keys(bikes).map( key =>
      $('<li>', { text: `${key} ---- Frame: ${ bikes[key].frame}, Tamanho: ${ bikes[key].tamanho}` }));
    $('.bike-list').append(list);
  }
})
