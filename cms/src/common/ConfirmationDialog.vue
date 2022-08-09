<template>
    <div>
        <b-modal id="modal-confirmation" ref="modal" :title="title">
            <div class="text-center">
                {{ content }}
            </div>
            <template #modal-footer>
                <div class="w-100 text-center">
                    <b-button variant="danger" size="sm" class="float-right" @click="closeModal()">
                        Close
                    </b-button>
                    &nbsp;
                    <b-button variant="primary" size="sm" class="float-right"
                        @click="handleConfirm()">
                        Confirm
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>
<script>
export default {
    name: 'confirmation-dialog',
    props: {
        content: String,
        title: String
    },
    methods: {
        handleConfirm() {
            this.$emit('confirm',true);
            this.closeModal();
        },
        closeModal() {
            this.$bvModal.hide('modal-confirmation')
        }
    }
}
</script>