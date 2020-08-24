# mofron-event-style
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

style change event for mofron

this event notifies when the component style of the key that the user specifies is changed

## event function parameter

- component: event target component object

- array: the value of the target style (0:new style value, 1:the previous style value)

- mixed: user specified parameter

## Feature
 - the target style keys can be specified by the "tgtKeys" parameter
 - you can select whether to make execute handler when a value is already set when this event is registered to the component
## Attention
 - for valid this event, style changing must be from the mofron API (ex. component.style()).

# Install
```
npm install mofron mofron-event-style
```

# Sample
```html
<setting>
    <tag module="mofron-comp-frame">Frame</tag>
    <tag module="mofron-event-style">evStyle</tag>
</setting>

<script name=sevt run=init>
    console.log(sevt2);
</script>

<script>
    setTimeout(
        () => {
            frm.width("2rem");
        },
        1000
    );
</script>

<Frame name=frm>
    <event>
        <evStyle init-notify=true>@sevt,width</evStyle>
    </event>
</Frame>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | initNotify | boolean | true: if the target key value is already set, the handler is executed. (default) |
| | | | false: if the target key value is already set, the handler is not executed. |
| ◯  | tgtKeys | mixed | string: listening target key |
| | | | array: listening target keys |

