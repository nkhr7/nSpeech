# nSpeech [![Build Status](https://travis-ci.org/nkhr7/nSpeech.svg?branch=master)](https://travis-ci.org/nkhr7/nSpeech) [![Dependency Status](https://gemnasium.com/badges/github.com/nkhr7/nSpeech.svg)](https://gemnasium.com/github.com/nkhr7/nSpeech)


nSpeech is screen reader library.  
nSpeechは[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)を使用した、スクリーンリーダーライブラリです。

## Install

```bash
$ npm install n-speech
```

## Usage

- The initial options use ".speech" class name.  
初期値では".speech"を使用します。

- Please add ".speech" to any tags of the sentence you want to read.  
読み上げたい文章のタグに".speech"を追加してください。

```html
<p class="speach">The sentence is read.</p>
<p class="speach">この文章が読まれます。</p>

```
- Include nSpeech.js before `</body>`.  
`</body>`の前にnSpeech.jsを追加します。

```html
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
var example_1 = new nSpeech('#example_1', {
  lang: 'ja-JP'
});

var example_2 = new nSpeech('.example_2', {
  lang: 'ja-JP'
});

var example_3 = new nSpeech('p', {
  lang: 'ja-JP'
});
```

### Override the text selection
- Able to read the selected text.  
選択したテキストを読むことができます。

```javascript
var selectedTexts = new nSpeech();
var play = document.getElementById('play');
var stop = document.getElementById('stop');

play.addEventListener('click', function(){
  speech.playSelection();
});

stop.addEventListener('click', function(){
  speech.stopSelection();
});
```


## Options

- The following options are available.  
以下のオプションが利用できます。
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
  
  
  onend   : function() { return undefined; },
  onstart : function() { return undefined; },
  onerror : function() { return undefined; },
  onmark  : function() { return undefined; },
  debug   : false
};
var speech = new nSpeech(options);
```

- `lang` can use the options from (ja-JP) or other selects in this link.  
`lang`では以下の以下のリンクにあるセレクトの(ja-JP)などが利用できます。  
[https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)


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
speech.onend = fu(ion(){
  console.log("onend");
});

// Fire when an error occurs.
speech.onerror = (ction(){
  console.log("onerror");
});

// Fired when the spoken utterance reaches a named SSML "mark" tag.
speech.onmark = f(tion(){
  console.log("onmark");
});

// Fire when pause.
speech.onpause = (ction(){
  console.log("onpause");
});

// Fire when resume.
speech.onresume =(nction(){
  console.log("onresume");
});

// Fire when start.
speech.onstart = (ction(){
  console.log("onstart");
});

```

## Browser
- Chrome (Latest)
- Firefox (Latest)

## TODO
- Heading and some text adds period. (Because reading to flush)  
見出しやその他文章に句読点をつけたい。(流れるように読んでしまうため)

## License
Released under the MIT License. See the `LICENSE` file for details

## Change Log
##### 2017.10.11 - [v1.0.3](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.3)
- playSelection integrate to play.
- Add change voice options.
- Supported in input and textarea.

##### 2017.10.10 - [v1.0.2](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.2)
- Add other callback methods. onboundary, onpause, onresume.

##### 2017.10.06 - [v1.0.1](https://github.com/nkhr7/nSpeech/releases/tag/v1.0.1)
- Supported the override text selection.

