import { For } from "solid-js"

export function MeetingList(props: { meetings: any[] }) {
  return (
    <For each={props.meetings}>
      {(meeting) => (
        <a
          href={`/meetings/${meeting.id.split(".").slice(0, -1).join()}`}
          class="text-5xl"
        >
          <p>{meeting.data.date.toLocaleDateString()}</p>
        </a>
      )}
    </For>
  )
}
