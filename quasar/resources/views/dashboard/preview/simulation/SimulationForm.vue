<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Preview/Simulation/Schema/SimulationSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'SimulationForm',
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
