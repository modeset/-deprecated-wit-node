wit-node
========

Easy interface for interacting with the [Wit.ai](http://wit.ai) natural language parsing API.

This project will expand as the Wit.ai API expands, but as it stands there's a single endpoint. You can hit this
endpoint easily with `Wit.message([your message])`, which returns that phrase or sentence into an object with an intent
and entities if any were specified.

You will need to create a Wit.ai account and begin training it.

## Installation

```shell
npm install wit-node@">=0.0.2"
```

## Usage

Wit uses [Q](https://github.com/kriskowal/q) for promises, so the interface is nice and clean and reliable.

```javascript
var promise = Wit.message('Hi')
promise.then(function(result) {
  result.intent // will be Hello with the default Wit instance.
  result.confidence // will be relatively low initially.
})
```

## Result / Entity properties

<dl>

<dt> raw </dt><dd>
Raw response object (parsed JSON)
</dd>

<dt> msgId </dt><dd>
The unique message id provided back from Wit.
</dd>

<dt> msgBody </dt><dd>
The original message sent.
</dd>

<dt> intent </dt><dd>
The intent, as determined by Wit.
</dd>

<dt> confidence </dt><dd>
The confidence level that Wit determined.
</dd>

<dt> entities </dt><dd>
Object of entities, which contain the value, and the start/end position within the message.
```javascript
{
  start: [number] // the start position in msgBody.
  end: [number] // the end position in msgBody.
  value: [string] // the value as determined by Wit (might not be the same as body).
  body: [string] // the actual value found in msgBody.
}
```
</dd>

</dl>


## License

Licensed under the [MIT License](http://creativecommons.org/licenses/MIT/)

Copyright 2012 [Mode Set](https://github.com/modeset)


## Make Code Not War
![crest](https://secure.gravatar.com/avatar/aa8ea677b07f626479fd280049b0e19f?s=75)
