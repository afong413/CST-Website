import {
  LucideArrowUpToLine,
  LucideCheck,
  LucideRefreshCw,
  LucideX,
} from "lucide-solid"
import { codeToHtml } from "shiki"
import { createSignal } from "solid-js"
import { For, isServer } from "solid-js/web"

function numAppearances(str: string, subStr: string) {
  return str.split(subStr).length - 1
}

export function Problem(props: {
  functionName: string
  params: Array<string>
  tests: { [ans: string | number]: Array<any> }
}) {
  const defaultText = `function ${props.functionName}(${props.params.join(", ")}) {\n  \n}`

  async function hightlight(text: string) {
    const highlighted = await codeToHtml(text, {
      lang: "ts",
      theme: "github-dark",
    })

    document.getElementById("highlighted")!.innerHTML = highlighted
  }

  let [correct, setCorrect] = createSignal<Array<boolean>>()

  // let correct: Array<boolean> | undefined

  function test() {
    let c = []

    for (let ans in props.tests) {
      const answer = eval(
        (document.getElementById("input")! as any as HTMLTextAreaElement)
          .value + `;${props.functionName}(${props.tests[ans]?.join(", ")})`,
      )

      c.push(answer == ans)
    }

    setCorrect(c)
  }

  if (!isServer) {
    hightlight(defaultText)
  }

  return (
    <>
      <div class="mb-2 flex h-16 w-full items-center gap-2 p-2 pl-0">
        <h2 class="text-xl">Tests: </h2>
        {correct() ? (
          <For each={correct()}>
            {(i) => {
              return (
                <div
                  class={`flex aspect-square h-full items-center justify-center rounded-full ${i ? "bg-green-500" : "bg-red-500"}`}
                >
                  {i ? <LucideCheck /> : <LucideX />}
                </div>
              )
            }}
          </For>
        ) : (
          <For each={Object.keys(props.tests)}>
            {() => {
              return (
                <div class="flex aspect-square h-full items-center justify-center rounded-full bg-slate-500"></div>
              )
            }}
          </For>
        )}
      </div>
      <div class="relative flex h-full w-full bg-[#24292e]">
        <pre>
          <div
            id="highlighted"
            class="absolute left-0 top-0 size-full p-4"
            aria-hidden
          />
        </pre>
        <code>
          <textarea
            id="input"
            class="absolute left-0 top-0 size-full resize-none bg-black bg-opacity-0 p-4 text-black text-opacity-0 caret-white"
            spellcheck={false}
            onInput={async (event) => {
              hightlight(event.target.value)
            }}
            onKeyDown={function (
              this: HTMLTextAreaElement,
              event: KeyboardEvent,
            ) {
              if (event.key == "Tab") {
                event.preventDefault()

                const start = this.selectionStart!
                const end = this.selectionEnd!

                if (start === end || !this.value.substring(start, end)) {
                  this.value =
                    this.value.substring(0, start) +
                    "  " +
                    this.value.substring(end)

                  this.selectionStart = this.selectionEnd = start + 2
                } else {
                  const lineStart = this.value.lastIndexOf("\n", start)
                  const lineEnd = this.value.indexOf("\n", end)
                  const num = numAppearances(
                    this.value.substring(lineStart, lineEnd),
                    "\n",
                  )

                  this.value =
                    this.value.substring(0, lineStart) +
                    this.value
                      .substring(lineStart, lineEnd)
                      .replaceAll("\n", "\n  ") +
                    this.value.substring(lineEnd)

                  this.selectionStart = start + 2
                  this.selectionEnd = end + 2 * num
                }

                hightlight(this.value)
              } else if (event.key == "Enter") {
                event.preventDefault()

                const start = this.selectionStart!
                const end = this.selectionEnd!

                const lineStart = this.value.lastIndexOf("\n", start - 1)
                const lineEnd = this.value.indexOf("\n", end)

                let tabSize = this.value
                  .substring(lineStart + 1)
                  .match(/ */)![0].length

                const subStr = this.value.substring(lineStart, lineEnd)

                const extra =
                  numAppearances(subStr, "(") > numAppearances(subStr, ")") ||
                  numAppearances(subStr, "[") > numAppearances(subStr, "]") ||
                  numAppearances(subStr, "{") > numAppearances(subStr, "}")

                if (extra) {
                  tabSize += 2
                }

                this.value = this.value =
                  this.value.substring(0, start) +
                  "\n" +
                  " ".repeat(tabSize) +
                  this.value.substring(end)

                this.selectionStart = this.selectionEnd = start + tabSize + 1

                hightlight(this.value)
              }
            }}
          >
            {defaultText}
          </textarea>
        </code>
        <div class="absolute right-0 top-0 flex gap-4 p-4">
          <button
            class="flex"
            onClick={() => {
              if (!isServer) {
                test()
              }
            }}
          >
            <LucideArrowUpToLine />
          </button>
          <button
            class="flex"
            onClick={() => {
              const inputElement = document.getElementById(
                "input",
              )! as HTMLTextAreaElement

              inputElement.value = defaultText

              hightlight(defaultText)

              inputElement.focus()

              inputElement.selectionStart = inputElement.selectionEnd =
                inputElement.value.length - 2
            }}
          >
            <LucideRefreshCw />
          </button>
        </div>
      </div>
    </>
  )
}
