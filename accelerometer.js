var watchID;

$("#accelerometer").bind("pageshow",function(){
  checkCompatibility();

  $("#accelerometer").bind("pagebeforehide",function(){
    if (watchID) {
      navigator.accelerometer.clearWatch(watchID);
    } else {
      window.removeEventListener("devicemotion",devicemotionHandler,true);
    }
  })
});

function checkCompatibility() {
  if (navigator.accelerometer) {
    watchID = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, { frequency: 100 });
  } else {
    accelerometerError('navigator.accelerometer not supported');
    window.addEventListener("devicemotion",devicemotionHandler,true);
  }
}

function devicemotionHandler(event){
  accelerometerSuccess(event.accelerationIncludingGravity);
}

function accelerometerSuccess(acceleration) {
  $("#accelerometerStatus").html('X: ' + acceleration.x + '<br />' +
                'Y: ' + acceleration.y + '<br />' +
                'Z: ' + acceleration.z);

  var current = $("#box").position();

  $("#box").css({
    left: checkValue(current.left - acceleration.x, 0, 280) + "px",
    top: checkValue(current.top + acceleration.y, 0, 290) + "px",
  });
}

function checkValue(value,min,max){
  if(value<min){
    value = min;
  } else if(value>max){
    value = max;
  }
  return parseInt(value);
}

function accelerometerError(msg) {
  $("#accelerometerStatus").html(typeof msg == 'string' ? msg : "failed");
}
