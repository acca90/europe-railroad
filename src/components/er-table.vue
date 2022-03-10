<template>
  <div class="col-12">
    <er-table-contact-details :currentContact="contact" />
    <div class="row mt-2">
      <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
        <select class="form-select form-select" v-model="filterOption">
          <option value="">Select an option</option>
          <option value="CUR_LOCATION">Current location</option>
          <option value="FIN_DEST">Final Destionation</option>
          <option value="OPT_DEST">Optional Destionation</option>
        </select>
      </div>
      <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
        <input
          type="text"
          placeholder="Search..."
          class="form-control"
          :disabled="!filterOption"
          v-model="filterValue"
        />
      </div>
      <div class="text-left col-lg-8 col-md-6 col-sm-12 col-xs-12">
        <button
          class="btn btn-primary"
          type="button"
          v-on:click.prevent="refreshButton()"
        >
          <i class="fa fa-refresh"></i> Refresh
        </button>
        <div class="dropdown pull-right">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="toggleColumns"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Toggle Columns
          </button>
          <ul class="dropdown-menu" aria-labelledby="toggleColumns">
            <li
              v-for="column in columns"
              :title="column.title"
              :class="`text-truncate ${column.fixed ? 'disabled' : ''}`"
              :key="column.field"
              @click.stop.prevent="toggleColumnVisibility(column)"
            >
              <input
                type="checkbox"
                :checked="column.visibility"
                :disabled="column.fixed"
              />
              {{ column.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <nav aria-label="paginator">
        <ul class="pagination justify-content-center mb-0">
          <li class="page-item">
            <a class="page-link " @click.prevent="navigateB">Previous</a>
          </li>
          <li class="page-item">
            <span class="page-link"
              >page {{ currentPage }} of {{ totalPages }}</span
            >
          </li>
          <li class="page-item">
            <a class="page-link " @click.prevent="navigateF">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="row mt-2">
      <div class="table-responsive fixTableHead" :style="tableHeight">
        <table class="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th
                v-for="column in visibleColumns"
                :key="column.title"
                :class="`${column.sortable ? 'sortable' : ''}`"
                :style="columnWidth(column.field)"
                @click.stop.prevent="sortBy(column)"
              >
                <span class="text-truncate">{{ column.title }}</span>
                <a
                  v-if="column.sortable"
                  :class="`sort-by ${sortableClass(column.field)}`"
                >
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.id">
              <td
                v-if="isVisible('transpo_form_link')"
                class="text-truncate"
                :style="columnWidth('transpo_form_link')"
              >
                <a
                  class="btn btn-xs btn-primary"
                  :href="row.transpo_form_link"
                  target="_blank"
                >
                  <i class="fa fa-cab"></i> Fill the form
                </a>
              </td>
              <td 
                v-if="isVisible('current_address')" 
                class="text-truncate" 
                :style="columnWidth('current_address')"
              >
                {{ renderLocation(row) }}
              </td>
              <td
                v-if="isVisible('community_center_address')"
                class="text-truncate"
                :style="columnWidth('community_center_address')"
              >
                <div v-if="!!row.community_center_address">
                  <a
                    v-if="isContactAvailable(row)"
                    class="thisIsALink"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    v-on:mouseover="setContact(row)"
                  >
                    <i class="fa fa-phone"></i>
                    {{ renderCenter(row) }}
                  </a>
                  <span v-else>
                    {{ renderCenter(row) }}
                  </span>
                </div>
                <span v-else> - </span>
              </td>
              <td
                v-if="isVisible('original_city')"
                class="text-truncate"
                :style="columnWidth('original_city')"
              >
                {{ row.original_city }}
              </td>
              <td
                v-if="isVisible('preferable_final_location')"
                class="text-truncate"
                :style="columnWidth('preferable_final_location')"
              >
                {{ row.preferable_final_location }}
              </td>
              <td
                v-if="isVisible('optional_final_location')"
                class="text-truncate"
                :style="columnWidth('optional_final_location')"
              >
                {{ row.optional_final_location }}
              </td>
              <td
                v-if="isVisible('language')"
                class="text-truncate"
                :style="columnWidth('language')"
              >
                {{ row.language }}
              </td>
              <td
                v-if="isVisible('pay_transportation')"
                class="text-truncate"
                :style="columnWidth('pay_transportation')"
              >
                <span v-if="row.pay_transportation">Yes</span>
                <span v-else>No</span>
              </td>
              <td
                v-if="isVisible('how_many_cars_seats')"
                class="text-truncate"
                :style="columnWidth('how_many_cars_seats')"
              >
                {{ row.how_many_cars_seats || "-" }}
              </td>
              <td
                v-if="isVisible('how_many_kids')"
                class="text-truncate"
                :style="columnWidth('how_many_kids')"
              >
                {{ row.how_many_kids || "-" }}
              </td>
              <td
                v-if="isVisible('how_many_pets')"
                class="text-truncate"
                :style="columnWidth('how_many_pets')"
              >
                {{ row.how_many_pets || "-" }}
              </td>
              <td
                v-if="isVisible('how_many_total_passengers')"
                class="text-truncate"
                :style="columnWidth('how_many_total_passengers')"
              >
                {{ row.how_many_total_passengers || "-" }}
              </td>
              <td
                v-if="isVisible('inserted')"
                class="text-truncate"
                :style="columnWidth('inserted')"
              >
                {{ new Date(row.inserted).toISOString().split("T")[0] }}
              </td>
            </tr>
            <tr v-if="!tableData.length && this.loading">
              <td colspan="14">
                <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>Loading...
              </td>
            </tr>
            <tr v-if="!tableData.length && !this.loading">
              <td colspan="14">No records found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "er-table.vue",
  data() {
    return {
      tableDataRaw: [],
      filterOption: "",
      filterValue: "",
      currentPage: 1,
      perPage: 30,
      totalPages: 1,
      sort: {
        field: "",
        order: "",
      },
      contact: {},
      columns: [
        {
          field: "transpo_form_link",
          title: "I can Help!",
          width: "150px",
          visibility: true,
          fixed: true,
        },
        {
          field: "current_address",
          title: "Current Location",
          width: "300px",
          visibility: true,
        },
        {
          field: "community_center_address",
          title: "Community Center",
          width: "300px",
          visibility: true,
        },
        {
          field: "original_city",
          title: "Orig. City",
          width: "150px",
          visibility: true,
          sortable: true,
        },
        {
          field: "preferable_final_location",
          title: "Final Destination",
          width: "150px",
          visibility: true,
          sortable: true,
        },
        {
          field: "optional_final_location",
          title: "Optional Destination",
          width: "150px",
          visibility: true,
        },
        {
          field: "language",
          title: "Language",
          width: "150px",
          visibility: true,
        },
        {
          field: "pay_transportation",
          title: "Can pay for transport",
          width: "150px",
          visibility: true,
        },
        {
          field: "how_many_cars_seats",
          title: "Car Seats",
          width: "150px",
          visibility: true,
        },
        {
          field: "how_many_kids",
          title: "Kids",
          width: "150px",
          visibility: true,
        },
        {
          field: "how_many_pets",
          title: "Pets",
          width: "150px",
          visibility: true,
        },
        {
          field: "how_many_total_passengers",
          title: "Total Passengers",
          width: "150px",
          visibility: true,
        },
        {
          field: "inserted",
          title: "Requested",
          width: "150px",
          visibility: true,
        },
      ],
      loading: true,
    };
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((column) => column.visibility);
    },
    tableData() {
      let filteredSortedData = !this.sort.field
        ? this.filterTable(this.tableDataRaw)
        : this.filterTable(this.tableDataRaw).sort((a, b) => {
            if (this.sort.order === "desc") {
              if (a[this.sort.field] > b[this.sort.field]) return 1;
              if (a[this.sort.field] < b[this.sort.field]) return -1;
            } else {
              if (a[this.sort.field] > b[this.sort.field]) return -1;
              if (a[this.sort.field] < b[this.sort.field]) return 1;
            }
          });
      this.totalPages = Math.ceil(filteredSortedData.length / this.perPage) || 1;
      return this.currentPage === this.totalPages
        ? filteredSortedData.slice(
            this.currentPage <= 1
              ? this.currentPage - 1
              : this.perPage * (this.currentPage - 1),
            filteredSortedData.length
          )
        : filteredSortedData.slice(
            this.currentPage - 1,
            this.currentPage <= 1
              ? this.perPage
              : this.perPage * this.currentPage
          );
    },
    tableHeight() {
      return `height:${window.innerHeight - 186}px; !important`;
    },
  },
  methods: {
    async refresh() {
      const response = await this.$axios.get(
        "https://sc-ukraine.ndmglobal.com/api/execute/all-refugees"
      );
      this.tableDataRaw = response.results || [];
      this.loading = false;
    },
    navigateB() {
      this.currentPage =
        this.currentPage === 1 ? this.currentPage : this.currentPage - 1;
    },
    navigateF() {
      this.currentPage =
        this.currentPage === this.totalPages
          ? this.currentPage
          : this.currentPage + 1;
    },
    toggleColumnVisibility(col) {
      if (col.fixed) {
        return;
      }
      this.columns = this.columns.map((column) => {
        if (column.field === col.field) {
          column.visibility = !column.visibility;
        }
        return column;
      });
    },
    columnWidth(field) {
      return `max-width: ${this.columns.find((column) => column.field === field).width};`;
    },
    isVisible(field) {
      return this.columns.find((column) => column.field === field).visibility;
    },
    sortableClass(field) {
      return this.sort.field === field ? this.sort.order : "none";
    },
    sortBy(col) {
      if (!col.sortable) {
        return;
      }
      if (this.sort.field === col.field) {
        if (this.sort.order === "asc") {
          this.sort = {
            field: "",
            order: "",
          };
        } else {
          this.sort = {
            field: col.field,
            order: "asc",
          };
        }
      } else {
        this.sort = {
          field: col.field,
          order: "desc",
        };
      }
    },
    filterTable(datatable) {
      return datatable.filter((row) => {
        if (!this.filterOption) {
          return row;
        } else {
          if (
            this.filterOption == "CUR_LOCATION" &&
            (this.compare(row.location_country) ||
              this.compare(row.location_city))
          ) {
            return row;
          }
          if (
            this.filterOption == "FIN_DEST" &&
            this.compare(row.preferable_final_location)
          ) {
            return row;
          }
          if (
            this.filterOption == "OPT_DEST" &&
            this.compare(row.optional_final_location)
          ) {
            return row;
          }
        }
      });
    },
    compare(term) {
      if (!term) {
        return true;
      }
      return term.toLowerCase().includes(this.filterValue.toLowerCase());
    },
    setContact(row) {
      this.contact = row;
    },
    renderLocation(row) {
      let val = [];

      if (row.current_address) {
        val.push(row.current_address);
      }

      if (row.location_city) {
        val.push(row.location_city);
      }

      if (row.location_country) {
        val.push("(" + row.location_country + ")");
      }

      return val.join(", ");
    },
    renderCenter(row) {
      let val = [];

      if (row.community_center_address) {
        val.push(row.community_center_address);
      }

      if (row.community_center_city) {
        val.push(row.community_center_city);
      }

      if (row.community_center_country)
        val.push("(" + row.community_center_country + ")");

      return val.join(", ");
    },
    isContactAvailable(row) {
      return (
        !!row.community_center_email ||
        !!row.community_center_phone_country_code ||
        !!row.community_center_phone_number
      );
    },
    refreshButton() {
      this.loading = true;
      this.tableDataRaw = [];
      this.refresh();
    },
  },
  mounted() {
    this.refresh();
    setInterval(() => this.refresh(), 60 * 1000);
  },
};
</script>

