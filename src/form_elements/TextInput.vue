<template>
    <f7-list>
        <f7-list-item>
            <f7-label>{{label}}</f7-label>
            <f7-input :type="type"
                      :name="name"
                      :value="value"
                      @input="$emit('input',$event.target.value)"></f7-input>
        </f7-list-item>
    </f7-list>
</template>

<script>
    export default {
        name: 'TextInput',
        props: ['type', 'label', 'name', 'value']
    };
</script>