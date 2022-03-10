<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Community Center Contact Details
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <td style="width: 150px; text-align: left">Type</td>
                <td style="width: 150px; text-align: left">Conctact</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="width: 150px; text-align: left">Community Center</td>
                <td style="width: 150px; text-align: left">
                  {{ contact.community_center_name }}
                </td>
              </tr>
              <tr v-if="contact.community_center_contact_name">
                <td style="width: 150px; text-align: left">Person in Charge</td>
                <td style="width: 150px; text-align: left">
                  {{ contact.community_center_contact_name }}
                </td>
              </tr>
              <tr
                v-if="
                  contact.community_center_phone_country_code ||
                  contact.community_center_phone_number
                "
              >
                <td style="width: 150px; text-align: left">Phone</td>
                <td style="width: 150px; text-align: left">
                  {{ contact.community_center_phone_country_code }}
                  {{ contact.community_center_phone_number }}
                </td>
              </tr>
              <tr v-if="contact.community_center_email">
                <td style="width: 150px; text-align: left">Email</td>
                <td style="width: 150px; text-align: left">
                  {{ contact.community_center_email }}
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "er-table-contact-details.vue",
  props: {
    currentContact: Object,
  },
  computed: {
    contact() {
      return this.currentContact || {};
    },
  },
};
</script>
