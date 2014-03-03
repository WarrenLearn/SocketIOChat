'usestrict';


var socket = io.connect();

$(document).ready(function(){
  $('#chatControls').hide();
  $('#pseudoSet').on('click',setPseudo);
  $('#submit').on('click',sentMessage);
  $('#messageInput').keypress(function(event){
    if(event.which === 13){
      sentMessage();
    }
  });
  $('#pseudoInput').keypress(function(event){
    if(event.which === 13){
      setPseudo();
    }
  });
})

function addMessage(msg,pseudo){
  $('#chatEntries').append('<div class="messages"><div class="button"></div><p>' + pseudo +' : '+ msg + '</p></div>');
}

function sentMessage(){
  if($('#messageInput').val() != ''){
    $('#messageInput').removeClass('has-error');
    socket.emit('message',  $('#messageInput').val());
    addMessage($('#messageInput').val(),"Me",new Date().toISOString(), true);
    $('#messageInput').val('').focus();
  }else{
    $('#messageInput').addlass('has-error');
  }
}

function setPseudo(){
  if($('#pseudoInput').val() != ''){
    alert('Hello ' + $('#pseudoInput').val() + '!');
    socket.emit('setPseudo',$('#pseudoInput').val());
    $('#chatControls').fadeIn('slow');
    $('#pseudoInput').fadeOut('slow');
    $('#pseudoSet').fadeOut('slow');
  }else{
    $('#pseudoInput').addlass('has-error');
  }
}

function pressedEnter(event,fn){
  if(event.which === 13){
    fn();
  }
}

socket.on('message',function(data){
  addMessage(data['message'],data['pseudo']);
})
