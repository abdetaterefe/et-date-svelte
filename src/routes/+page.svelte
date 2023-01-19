<script lang="ts">
  import { Calendar, DatePicker } from "$lib";
  function getDate(e: { detail: any }) {
    console.log(e.detail);
  }
</script>

<DatePicker on:select={getDate} />
