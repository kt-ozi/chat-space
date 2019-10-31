$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="right-content__message" data-id="${message.id}">
                <div class="right-content__message-data">
                  <p class="right-content__send-username">
                    ${message.user_name}
                  </p>
                  <p class="right-content__send-date">
                    ${message.date}
                  </p>
                </div>
                <p class="right-content__message-text">
                  <p>${content}</p>
                ${img}
                </p>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax ({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right-content').append(html)
      $('#new_message')[0].reset();
      $('.right-form__btn').removeAttr("disabled", 'disabled');
      $('.right-content').animate({ scrollTop: $('.right-content')[0].scrollHeight}, 'swing');
    })
    .fail(function(){
      alert('Error');
      $('.right-form__btn').removeAttr("disabled", 'disabled');
    })
  })
});