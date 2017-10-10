$(document).ready(function() {
    
    console.log('loading up');
    const $userDataCounterButton = $('#user-data-counter-button');
    $userDataCounterButton.click((e) => {
      e.preventDefault();
      $.ajax({
        url: "counter",
        type: "POST"
      })
      .done(function(data){
        console.log('done with ajax, data: ', data);
        const $userDataCounter = $('#user-data-counter');
        $userDataCounter.text(data.counter);
      });
    });


  $('#edit-trip').on('submit', (e) => {
    e.preventDefault();
    const id = $('#id').val();
    const data = {
      city: $('#city').val(),
      year: $('#year').val(),
      image: $('#image').val(),
      description: $('#description').val()
    }
    $.ajax(`/trips/${id}`, {
      method: 'PUT',
      data: data,
      success: data => {
        location.href = `/trips/${data.id}`
      },
      error: err => console.log(err)
    })
  })

    $('#new-trip').on('submit', (e) => {
    e.preventDefault();
    const id = $('#id').val();
    const data = {
      city: $('#city').val(),
      year: $('#year').val(),
      image: $('#image').val(),
      description: $('#description').val()
    }
    $.ajax(`/trips/`, {
      method: 'POST',
      data: data,
      success: data => {
        location.href = `/trips/${data.id}`
      },
      error: err => console.log(err)
    })
  })

  $('#delete').on('click', e => {
   // console.log
    const id = $(e.target).attr('data-id');
    $.ajax(`/trips/${id}`, {
      method: 'DELETE',
      success: data => {
        location.href = '/trips'
      },
      error: err => console.log(err)
    })
  })

    $('#new-want').on('submit', (e) => {
    e.preventDefault();
    const id = $('#id').val();
    const data = {
      city: $('#city').val(),
      year: $('#year').val(),
      description: $('#description').val()
    }
    $.ajax(`/wants/`, {
      method: 'POST',
      data: data,
      success: data => {
        location.href = `/wants/`
      },
      error: err => console.log(err)
    })
  })




  });
