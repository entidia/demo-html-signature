var wrapper           = document.getElementById("signature-pad");
var clearButton       = wrapper.querySelector("[data-action=clear]");
var savePNGButton     = wrapper.querySelector("[data-action=save-png]");
var canvas            = wrapper.querySelector("canvas");
var signaturePad      = new SignaturePad(canvas, { backgroundColor: 'rgb(255, 255, 255)'});

function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear();
}

window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  var blob = dataURLToBlob(dataURL);
  var url = window.URL.createObjectURL(blob);

  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});


savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please sign first.");
  } else {
    var dataURL = signaturePad.toDataURL().replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    document.getElementById('downloadlink').innerHTML += '<a href="'+dataURL+'" download="signature.png" class="dwl_link">DOWNLOAD</a>';
  }
});
