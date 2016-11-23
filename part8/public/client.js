$(function(){
  $.get('/bikes', appendToList);

  // function appendToList(bikes) {
  //   const list = Object.keys(bikes).map( key =>
  //     $('<li>', { text: `${key} ---- Frame: ${ bikes[key].frame}, Tamanho: ${ bikes[key].tamanho}` }));
  //   $('.bike-list').append(list);
  // }

  function appendToList(bikes) {
    const list = bikes.map( bike => {
      const content = `<a href="/bikes/${bike.name}">${bike.name}</a>`;
      const del = `<a href="#" data-bike="${bike.name}">x</a>`;
      return $('<li>', { html: content + del });
    });
    $('.bike-list').append(list);
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    const form = $(this);
    const bikeData = form.serialize();

    $.ajax({
      type: 'POST', url: '/bikes', data: bikeData
    }).done(function(bike) {
      appendToList([bike]);
      form.trigger('reset');
    });
  });

  $('.bike-list').on('click', 'a[data-bike]', function(event) {
    if (!confirm('Do you want delete it?')) {
      return false;
    }

    const target = $(event.currentTarget);
    $.ajax({
      type: 'DELETE', url: `/bikes/${target.data('bike')}`
    }).done(function(bike) {
      target.parents('li').remove();
    });
  });
})
