# Et Date Time

Ethiopian Calendar and Datepicker for Svelte

## Features

- Geez number
- Calendar
- Datepicker
- Theming (coming soon)
- Date-Time picker (coming soon)
- Date-range picker (coming soon)

## Demo

[demo](https://et-date-svelte.vercel.app)

## Installation

Install et-date-svelte with npm

```bash
npm install --save-dev et-date-svelte
```

## Usage/Examples

```svelte
<script lang="ts">
  import { Calendar, DatePicker } from 'et-date-svelte'
</script>

<Calendar />
```

## Docs

#### Calendar

```svelte
<Calendar />
```

Properties
| Name | Default | Type | Description |
| :-------- |:---| :------- | :------------------------- |
| `month` | `now`| `number` | month of the Calendar |
| `year` | `now`| `number` | year of the Calendar |
| `etLang` | `false`| `boolean` | geez language |

Events
| Name | Event Datail | Description |
| :-------- |:---| :------------------------- |
| `select` | `{now: string, date: {}, time:{}}` | return value when a day is clicked |

example

```svelte
<script lang="ts">
  import { Calendar } from 'et-date-svelte'
  function clicked(e: { detail: any; }) {
    console.log(e.detail);
  }
</script>

<Calendar on:select={clicked} />

<!--
  date: {year: 2015, month: 5, day: 12},
  now: "2015-5-12 12:3:33.0",
  time: {h: 12, m: 3, s: 33 }
-->
```

the output is same as for datepicker also

#### Datepicker

```svelte
<DatePicker />
```

Properties
| Name | Default | Type | Description |
| :-------- |:---| :------- | :------------------------- |
| `year_min` | `1990`| `number` | minimum year of the dropdown |
| `year_max` | `2040`| `number` | maximum year of the dropdown |
| `etLang` | `false`| `boolean` | geez language |
| `pick` | "pick"| `string` | text of the button |
| `disabled` | `false`| `boolean` | make the button disabled |

Events
| Name | Event Datail | Description |
| :-------- |:---| :------------------------- |
| `select` | `{now: string, date: {}, time:{}}` | return value when a day is clicked |

## Authors

- [@abdetaterefe](https://www.github.com/abdetaterefe)

## Feedback

If you have any feedback, please reach out to me [here](https://t.me/abdetaterefe)
