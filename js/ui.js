const fs = require('fs')
const {dialog} = require('electron').remote

console.log($(document))

toggle_hex = false;

let editor = document.getElementById('editor')

// New

document.getElementById('new-file').addEventListener('click', () => {
  editor.value = ""
})

// Open

document.getElementById('open-file').addEventListener('click', () => {
  dialog.showOpenDialog((filename) => {
    if (filename === undefined) {
      console.log('The user did not select a location to open.')
      return
    }
    console.log(filename)
    fs.readFile(filename[0], 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      editor.value = data
    })
  })
})

// Save

document.getElementById('save-file').addEventListener('click', () => {
  content = editor.value
  dialog.showSaveDialog((filename) => {
    if (filename === undefined) {
      console.log('The user did not select a location to save to.')
      return
    }
    fs.writeFile(filename, content, (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
})

$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    $('#save-file').click();
    event.preventDefault();
    return false;
});

function convertToHex(input) {
  var hex = 0;
  var i = 0;
  while(input.length > i) {
      hex += input.charCodeAt(i);
      i++;
  }
  console.log(hex)
  console.log(hex.toString(16))
  return hex.toString(16);
}

function convertToText(input) {
  return String.fromCharCode(parseInt(input, 16))
}

$('#hex-toggle').on('click', function() {
  toggle_hex = !toggle_hex;
  if (toggle_hex) {
    $('#editor').val(convertToHex($('#editor').val()))
  } else {
    $('#editor').val(convertToText($('#editor').val()))
  }
})
