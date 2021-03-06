<template>
  <div>
    <div v-if="trait !== null">
      <template v-if="trait === undefined">
        <div class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;" variant="primary" type="grow" />
        </div>
      </template>
      <template v-else>
        <h1 class="d-flex justify-content-between">
          <span>{{ trait.traitName }} <small v-if="trait.unitName">{{ trait.unitName }}</small></span>
          <span class="text-nowrap" v-if="trait.dataType"><i :class="`mdi mdi-36px ${dataTypes[trait.dataType].icon} fix-alignment`" :style="`color: ${dataTypes[trait.dataType].color()};`" /> {{ dataTypes[trait.dataType].text() }}</span>
        </h1>
        <p v-if="trait.traitDescription">{{ trait.traitDescription }}</p>

        <template v-if="trait.traitRestrictions">
          <h2>{{ $t('pageTraitDetailsRestrictionsTitle') }}</h2>

          <h4>
            <b-badge class="mr-2" v-if="trait.traitRestrictions.min !== undefined && trait.traitRestrictions.min !== null"><i class="mdi mdi-greater-than-or-equal" /> {{ trait.traitRestrictions.min }}</b-badge>
            <b-badge class="mr-2" v-if="trait.traitRestrictions.max !== undefined && trait.traitRestrictions.max !== null"><i class="mdi mdi-less-than-or-equal" /> {{ trait.traitRestrictions.max }}</b-badge>
            <b-badge class="mr-2" v-if="trait.traitRestrictions.categories"><i class="mdi mdi-code-brackets" /> {{ trait.traitRestrictions.categories.map(c => c.join(', ')).join(', ') }}</b-badge>
          </h4>
        </template>

        <!-- Image gallery with representative images for this trait -->
        <ImageGallery :foreignId="trait.traitId" referenceTable="phenotypes" :downloadName="trait.traitName" />
        <hr/>

        <!-- Synonyms -->
        <template v-if="trait.synonyms">
          <h2>{{ $t('genericSynonyms') }}</h2>
          <ul>
            <li v-for="(synonym, index) in trait.synonyms" :key="`trait-synonyms-${index}`">{{ synonym }}</li>
          </ul>
        </template>

        <h2>{{ $t('pageTraitDetailsDataTitle') }}</h2>
        <p>{{ $t('pageTraitDetailsDataText') }}</p>
        <!-- Table showing all data points for this trait -->
        <TrialsDataTable :getData="getData" :getIds="getIds" :filterOn="tableFilter" ref="traitDetailsTable" />

        <h2>{{ $t('pageTraitDetailsStatsTitle') }}</h2>
        <p>{{ $t('pageTraitDetailsStatsText') }}</p>
        <BarChart xColumn="phenotype_value"
                  :xTitle="trait.traitName"
                  :yTitle="$t('genericCount')"
                  :height="700"
                  :downloadName="trait.traitName"
                  :sourceFile="categoricalTraitFile"
                  v-on:bar-clicked="traitValueClicked"
                  ref="traitCategoryChart"
                  v-if="trait.dataType !== 'numeric'"/>
        <!-- Boxplot for this trait -->
        <BoxplotChart chartMode="datasetByItem" :xIds="[traitId]" xType="traits" ref="traitDetailsChart" v-else />

        <!-- Table showing all datasets this trait is scored in -->
        <DatasetTable :getData="getDatasetData" ref="datasetTable" v-on:license-accepted="update" />

        <div v-show="showAdditionalDatasets">
          <!-- Any additional datasets this trait is part of for which the license hasn't been accepted yet -->
          <DatasetsWithUnacceptedLicense datasetType="trials" v-on:license-accepted="update" v-on:data-changed="checkNumbers"/>
        </div>
      </template>
    </div>
    <h3 v-else>{{ $t('headingNoData') }}</h3>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import DatasetsWithUnacceptedLicense from '@/components/util/DatasetsWithUnacceptedLicense'
import DatasetTable from '@/components/tables/DatasetTable'
import BoxplotChart from '@/components/charts/BoxplotChart'
import ImageGallery from '@/components/images/ImageGallery'
import TrialsDataTable from '@/components/tables/TrialsDataTable'
import datasetApi from '@/mixins/api/dataset.js'
import miscApi from '@/mixins/api/misc.js'
import traitApi from '@/mixins/api/trait.js'
import colorMixin from '@/mixins/colors.js'
import typesMixin from '@/mixins/types.js'

export default {
  data: function () {
    return {
      traitId: null,
      trait: undefined,
      tableFilter: null,
      showAdditionalDatasets: true,
      categoricalTraitFile: null
    }
  },
  components: {
    BarChart,
    DatasetsWithUnacceptedLicense,
    DatasetTable,
    BoxplotChart,
    ImageGallery,
    TrialsDataTable
  },
  methods: {
    traitValueClicked: function (value) {
      this.tableFilter = [{
        column: {
          name: 'traitId',
          type: Number
        },
        comparator: 'equals',
        operator: 'and',
        values: [this.traitId],
        canBeChanged: false
      }, {
        column: {
          name: 'traitValue',
          type: String
        },
        comparator: 'equals',
        operator: 'and',
        values: [value]
      }]

      this.$nextTick(() => this.$refs.traitDetailsTable.refresh())
    },
    getDatasetData: function (data, callback) {
      return this.apiPostTraitDatasetTable(this.traitId, data, callback)
    },
    checkNumbers: function (requestData, data) {
      this.showAdditionalDatasets = data && data.count > 0
    },
    getData: function (data, callback) {
      return this.apiPostTrialsDataTable(data, callback)
    },
    getIds: function (data, callback) {
      return this.apiPostTrialsDataTableIds(data, callback)
    },
    update: function () {
      this.$refs.traitDetailsTable.refresh()
      this.$refs.datasetTable.refresh()

      if (this.$refs.traitDetailsChart) {
        this.$refs.traitDetailsChart.redraw()
      } else if (this.$refs.traitCategoryChart) {
        this.updateCategoryChart()
      }

      this.checkNumbers()
    },
    updateCategoryChart: function () {
      const query = {
        datasetIds: null,
        xIds: [this.traitId]
      }

      this.apiPostTraitStatsCategorical(query, result => {
        this.categoricalTraitFile = result
      })
    }
  },
  mixins: [ colorMixin, datasetApi, miscApi, traitApi, typesMixin ],
  mounted: function () {
    if (this.$route.params.traitId) {
      this.traitId = parseInt(this.$route.params.traitId)

      this.tableFilter = [{
        column: {
          name: 'traitId',
          type: Number
        },
        comparator: 'equals',
        operator: 'and',
        values: [this.traitId],
        canBeChanged: false
      }]

      const request = {
        page: 1,
        limit: 1,
        filter: [{
          column: 'traitId',
          comparator: 'equals',
          operator: 'and',
          values: [this.traitId]
        }]
      }
      this.apiPostTraitTable(request, result => {
        if (result && result.data && result.data.length > 0) {
          this.trait = result.data[0]

          if (this.trait.dataType !== 'numeric') {
            this.updateCategoryChart()
          }
        } else {
          this.trait = null
        }
      })
    }
  }
}
</script>

<style>

</style>
