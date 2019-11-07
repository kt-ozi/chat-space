$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="right-content__message" id="new-message" data-message-id="${message.id}">
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.right-content__message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.right-content').append(insertHTML);
        })
        $(function(){
          if($('#new-message').length){
            $('.right-content').animate({ scrollTop: $('.right-content')[0].scrollHeight}, 'swing');
            $('#new-message').removeAttr('id')
          }
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});