<template>
  <div>
    <h1>{{ $t('pageDatasetCrossTypeComparisonTitle') }}</h1>
    <p>{{ $t('pageDatasetCrossTypeComparisonText') }}</p>
    <b-row>
      <b-col cols=12 sm=6>
        <h2>{{ $t('pageDatasetCrossTypeComparisonFirstSubtitle') }}</h2>
        
        <CrossDataTypeSelection ref="selectionFirst" @data-type-changed="type => updateDataType(type, 0)" />
      </b-col>
      <b-col cols=12 sm=6>
        <h2>{{ $t('pageDatasetCrossTypeComparisonSecondSubtitle') }}</h2>

        <CrossDataTypeSelection ref="selectionSecond" :showGroups="showGroups" @data-type-changed="type => updateDataType(type, 1)" />
      </b-col>
    </b-row>

    <b-button variant="primary" @click="plot" class="mt-3"><i class="mdi mdi-18px mdi-arrow-right-box fix-alignment" /> {{ $t('buttonPlot') }}</b-button>

    <ScatterChart ref="chart" :itemType="itemType" datasetType="trials" :x="dimensions[0]" :y="dimensions[1]" v-if="chartData" />
  </div>
</template>

<script>
import Vue from 'vue'

import CrossDataTypeSelection from '@/components/export/CrossDataTypeSelection'
import ScatterChart from '@/components/charts/ScatterChart'

import { EventBus } from '@/plugins/event-bus.js'
import datasetApi from '@/mixins/api/dataset.js'

export default {
  components: {
    CrossDataTypeSelection,
    ScatterChart
  },
  data: function () {
    return {
      itemType: 'germplasm',
      chartData: null,
      dimensions: [],
      dataTypes: ['TRAIT', 'TRAIT']
    }
  },
  computed: {
    showGroups: function () {
      return this.dataTypes[0] !== this.dataTypes[1]
    }
  },
  mixins: [ datasetApi ],
  methods: {
    updateDataType: function (type, index) {
      Vue.set(this.dataTypes, index, type)
    },
    plot: function () {
      const first = this.$refs.selectionFirst.getSelection()
      const second = this.$refs.selectionSecond.getSelection()

      if (first === null || second === null || first.itemId === null || second.itemId === null) {
        // TODO: show error
        return
      }

      this.dimensions = [first.itemName, second.itemName]

      EventBus.$emit('show-loading', true)
      this.apiPostCrossDataTypeComparison({
        first: {
          id: first.dataType === 'GERMPLASM_COLUMN' ? null : first.itemId,
          columnName: first.dataType === 'GERMPLASM_COLUMN' ? first.itemId : null,
          type: first.dataType,
          markedIds: first.markedIds,
          groupIds: first.groupIds,
          datasetIds: first.datasetIds
        },
        second: {
          id: second.dataType === 'GERMPLASM_COLUMN' ? null : second.itemId,
          columnName: second.dataType === 'GERMPLASM_COLUMN' ? second.itemId : null,
          type: second.dataType,
          markedIds: second.markedIds,
          groupIds: second.groupIds,
          datasetIds: second.datasetIds
        }
      }, result => {
        this.chartData = result

        this.$nextTick(() => {
          this.$refs.chart.redraw(result, {
            names: null,
            ids: null,
            column: null
          })

          EventBus.$emit('show-loading', false)
        })
      })
    }
  }
}
</script>

<style>

</style>
