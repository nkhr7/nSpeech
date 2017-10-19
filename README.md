# nSpeech [![Build Status](https://travis-ci.org/nkhr7/nSpeech.svg?branch=master)](https://travis-ci.org/nkhr7/nSpeech) [![Dependency Status](https://gemnasium.com/badges/github.com/nkhr7/nSpeech.svg)](https://gemnasium.com/github.com/nkhr7/nSpeech) [![npm version](https://badge.fury.io/js/n-speech.svg)](https://badge.fury.io/js/n-speech) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)


nSpeech is screen reader library (TTS).  
nSpeechは[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)を使用した、スクリーンリーダーライブラリです (TTS)。

## Install

```bash
$ npm install n-speech
```

## Usage

- Include nSpeech.js before `</body>`.  
`</body>`の前にnSpeech.jsを追加します。

- Please add ".speech" to any tags of the sentence you want to read.  
読み上げたい文章のタグに".speech"を追加してください。

```html
<body>
<p class="speach">The sentence is read.</p>
<p class="speach">この文章が読まれます。</p>

<button type="button" id="play" class="button">Play</button>
<button type="button" id="pause" class="button">Pause</button>

<script  src="js/nSpeech.js"></script>
<script>
  var speech = new nSpeech();
  var play = document.getElementById('play');
  var stop = document.getElementById('stop');

  play.addEventListener('click', function(){
    speech.play();
  });

  stop.addEventListener('click', function(){
    speech.stop();
  });
</script>
</body>
```

### Selector and Options defined
- The selector and options can be defined to this.  
セレクタとオプションを定義することができます。

```javascript
// In this case is ID.
// Other case is class and tag. (ex: '.speech', 'p')
var example_id = new nSpeech('#example_id');

var example_class = new nSpeech('.example_class');

var example_tag = new nSpeech('p');

var example_option = new nSpeech({ lang: 'ja-JP' });

var example_id_option = new nSpeech('#example_id_option', {
  lang: 'ja-JP'
});
```

### Override the text selection
- Able to read the override selected text by drag.  
ドラッグで選択したテキストを読むことができます。

### Create select with voice list
- Able to create select with voice list.  
音声リストを`select`に出力することができます。

```html
<body>
<select id="voiceSelect"></select>

<script  src="js/nSpeech.js"></script>
<script>
  var speech = new nSpeech({
    selectId: "voiceSelect" // Create select voice list.
  });
</script>
</body>
```


## Options

- The following options are available.  
以下のオプションが利用できます。

- `lang` can use the options from (ja-JP) or other selects in this link.  
`lang`では以下の以下のリンクにあるセレクトの(ja-JP)などが利用できます。  
[https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)

```javascript
// default options
var options = {

  // This is spoken the language. ex: 'en-US'.
  lang    : "",
  
  // This will insert an object from the voice
  voice   : null,
  
  // Speech volume.
  volume  : 1,
  
  // Speech rate. Speech gets faster if increase.
  rate    : 1,
  
  // Speech pitch. Speech gets shrill voice if increase
  pitch   : 1,
  
  // Read this text.
  text    : "",
  
  // Create option elements in this id.
  selectId      : "",

  // Create this elements in selectId.
  selectElement : "option",

  // callback methods
  onend   : function() { return undefined; },
  onstart : function() { return undefined; },
  onerror : function() { return undefined; },
  onmark  : function() { return undefined; },

  // Debug mode.
  debug   : false
};
var speech = new nSpeech(options);
```


## Methods

- The following methods are available.  
以下のメソッドが使えます。

```javascript
var speech = new nSpeech();

// play
speech.play();

// pause
speech.pause();

// resume
// Start when paused.
speech.resume();

// stop
speech.stop();


////////////////
// change options.
////////////////

// replace text
speech.replaceText("Replace text");

// replace voice
speech.changeVoice("ja-JP");

// change volume
speech.changeVolume(1);

// change rate
speech.changeRate(1);

// change pitch
speech.changePitch(1);

```


## Events
- The following callback Methods are available.  
以下のコールバックメソッドが使えます。

```javascript
var speech = new nSpeech();

// Fired when the spoken utterance reaches a word or sentence boundary.
speech.onboundary(function(){
  console.log("onboundary");
});

// Fire when finish.
speech.onend = (function(){
  console.log("onend");
});

// Fire when an error occurs.
speech.onerror = (function(){
  console.log("onerror");
});

// Fired when the spoken utterance reaches a named SSML "mark" tag.
speech.onmark = (function(){
  console.log("onmark");
});

// Fire when pause.
speech.onpause = (function(){
  console.log("onpause");
});

// Fire when resume.
speech.onresume =(function(){
  console.log("onresume");
});

// Fire when start.
speech.onstart = (function(){
  console.log("onstart");
});

```

## Browser

| Chrome | Edge | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit) |
|---|---|---|---|---|---|
| 33 | (Yes) | 49 (49) | No support | ? | 7 |

## License
Released under the MIT License. See the `LICENSE` file for details

## Change Log
##### 2017.10.19 - [v1.0.7](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.7)
- Add change voice method.
- Add method to create select by voice list.
- Add method to text adjust. This is that insert to a paragraph in no have period.

##### 2017.10.16 - [v1.0.4](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.4)
- Linted

##### 2017.10.11 - [v1.0.3](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.3)
- playSelection integrate to play.
- Add change voice options.
- Supported in input and textarea.

##### 2017.10.10 - [v1.0.2](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.2)
- Add other callback methods. onboundary, onpause, onresume.

##### 2017.10.06 - [v1.0.1](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.1)
- Supported the override text selection.

