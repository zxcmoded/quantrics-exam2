<template>
    <div>
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>

        <b-modal id="modal-edit-asset" ref="modal" title="Update Asset" ok-title="Update" @ok="handleOk">
            <form>
                <b-row>
                    <b-col col-auto md="3" class="my-auto">
                        <label>Name</label>
                    </b-col>
                    <b-col>
                        <input type="text" v-validate="'required'" class="form-control" v-model="form.Name"
                            name="name" />
                        <span v-show="errors.has('name')" class="text-danger">
                            {{ errors.first('name') }}
                        </span>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col col-auto md="3" class="my-auto">
                        <label>Price</label>
                    </b-col>
                    <b-col>
                        <input type="number" v-model="form.Price" v-validate="'required|min_value:0'"
                            class="form-control" name="price" />
                        <span v-show="errors.has('price')" class="text-danger">
                            {{ errors.first('price') }}
                        </span>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col col-auto md="3" class="my-auto">
                        <label>Valid From</label>
                    </b-col>
                    <b-col>
                        <input type="date" v-model="form.ValidFrom" class="form-control" name="ValidFrom" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col col-auto md="3" class="my-auto">
                        <label>Valid To</label>
                    </b-col>
                    <b-col>
                        <input type="date" v-model="form.ValidTo" class="form-control" name="ValidTo" />
                    </b-col>
                </b-row>
            </form>
        </b-modal>
    </div>
</template>
<script>
import assetApi from '../../api/assetApi';
import loading from 'vue-loading-overlay';
import moment from 'moment';

export default {
    props: {
        asset: {}
    },
    components: {
        loading
    },
    name: 'edit-asset-dialog',
    watch: {
        asset(value) {
            this.form.Id = value.id;
            this.form.Name = value.name;
            this.form.Price = value.price;
            this.form.ValidFrom = value.validFrom ? moment(value.validFrom).format('YYYY-MM-DD') : null;
            this.form.ValidTo = value.validTo ? moment(value.validTo).format('YYYY-MM-DD') : null;
            console.log(this.form);
        }
    },
    data() {
        return {
            form: {
                Id: null,
                Name: '',
                Price: 0,
                ValidFrom: null,
                ValidTo: null
            },
            isLoading: false
        }
    },
    methods: {
        async handleOk(bvModalEvent) {
            try {
                bvModalEvent.preventDefault();

                if (await this.isValidInputs()) {
                    this.isLoading = true;

                    const { data } = await assetApi.updateAsset(this.form);
                    if (data.success) {
                        this.$toastr.success(data.message, 'Information');
                        this.$emit('loadList', data);
                        this.$bvModal.hide('modal-edit-asset');
                    } else {
                        this.$toastr.warning(data.message, 'Warning');
                    }
                }
            } catch (error) {
                console.log(error);
                this.$toastr.error('Error updating asset', 'Error');
            }
            this.isLoading = false;
        },
        async isValidInputs() {
            let isValid = await this.$validator.validateAll();

            if (!isValid) {
                this.$toastr.warning('Please address the field/s with invalid input.');
                return false;
            } else {
                if (this.form.ValidFrom && this.form.ValidTo) {
                    if (new Date(this.form.ValidFrom) > new Date(this.form.ValidTo)) {
                        this.$toastr.warning('Valid To must be higher than Valid From');
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
</script>