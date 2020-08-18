export default {
  methods: {
    apiPostCollaboratorsTable: function (datasetId, queryData, onSuccess, onError) {
      queryData.page -= 1
      return this.authAjax({ url: `dataset/${datasetId}/collaborator`, method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetExport: function (datasetType, queryData, onSuccess, onError) {
      return this.authAjax({ url: `dataset/export/${datasetType}`, dataType: 'blob', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetAttributeExport: function (queryData, onSuccess, onError) {
      return this.authAjax({ url: 'dataset/attribute/export', dataType: 'blob', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiGetDatasetSourceFile: function (datasetId, onSuccess, onError) {
      return this.authAjax({ url: `dataset/${datasetId}/download-source?random=${this.uuidv4()}`, dataType: 'blob', success: onSuccess, error: onError })
    },
    apiPostExperimentTable: function (queryData, onSuccess, onError) {
      queryData.page -= 1
      return this.authAjax({ url: 'experiment/table', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetTable: function (queryData, onSuccess, onError) {
      queryData.page -= 1
      return this.authAjax({ url: 'dataset/table', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetTableIds: function (queryData, onSuccess, onError) {
      delete queryData.orderBy
      delete queryData.ascending
      return this.authAjax({ url: 'dataset/table/ids', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetAttributeTableExport: function (datasetId, queryData, onSuccess, onError) {
      var url = datasetId !== null ? `dataset/${datasetId}/attribute/export` : 'dataset/attribute/table/export'
      return this.authAjax({ url: url, method: 'POST', dataType: 'blob', data: queryData, success: onSuccess, error: onError })
    },
    apiPostDatasetAsyncExport: function (uuids, onSuccess, onError) {
      var queryData = {
        uuids: uuids
      }
      return this.authAjax({ url: 'dataset/export/async', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiDeleteDatasetAsyncExport: function (uuid, onSuccess, onError) {
      return this.authAjax({ url: `dataset/export/async/${uuid}`, method: 'DELETE', success: onSuccess, error: onError })
    },
    apiPostDatasetAttributeTable: function (datasetId, queryData, onSuccess, onError) {
      queryData.page -= 1
      var url = datasetId !== null ? `dataset/${datasetId}/attribute` : 'dataset/attribute/table'
      return this.authAjax({ url: url, method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostTraitCompoundStats: function (statsType, queryData, onSuccess, onError) {
      return this.authAjax({ url: `dataset/stats/${statsType}`, method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostTraitStatsCategorical: function (queryData, onSuccess, onError) {
      return this.authAjax({ url: 'dataset/categorical/trial', dataType: 'blob', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiPostLicenseTable: function (queryData, onSuccess, onError) {
      queryData.page -= 1
      return this.authAjax({ url: 'license/table', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiGetAcceptLicense: function (licenseId, onSuccess, onError) {
      return this.authAjax({ url: `license/${licenseId}/accept`, success: onSuccess, error: onError })
    },
    apiPostFileResourceTable: function (queryData, onSuccess, onError) {
      queryData.page -= 1
      return this.authAjax({ url: 'fileresource/table', method: 'POST', data: queryData, success: onSuccess, error: onError })
    },
    apiGetFileResourceTypes: function (onSuccess, onError) {
      return this.authAjax({ url: 'fileresourcetype', success: onSuccess, error: onError })
    },
    apiPostFileresourceType: function (data, onSuccess, onError) {
      return this.authAjax({ url: 'fileresourcetype', method: 'POST', data: data, success: onSuccess, error: onError })
    },
    apiPostFileresourceFile: function (formData, onSuccess, onError) {
      return this.authForm({ url: 'fileresource', formData: formData, success: onSuccess, error: onError })
    },
    apiPutFileresource: function (data, onSuccess, onError) {
      return this.authAjax({ url: 'fileresource', method: 'PUT', data: data, success: onSuccess, error: onError })
    },
    apiDeleteFileresource: function (id, onSuccess, onError) {
      return this.authAjax({ url: `fileresource/${id}`, method: 'DELETE', success: onSuccess, error: onError })
    },
    apiDeleteFileresourceType: function (id, onSuccess, onError) {
      return this.authAjax({ url: `fileresourcetype/${id}`, method: 'DELETE', success: onSuccess, error: onError })
    }
  }
}