<style scoped>
.btn-xs {
  padding: 5px;
}
td {
  vertical-align: middle;
}
.mt-10 {
  margin-top: 70px;
}
.thisIsALink:hover {
  color: #0a53be;
  text-decoration: underline;
  cursor: pointer;
}
.fixTableHead {
  overflow-y: auto;
}
.fixTableHead thead th {
  border-bottom: 2px solid;
  background-color: white;
  position: sticky;
  top: 0;
}
.table > :not(:first-child) {
  border-top: none;
}
th.sortable {
  cursor: pointer;
}
th.sortable span {
  float: left;
  width: calc(100% - 1.5rem);
}
th:not(.sortable) span {
  float: left;
  width: 100%;
}
a.sort-by:before,
a.sort-by:after {
  border: 4px solid transparent;
  content: "";
  display: block;
  height: 0;
  right: 0.5rem;
  top: 48%;
  position: absolute;
  width: 0;
}
a.sort-by.none:before {
  border-bottom-color: #666;
  margin-top: -9px;
}
a.sort-by.none:after {
  border-top-color: #666;
  margin-top: 1px;
}
a.sort-by.asc:before {
  border-bottom-color: #666;
  margin-top: -9px;
}
a.sort-by.desc:after {
  border-top-color: #666;
  margin-top: 1px;
}
.page-link {
  cursor: pointer;
}
.dropdown {
  min-width: 12rem;
  max-width: 12rem;
}
.dropdown button {
  width: 100%;
}
.dropdown-menu li {
  font-size: small;
  min-width: 12rem;
  max-width: 12rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
}
.dropdown-menu li input {
  pointer-events: none;
}
.dropdown-menu li.disabled {
  color: lightgray;
  cursor: not-allowed;
}
.dropdown-menu li input {
  margin-right: 1rem;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.page-link.blue {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.page-link.blue:hover {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
@media screen and (max-width: 767px) {
  button {
    margin-top: 10px;
    float: left;
  }
}
</style>
