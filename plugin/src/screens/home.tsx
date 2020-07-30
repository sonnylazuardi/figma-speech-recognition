import * as React from "react"
import { getUserId, setUserId } from "../utils/bridge"

//@ts-ignore
const io = require("socket.io-client")

const ROOM_NAME = "HeyFigma"
const DEFAULT_SERVER_URL = "https://color-copy-paste-socket.herokuapp.com/"
const CONNECTED = "CONNECTED"
const ERROR = "ERROR"

const Home: any = () => {
  const [code, setCode] = React.useState(``)
  const [isAutoAdd, setIsAutoAdd] = React.useState(false)
  const [isAppend, setIsAppend] = React.useState(false)
  const [userId, setUserId] = React.useState("")
  const isAutoAddRefValue = React.useRef(isAutoAdd)
  const isAppendRefValue = React.useRef(isAppend)
  const codeRefValue = React.useRef(code)

  React.useEffect(() => {
    isAutoAddRefValue.current = isAutoAdd
  }, [isAutoAdd])

  React.useEffect(() => {
    isAppendRefValue.current = isAppend
  }, [isAppend])

  React.useEffect(() => {
    codeRefValue.current = code
  }, [code])

  React.useEffect(() => {
    getUserId().then((userId: string) => {
      setUserId(userId)

      const socket = io(DEFAULT_SERVER_URL, {
        reconnectionAttempts: 3,
        forceNew: true,
        transports: ["websocket"]
      })

      socket.on("connected", () => {
        console.log(CONNECTED)

        socket.emit("join room", ROOM_NAME)

        socket.emit("set user", {
          name: "figma-" + userId,
          color: ``,
          url: DEFAULT_SERVER_URL
        })

        socket.emit("chat message", {
          roomName: ROOM_NAME,
          message: "hello"
        })
      })

      socket.on("join leave message", data => {})

      socket.on("connect_error", () => {
        console.log(ERROR)
      })

      socket.on("reconnect_error", () => {
        console.log(ERROR)
      })

      socket.on("online", data => {})

      socket.on("chat message", (data: any) => {
        if (data.user.name === userId) {
          if (data.message.includes("settings::")) {
            const splitSetting = data.message.split("-")
            if (splitSetting[0] === "settings::autoadd") {
              setIsAutoAdd(parseInt(splitSetting[1]) === 1)
            } else {
              setIsAppend(parseInt(splitSetting[1]) === 1)
            }
          } else {
            let codeResult = data.message
            if (isAppendRefValue.current) {
              codeResult = `${codeRefValue.current}. ${data.message}`
              setCode(codeResult)
            } else {
              setCode(codeResult)
            }
            console.log("RESULT", codeResult)
            console.log("AUTO ADD", isAutoAddRefValue.current)
            if (isAutoAddRefValue.current) {
              if (!isAppendRefValue.current) {
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "add-text",
                      data: { text: codeResult }
                    }
                  },
                  "*"
                )
              } else {
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "append-text",
                      data: { text: codeResult }
                    }
                  },
                  "*"
                )
              }
            }
          }
        }
      })
    })
  }, [])

  return (
    <div>
      <div>
        <textarea
          placeholder="Click Open Voice below to start..."
          className="input"
          rows={14}
          value={code}
          onChange={e => setCode(e.target.value)}
        ></textarea>
      </div>
      <div className="panel">
        {userId != "" ? (
          <button
            onClick={() => {
              window.open(`https://heyfigma.com/voice?user=${userId}`)
            }}
          >
            Open Voice
          </button>
        ) : null}
        <button
          onClick={() => {
            parent.postMessage(
              {
                pluginMessage: {
                  type: "add-text",
                  data: { text: code }
                }
              },
              "*"
            )
          }}
        >
          Add Text
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        <input
          type="checkbox"
          checked={isAutoAdd}
          id="auto-add"
          style={{ marginRight: 8 }}
          onChange={e => {
            setIsAutoAdd(e.target.checked)
          }}
        />
        <label htmlFor="auto-add">Auto add text to canvas</label>
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          type="checkbox"
          checked={isAppend}
          id="append-text"
          style={{ marginRight: 8 }}
          onChange={e => {
            setIsAppend(e.target.checked)
          }}
        />
        <label htmlFor="append-text">Append text to selection</label>
      </div>
      <div
        style={{
          fontSize: 10,
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0
        }}
      >
        I made another cool plugin, checkout{" "}
        <a
          target="_blank"
          href="https://www.figma.com/community/plugin/845733021314534317/Camera-Color-Copy-Paste"
        >
          🎨 Color Copy Paste
        </a>
      </div>
    </div>
  )
}

export default Home
