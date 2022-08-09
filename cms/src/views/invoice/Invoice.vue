<template>
    <div class="container">
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>´

        <b-card class="card">
            <b-row>
                <b-col>
                    <h1>Invoice Management</h1>
                    <hr />
                    <b-button @click.self="generateInvoice()">Generate Invoice</b-button>
                    <hr />
                    <b-table :bordered="true" striped hover :items="invoices" :fields="fields" label-sort-asc=""
                        label-sort-desc="" label-sort-clear="">

                        <template #cell(issuingDate)="row">
                            {{ row.item.issuingDate | dateFormat }}
                        </template>

                        <template #cell(totalAmount)="row">
                            ${{ row.item.totalAmount | decimalFormat }}
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
<script>

import invoiceApi from '../../api/invoiceApi';
import loading from 'vue-loading-overlay';
import invoiceHub from '../../hub/invoiceHub';
export default {
    components: {
        loading
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
                    key: 'issuingDate',
                    label: 'Date',
                    sortable: true
                },
                {
                    key: 'month',
                    label: 'Month',
                    sortable: true,
                },
                {
                    key: 'year',
                    label: 'Year',
                    sortable: true,
                },
                {
                    key: 'totalAmount',
                    label: 'Total',
                    sortable: true,
                }
            ],
            invoices: [],

            isLoading: false
        }
    },
    name: 'invoice-list',
    methods: {
        async loadInvoice() {
            let vm = this;
            vm.isLoading = true;
            const { data } = await invoiceApi.fetchInvoice();
            vm.invoices = data;
            vm.isLoading = false;
        },
        async generateInvoice() {
            this.isLoading = true;
            try {
                await invoiceApi.generateInvoice();
                this.$toastr.success('Generating Invoice is in progress', 'Information');
            } catch (error) {
                console.log(error)
                this.$toastr.error('Error generating invoice', 'Error');
            }
            this.isLoading = false;
        }
    },
    async mounted() {
        let vm = this;
        // Initial load
        await vm.loadInvoice();
        
        // Signal R push notif
        invoiceHub.client.on('RefreshInvoiceList',async () => {
            await vm.loadInvoice();
        });
        invoiceHub.start();
    }
}

</script>
<style>
.card {
    padding: 15px
}
</style>