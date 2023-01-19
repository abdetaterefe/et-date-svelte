<script lang="ts">
  import { getCalendar } from "$lib/utils";
  import { ELET } from "$lib/utils/constants";
  import { ETC } from "$lib/utils/ETC";
  import { createEventDispatcher } from "svelte";
  import Next from "./next.svelte";
  import Prev from "./prev.svelte";

  const today = new ETC();
  let year = today.year;
  let month = today.month;
  let tday = today.day;
  $: tday = today.day;

  export let etLang = false;
  export let year_min = 1990;
  export let year_max = 2040;
  export let pick = "pick";
  export let disabled = false;

  let years = Array.from(
    { length: year_max - year_min + 1 },
    (_, i) => year_min + i
  );
  $: years = Array.from(
    { length: year_max - year_min + 1 },
    (_, i) => year_min + i
  );

  let selected = today.getMonthsName(etLang)[month - 1];
  $: selected_month = today.getMonthsName(etLang)[month - 1];
  $: month = today.getMonthsName(etLang).indexOf(selected) + 1;
  $: default_year = year;

  const dispatch = createEventDispatcher();

  let visible = false;

  function onFocusOut(e: FocusEvent) {
    if (
      e?.currentTarget instanceof HTMLElement &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return;
    } else {
      visible = false;
    }
  }

  function keydown(e: KeyboardEvent) {
    if (e.key === "Escape" && visible) {
      visible = false;
      e.preventDefault();
      e.stopPropagation();
    } else if (e.key === "Enter") {
      visible = !visible;
      e.preventDefault();
      select(tday);
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
</script>

<div on:focusout={onFocusOut} on:keydown={keydown}>
  <button class="pick" {disabled} on:click={() => (visible = !visible)}
    >{pick}</button
  >
  {#if visible && !disabled}
    <div class="picker" class:visible>
      <!-- Calendar -->
      <div class="calendar">
        <!-- Months -->
        <div class="month">
          <button on:click={() => prevMonth()} class="nav"><Prev /></button>
          <div class="dropdown">
            <!-- Month -->
            <select
              bind:value={selected_month}
              on:input={(e) => {
                selected = e.currentTarget.value;
              }}
            >
              {#each today.getMonthsName(etLang) as monthName}
                <option value={monthName}>{monthName}</option>
              {/each}
            </select>
            <!-- Year -->
            <select
              value={default_year}
              on:input={(e) => {
                year = parseInt(e.currentTarget.value);
              }}
            >
              {#each years as year}
                <option value={year}>{year}</option>
              {/each}
            </select>
          </div>
          <button on:click={() => nextMonth()} class="nav"><Next /></button>
        </div>
        <!-- Days -->
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
                    select(day.value);
                    visible = !visible;
                  }}
                  class:today={day.today}
                  disabled={day.disabled}
                  >{etLang ? day.etValue : day.value}</button
                >
              </div>
            {/each}
          </div>
        {/each}
        <div class="ct">
          <button
            on:click={() => {
              visible = !visible;
            }}
            class="close">close</button
          >
          <button
            on:click={() => {
              year = today.year;
              month = today.month;
              let hour = today.hour;
              let minute = today.minute;
              let second = today.second;
              let millisecond = today.millisecond;
              let now = `${year}-${month}-${tday} ${hour}:${minute}:${second}.${millisecond}`;
              let date = { year: year, month: month, tday };
              let time = { h: hour, m: minute, s: second };
              dispatch("select", { now: now, date: date, time: time });
              visible = !visible;
            }}
            class="today">today</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

<style src="./datepicker.scss">
</style>
