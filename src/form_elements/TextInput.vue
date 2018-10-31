<template>
    <f7-list-item>
        <f7-label>{{label}}</f7-label>
        <f7-input type="text"
                  :name="name"
                  :value="value"
                  @input="$emit('input',$event.target.value)"></f7-input>
    </f7-list-item>
</template>

<script>
    export default {
        name: 'TextInput',
        props: ['label', 'name', 'value']
    };
</script>