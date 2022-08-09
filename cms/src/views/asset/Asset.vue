<template>
  <div class="container">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>´

    <b-card class="card">
      <b-row>
        <b-col>
          <h1>Asset Management</h1>
          <hr />
          <form>
            <b-row>
              <b-col md="2" class="my-auto">
                <label>Name</label>
              </b-col>
              <b-col md="2">
                <input type="text" v-model="filterForm.Name" class="form-control" />
              </b-col>
              <b-col md="2" class="my-auto">
                <label>Price</label>
              </b-col>
              <b-col md="2">
                <input type="number" v-model="filterForm.Price" class="form-control" />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="2" class="my-auto">
                <label>Valid From</label>
              </b-col>
              <b-col md="2">
                <input type="date" v-model="filterForm.ValidFrom" class="form-control" />
              </b-col>
              <b-col md="2" class="my-auto">
                <label>Valid To</label>
              </b-col>
              <b-col md="2">
                <input type="date" v-model="filterForm.ValidTo" class="form-control" />
              </b-col>
              <b-col md="4">
                <b-button variant="primary" @click.self="loadAssets()">Search</b-button>&nbsp;
                <b-button variant="danger" @click.self="clearFilters()">Clear</b-button>
              </b-col>
            </b-row>
          </form>
          <hr />
          <b-button v-b-modal.modal-add-asset>Add Asset</b-button>
          <hr />
          <b-table :bordered="true" striped hover :items="assets" :fields="fields" label-sort-asc="" label-sort-desc=""
            label-sort-clear="">

            <template #cell(validFrom)="row">
              {{ row.item.validFrom | dateFormat }}
            </template>

            <template #cell(validTo)="row">
              {{ row.item.validTo | dateFormat }}
            </template>

            <template #cell(price)="row">
              ${{ row.item.price | decimalFormat }}
            </template>

            <template #cell(actions)="row">
              <b-button size="sm" class="mr-1" v-b-modal.modal-edit-asset @click="selItem = row.item" variant="success">
                Edit
              </b-button>&nbsp;
              <b-button size="sm" variant="danger" v-b-modal.modal-confirmation @click="selItem = row.item">
                Delete
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>

    <add-asset-dialog @loadList="loadAssets()"></add-asset-dialog>
    <edit-asset-dialog :asset="selItem" @loadList="loadAssets()"></edit-asset-dialog>

    <confirmation-dialog @confirm="deleteAsset()" :title="'Confirmation'"
      :content="'Do you want to delete this asset?'">
    </confirmation-dialog>
  </div>
</template>
<script>

import assetApi from '../../api/assetApi';
import addAssetDialog from './AddAssetDialog.vue';
import editAssetDialog from './EditAssetDialog.vue';
import confirmationDialog from '@/common/ConfirmationDialog.vue';
import loading from 'vue-loading-overlay';

export default {
  components: {
    addAssetDialog,
    editAssetDialog,
    confirmationDialog,
    loading
  },
  watch: {
    'filterForm.Price'(value) {
      this.filterForm.Price = value ? value : null;
    },
    'filterForm.ValidFrom'(value) {
      this.filterForm.ValidFrom = value ? value : null;
    },
    'filterForm.ValidTo'(value) {
      this.filterForm.ValidTo = value ? value : null;
    }
  },
  data: function () {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'id',
          label: 'Id',
          sortable: true
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'validFrom',
          label: 'Valid From',
          sortable: true,
        },
        {
          key: 'validTo',
          label: 'Valid To',
          sortable: true,
        },
        {
          key: 'price',
          label: 'price',
          sortable: true,
        },
        { key: 'actions', label: 'Actions' }
      ],
      assets: [],
      selItem: {},

      filterForm: {
        Name: '',
        Price: null,
        ValidFrom: null,
        ValidTo: null
      },

      isLoading: false
    }
  },
  name: 'asset-list',
  methods: {
    async loadAssets() {
      let vm = this;
      vm.isLoading = true;
      const { data } = await assetApi.fetchAssets(this.filterForm);
      vm.assets = data;
      vm.isLoading = false;
    },

    clearFilters() {
      this.filterForm = {
        Name: '',
        Price: null,
        ValidFrom: null,
        ValidTo: null
      };

      this.loadAssets();
    },

    async deleteAsset() {
      this.isLoading = true;
      try {
        const { data } = await assetApi.deleteAsset(this.selItem.id);
        if (data) {
          this.$toastr.success('Deleted successfully', 'Information');
          this.selItem = {};
          this.loadAssets();
        } else {
          this.$toastr.warning('Unable to delete asset', 'Warning');
        }
      } catch (error) {
        this.$toastr.error(error.error.text, 'Error');
      }
      this.isLoading = false;
    }
  },
  async mounted() {
    let vm = this;
    await vm.loadAssets()
  }
}

</script>
<style>
.card {
  padding: 15px
}
</style>