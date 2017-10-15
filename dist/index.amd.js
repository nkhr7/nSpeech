define(function () { 'use strict';

/*!
 * nSpeech
 * nSpeech is screen reader library.
 *
 * https://github.com/nkhr7/nSpeech/
 *
 * Copyright 2017, Koichi Yoshimoto
 *
 * Version: 1.0.3
 *
 * Licensed under MIT
 *
 * Released on: 2017.10.11
 */
var nSpeech$1 = function ( _selector, _options ){
  /* eslint no-undef: "off" */
  /* eslint no-extra-semi: "off" */

  // unsupported.
  if (typeof SpeechSynthesisUtterance === "undefined") {
    alert("音声読み上げに未対応なブラウザです。\n\n音声読み上げ可能ブラウザ\nGoogle Chrome、Safari、Opera");
    return;
  }

  var self = Object.create(nSpeech.prototype);

  var defaultClassName = ".speech";

  // This is HTML class name by used to getElementsByClassName.
  var selector = (typeof _selector !== "undefined") ? _selector : defaultClassName;

  // speechSynthesis.getVoices
  var voices = [];

  // speechSynthesis
  var synth  = window.speechSynthesis;


  // In this case new nSpeech({ volume: 1 })
  // selector is default defaultClassName and options insert this.
  if ( typeof _selector === "object" ) {
    _options  = selector;
    selector = defaultClassName;
  }

  /**
  * Default Options
  *
  * lang      : This is spoken the language. ex: 'en-US'.
  * voice     : This will insert an object from the voice
  * volme     : Speech volume.
  * rate      : Speech rate. Speech gets faster if increase.
  * pitch     : Speech pitch. Speech gets shrill voice if increase
  * text      : Read this text.
  */
  self.options = {
    lang    : "",
    voice   : null,
    volume  : 1,
    rate    : 1,
    pitch   : 1,
    text    : "",
    onboundary : function() { return undefined; },
    onend      : function() { resetText(); return undefined; },
    onerror    : function() { return undefined; },
    onmark     : function() { return undefined; },
    onpause    : function() { return undefined; },
    onresume   : function() { return undefined; },
    onstart    : function() { return undefined; },
    debug   : false
  };

  // DOM Elements
  self.elements = [];

  self.utterance = new window.SpeechSynthesisUtterance();

  var provisionText = "";


  /**
  * Init
  */
  var init = function () {

    self.elements = getElements( selector );

    getSynthVoices();
    setOptions(_options);

    if ( voices.length > 0 ) {
      setOptionVoice();
      setMessage();
      setUtterance();
    }
  };


  /**
  * Gets elemtns by TagName, ID or className
  * @param  String str
  * @return NodeList
  */
  var getElements = function ( str ) {
    return document.querySelectorAll ( str );
  };


  /**
  * Set voices from speechSynthesis.getvoices.
  * We can't get voices before window.onbeforeunload.
  */
  var getSynthVoices = function () {
    // get voices.
    voices = synth.getVoices();
  };


  /**
  * Set options
  * To merge default options from user options.
  * If after new instance, we can use this function and change the options
  */
  var setOptions = function ( _options ) {

    // User denied options.
    if ( typeof _options === "object" ) {
      Object.keys(_options).forEach( function (key) {
        self.options[key] = _options[key];
      });
    }

  };


  /**
  * Set option voice
  * Default setting is a speechSynthesis voice by the default.
  * If we want to use other language, can change by options.lang.
  */
  var setOptionVoice = function () {

    // This Object is to insert default the language.
    var defaultVoice = {};

    if ( voices.length > 0 ) {
      // Voices loop
      for ( var i in voices ) {

        // If this voice is defined language.
        if ( voices[i].lang === self.options.lang ) {

          // Set options.lang
          self.options.voice = voices[i];
          return true;

          // If this voice is the default language.
        } else if ( voices[i].default === true ) {

          // set default voice
          defaultVoice = voices[i];

        }
      }
    }

    // If not found the language that you want to get the language,
    // set default voice to options.voice
    self.options.voice = defaultVoice;
    return false;
  };


  /**
  * Set message to read text
  */
  var setMessage = function () {
    // To set message string.
    var message = formatText ( self.options.text );

    var length = self.elements.length;
    for (var i = 0; i < length; ++i) {
      var txt;

      if ( self.elements[i].tagName === "INPUT" || self.elements[i].tagName === "TEXTAREA" ) {
        txt = self.elements[i].value;

      } else {
        // Inset text
        txt = self.elements[i].textContent;
      }

      message += formatText ( txt ) + " ";
    }
    // Insert message to default text
    self.options.text = message;
  };


  /**
  * Set Utterance with utteranceOptions.
  */
  var setUtterance = function () {

    self.utterance.voice      = self.options.voice;
    self.utterance.volume     = self.options.volume;
    self.utterance.rate       = self.options.rate;
    self.utterance.pitch      = self.options.pitch;
    self.utterance.text       = self.options.text;
    self.utterance.onboundary = self.options.onboundary;
    self.utterance.onend      = self.options.onend;
    self.utterance.onerror    = self.options.onerror;
    self.utterance.onmark     = self.options.onmark;
    self.utterance.onpause    = self.options.onpause;
    self.utterance.onresume   = self.options.onresume;
    self.utterance.onstart    = self.options.onstart;

    if ( self.options.debug ) { console.log(self.utterance); }
  };


  /**
  * format period
  * @param  String str
  * @return String
  */
  var formatText = function ( str ) {

    var txt = "";
    var formatReg = /[\n\r]+|[\s]{2,}/g;

    if ( typeof str !== "undefined" && typeof str === "string" ) {

      txt = str.replace(formatReg, ' ').trim();

    }

    return txt;
  };


  /**
   * Set the override the text selection.
   * @return bool
   */
  var setSelection = function ( str ) {

    var str = "";

    // Get the text selection.
    if ( window.getSelection ) {
      str = window.getSelection().toString();
    } else {
      // For IE
      str = document.selection.createRange().text;
    }

    // If get selection text.
    if ( str !== "" ) {
      // Keep default text.
      provisionText = self.utterance.text;

      // Set the text selection.
      self.utterance.text = str;
      return true;
    }
    return false;
  };


  /**
   * Reset utterance.text if this is changed by override the text selection.
   * @return bool
   */
  var resetText = function () {
    if ( provisionText !== "" ) {
      // Restore default text.
      self.utterance.text = provisionText;
      return true;
    }
    return false;
  };


  /**
  * player controllers
  */
  // play
  self.play = function () {
    // If not setup options.
    if ( self.options.voice === null ) {
      init();
    }

    // Repalce text when getSelection.
    setSelection();

    synth.speak( self.utterance );
  };

  // pause
  self.pause = function () {
    synth.pause( self.utterance );
  };

  // resum
  self.resume = function () {
    synth.resume( self.utterance );
  };

  // stop
  self.stop = function () {
    resetText();
    synth.cancel();
  };


  /**
   * Change options
   */
  self.replaceText = function ( str ) {
    self.utterance.text = str;
  };

  self.changeVolume = function ( value ) {
   self.utterance.volume = value;
  };

  self.changeRate = function ( value ) {
   self.utterance.rate = value;
  };

  self.changePitch = function ( value ) {
   self.utterance.pitch = value;
  };


  /**
  * Callback methods
  */
 // Fired when the spoken utterance reaches a word or sentence boundary.
  self.onboundary = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onboundary: fn } );
    }
  };

  // Fire when finish.
  self.onend = function ( fn ) {
    resetText();
    if ( typeof fn === "function" ) {
      setOptions( { onend: fn } );
    }
  };

  // Fire when an error occurs.
  self.onerror = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onerror: fn } );
    }
  };

  // Fired when the spoken utterance reaches a named SSML "mark" tag.
  self.onmark = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onmark: fn } );
    }
  };

  // Fire when pause.
  self.onpause = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onpause: fn } );
    }
  };

  // Fire when resume.
  self.onresume = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onresume: fn } );
    }
  };

  // Fire when start.
  self.onstart = function ( fn ) {
    if ( typeof fn === "function" ) {
      setOptions( { onstart: fn } );
    }
  };



  // When getting out a tab.
  window.onbeforeunload = function() {
    self.stop();
  };

  // Fired when enable getVoices.
  window.speechSynthesis.onvoiceschanged = function() {
    init();
  };


  init();

  return self;
};

return nSpeech$1;

});
