const fs = require('fs')
const {dialog} = require('electron').remote
toggle_hex = false;
let editor = document.getElementById('editor')

// Disable Double Click

$("*").dblclick(function (e) {
    console.log('hi');
    e.preventDefault();
});


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
      editor.value = data;
      toggle_hex = false;
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
  output = ""
  for (let x = 0; x < input.length; ++x) {
    code = input.charCodeAt(x).toString(16).toUpperCase();
    output += code + " ";
  }
  return output
}

function convertToText(input) {
  input = input.trim().split(' ');
  output = ""
  for (item in input) {
    output += String.fromCharCode(parseInt(input[item],16));
  }
  return output;
}

$('#hex-toggle').on('click', function() {
  toggle_hex = !toggle_hex;
  if (toggle_hex) {
    $('#editor').val(convertToHex($('#editor').val()))
  } else {
    $('#editor').val(convertToText($('#editor').val()))
  }
})

$('#editor').focus()
