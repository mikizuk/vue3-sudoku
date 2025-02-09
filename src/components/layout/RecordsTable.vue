<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { difficulties, gameScoreRecords } = storeToRefs(store)
</script>
<template>
  <div class="records">
    <h4 class="records__title">Top 3</h4>
    <ul class="records__table-list">
      <li class="records__table-item" v-for="difficulty in difficulties" :key="difficulty">
        <table class="table">
          <caption :class="`table__caption color--${difficulty}`">
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
          <tbody v-if="gameScoreRecords[difficulty].length === 0">
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="1"></td>
              <td colspan="4">No records yet</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(recordPerDifficulty, index) in gameScoreRecords[difficulty]" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ recordPerDifficulty.score }}</td>
              <td>{{ recordPerDifficulty.time }} s</td>
              <td>{{ recordPerDifficulty.date }}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.records__title {
  padding-block: 0.3rem;
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

  @media (min-width: 769px) {
    font-size: 0.8rem;
    // padding: 0.4rem;

    border-spacing: 10px 10px;
  }
}
</style>
