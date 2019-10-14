export default {
  TABLE_COLUMNS_GERMPLASM_SEARCHABLE: [
    {
      name: 'germplasmId',
      type: Number
    }, {
      name: 'germplasmName',
      type: String
    }, {
      name: 'germplasmNumber',
      type: String
    }, {
      name: 'germplasmPuid',
      type: String
    }, {
      name: 'entityTypeName',
      type: 'entityType'
    }, {
      name: 'biologicalStatusName',
      type: String
    }, {
      name: 'synonyms',
      type: String
    }, {
      name: 'collectorNumber',
      type: String
    }, {
      name: 'genus',
      type: String
    }, {
      name: 'species',
      type: String
    }, {
      name: 'subtaxa',
      type: String
    }, {
      name: 'location',
      type: String
    }, {
      name: 'elevation',
      type: Number
    }, {
      name: 'countryName',
      type: String
    }, {
      name: 'collDate',
      type: Date
    }
  ],
  TABLE_COLUMNS_GERMPLASM_ATTRIBUTE_SEARCHABLE: [
    {
      name: 'germplasmId',
      type: Number
    }, {
      name: 'germplasmGid',
      type: String
    }, {
      name: 'germplasmName',
      type: String
    }, {
      name: 'attributeName',
      type: String
    }, {
      name: 'attributeDescription',
      type: String
    }, {
      name: 'attributeType',
      type: 'dataType'
    }, {
      name: 'attributeValue',
      type: String
    }
  ],
  TABLE_COLUMNS_DATASET_SEARCHABLE: [
    {
      name: 'datasetId',
      type: Number
    }, {
      name: 'datasetName',
      type: String
    }, {
      name: 'datasetDescription',
      type: String
    }, {
      name: 'experimentName',
      type: String
    }, {
      name: 'experimentType',
      type: String
    }, {
      name: 'datatype',
      type: String
    }, {
      name: 'location',
      type: String
    }, {
      name: 'countryName',
      type: String
    }, {
      name: 'licenseName',
      type: String
    }, {
      name: 'contact',
      type: String
    }, {
      name: 'startDate',
      type: Date
    }, {
      name: 'endDate',
      type: Date
    }, {
      name: 'dataObjectCount',
      type: Number
    }, {
      name: 'dataPointCount',
      type: Number
    }
  ],
  TABLE_COLUMNS_DATASET_ATTRIBUTE_SEARCHABLE: [
    {
      name: 'datasetId',
      type: Number
    }, {
      name: 'datasetName',
      type: String
    }, {
      name: 'datasetDescription',
      type: String
    }, {
      name: 'attributeName',
      type: String
    }, {
      name: 'attributeDescription',
      type: String
    }, {
      name: 'attributeType',
      type: 'dataType'
    }, {
      name: 'attributeValue',
      type: String
    }
  ],
  TABLE_COLUMNS_TRIALS_DATA_SEARCHABLE: [
    {
      name: 'germplasmId',
      type: Number
    }, {
      name: 'germplasmGid',
      type: String
    }, {
      name: 'germplasmName',
      type: String
    }, {
      name: 'entityType',
      type: 'entityType'
    }, {
      name: 'datasetName',
      type: String
    }, {
      name: 'locationName',
      type: String
    }, {
      name: 'countryName',
      type: String
    }, {
      name: 'traitName',
      type: String
    }, {
      name: 'unitName',
      type: String
    }, {
      name: 'recordingDate',
      type: Date
    }, {
      name: 'traitValue',
      type: String
    }
  ],
  TABLE_COLUMNS_COMPOUND_DATA_SEARCHABLE: [
    {
      name: 'germplasmId',
      type: Number
    }, {
      name: 'germplasmGid',
      type: String
    }, {
      name: 'germplasmName',
      type: String
    }, {
      name: 'entityType',
      type: 'entityType'
    }, {
      name: 'datasetName',
      type: String
    }, {
      name: 'compoundName',
      type: String
    }, {
      name: 'unitName',
      type: String
    }, {
      name: 'recordingDate',
      type: Date
    }, {
      name: 'compoundValue',
      type: String
    }
  ],
  TABLE_COLUMNS_LOCATION_SEARCHABLE: [
    {
      name: 'locationId',
      type: Number
    }, {
      name: 'locationName',
      type: String
    }, {
      name: 'locationRegion',
      type: String
    }, {
      name: 'locationState',
      type: String
    }, {
      name: 'locationType',
      type: 'locationType'
    }, {
      name: 'locationLatitude',
      type: Number
    }, {
      name: 'locationLongitude',
      type: Number
    }, {
      name: 'locationElevation',
      type: Number
    }, {
      name: 'countryName',
      type: String
    }
  ],
  TABLE_COLUMNS_MAP_DEFINITION_SEARCHABLE: [
    {
      name: 'markerId',
      type: Number
    }, {
      name: 'markerName',
      type: String
    }, {
      name: 'synonyms',
      type: String
    }, {
      name: 'mapFeatureType',
      type: String
    }, {
      name: 'mapId',
      type: Number
    }, {
      name: 'mapName',
      type: String
    }, {
      name: 'chromosome',
      type: String
    }, {
      name: 'position',
      type: Number
    }
  ],
  TABLE_COLUMNS_PEDIGREE_SEARCHABLE: [
    {
      name: 'parentId',
      type: Number
    }, {
      name: 'parentGid',
      type: String
    }, {
      name: 'parentName',
      type: String
    }, {
      name: 'childId',
      type: Number
    }, {
      name: 'childGid',
      type: String
    }, {
      name: 'childName',
      type: String
    }, {
      name: 'relationshipType',
      type: String
    }, {
      name: 'relationshipDescription',
      type: String
    }, {
      name: 'pedigreeDescription',
      type: String
    }, {
      name: 'pedigreeAuthor',
      type: String
    }
  ]
}
