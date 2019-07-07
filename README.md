# mofron-event-style
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

style change event for mofron

event function is called when the component style is changed

## Feature
 - the target style keys can be specified by the "targetKeys" parameter
 - all style keys are a target if "targetKeys" parameters are null
 - you can select whether to make execute handler when a value is already set when this event is registered to the component
## Attention
 - for valid this event, style changing must be from the mofron API (ex. component.style()).

# Install
```
npm install mofron mofron-event-style
```

# Sample
```html
<require>
    <tag module="mofron-comp-frame">Frame</tag>
    <tag module="mofron-event-style">evStyle</tag>
</require>

<script run=init>
let evt = (p1,p2) => { console.log(p2); }
</script>
<script>
frm.width("1.5rem");
</script>

<Frame name=frm event=evStyle(evt,"width")>
</Frame>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | initEvent | boolean | true: if the target key value is already set, the handler is executed. |
| | | | false: if the target key value is already set, the handler is not executed. |
| ◯  | handler |  | handler parameter |
| ◯  | targetKeys | string/array | watching target keys |

