# nSpeech

nSpeech is screen reader library.  
nSpeechは[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)を使用した、スクリーンリーダーライブラリです。

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
var speech = new nSpeech('#speech', {
  lang: 'ja-JP'
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

// When finish.
speech.onend(function(){ 
  console.log("onend"); 
});
// When start.
speech.onstart(function(){ 
  console.log("onstart"); 
});

// When an error occurs.
speech.onerror(function(){ 
  console.log("onerror"); 
});

// Fired when the spoken utterance reaches a named SSML "mark" tag.
speech.onmark(function(){ 
  console.log("onmark"); 
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

## P.S.
I am not very good at English. XO  
I will continue to study English! \\(ツ)/
