<script lang="ts">
  import { getCalendar } from "$lib/utils";
  import { ELET } from "$lib/utils/constants";
  import { ETC } from "$lib/utils/ETC";
  import { createEventDispatcher } from "svelte";
  import Next from "./next.svelte";
  import Prev from "./prev.svelte";

  const today = new ETC();

  export let year = today.year;
  export let month = today.month;
  export let etLang = false;

  function prevMonth() {
    if (month - 1 === 0) {
      month = 13;
      year--;
    } else {
      month--;
    }
  }
  function nextMonth() {
    if (month + 1 === 14) {
      month = 1;
      year++;
    } else {
      month++;
    }
  }
  function select(e: string | number) {
    let hour = today.hour;
    let minute = today.minute;
    let second = today.second;
    let millisecond = today.millisecond;
    let now = `${year}-${month}-${e} ${hour}:${minute}:${second}.${millisecond}`;
    let date = { year: year, month: month, day: e };
    let time = { h: hour, m: minute, s: second };
    dispatch("select", { now: now, date: date, time: time });
  }
  const dispatch = createEventDispatcher();
</script>

<div class="calendar">
  <!-- month -->
  <div class="month">
    <button on:click={() => prevMonth()} class="nav"><Prev /></button>
    <div>
      {today.getMonthName(month, etLang)} <span class="year">{year}</span>
    </div>
    <button on:click={() => nextMonth()} class="nav"><Next /></button>
  </div>

  <!-- days -->
  <div class="days">
    {#each ELET as dayName}
      <span>{etLang ? dayName[0] : dayName[1]}</span>
    {/each}
  </div>

  <!-- Weeks and Days -->
  {#each getCalendar(year, month) as week}
    <div class="week">
      {#each week as day}
        <div class="dates">
          <button
            on:click={(e) => {
              e.stopPropagation();
              select(day.value);
            }}
            class:today={day.today}
            disabled={day.disabled}>{etLang ? day.etValue : day.value}</button
          >
        </div>
      {/each}
    </div>
  {/each}
</div>

<style src="./calendar.scss">
</style>
