<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Admin/Profile/Schema/ProfileSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ProfileForm',
  /**
   */
  schema: Schema
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
