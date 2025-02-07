<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { difficulties } = storeToRefs(store)
</script>
<template>
  <div class="records">
    <h5 class="records__title">Records</h5>
    <ul class="records__table-list">
      <li class="records__table-item" v-for="difficulty in difficulties" :key="difficulty">
        <table class="table">
          <caption class="table__caption">
            {{
              difficulty
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Score</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="false">
              <td colspan="4">No records yet</td>
            </tr>
            <!-- 1st place -->
            <tr v-if="true">
              <td>1</td>
              <td>1492</td>
              <td>8:00</td>
              <td>2/2/2024</td>
            </tr>
            <!-- 2nd place -->
            <tr v-if="true">
              <td>2</td>
              <td>900</td>
              <td>7:45</td>
              <td>2/2/2024</td>
            </tr>
            <!-- 3rd place -->
            <tr v-if="true">
              <td>3</td>
              <td>564</td>
              <td>9:45</td>
              <td>2/2/2024</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.records__title {
  padding-block: 0.5rem;
  text-align: center;
}

.records__table-list {
  /* border: 1px solid green; */
  list-style: none;
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  scrollbar-color: var(--mint-green) var(--charcoal-gray);
  scrollbar-width: thin;

  gap: 1rem;
  /*  */
  scroll-snap-type: x mandatory;
  // scroll-snap-points-y: repeat(300px);
  scroll-snap-type: x mandatory;

  .records__table-item {
    padding-bottom: 6px;
  }
}

.records__table-item:nth-of-type(1) .table__caption {
  color: var(--mint-green);
}
.records__table-item:nth-of-type(2) .table__caption {
  color: var(--teal-green);
}
.records__table-item:nth-of-type(3) .table__caption {
  color: var(--royal-blue);
}
.records__table-item:nth-of-type(4) .table__caption {
  color: var(--golden-yellow);
}
.records__table-item:nth-of-type(5) .table__caption {
  color: var(--crimson-red);
}

.table {
  margin-top: 0.5rem;
  width: 300px;
  border: 2px solid var(--charcoal-gray);
  border-radius: 3px;
  /*  */
  scroll-snap-align: start;

  .table__caption {
    padding-bottom: 5px;
  }
}
</style>
