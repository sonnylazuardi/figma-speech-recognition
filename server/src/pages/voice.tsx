import React from "react"

import Layout from "../components/layout"

import { useQueryParam, StringParam } from "use-query-params"

//@ts-ignore
const io = require("socket.io-client")

const ROOM_NAME = "HeyFigma"
const DEFAULT_SERVER_URL = "https://color-copy-paste-socket.herokuapp.com/"
const CONNECTED = "CONNECTED"
const ERROR = "ERROR"

const Voice = () => {
  const [status, setStatus] = React.useState("Connecting 🌎...")
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [isAutoAdd, setIsAutoAdd] = React.useState(false)
  const [isAppend, setIsAppend] = React.useState(false)
  const [mySocket, setMySocket] = React.useState(null)
  const [user, setUser] = useQueryParam("user", StringParam)
  React.useEffect(() => {
    const userId = user

    const socket = io(DEFAULT_SERVER_URL, {
      reconnectionAttempts: 3,
      forceNew: true,
      transports: ["websocket"],
    })

    socket.on("connected", () => {
      console.log(CONNECTED)

      setMySocket(socket)
      setStatus("Connected 👍")

      socket.emit("join room", ROOM_NAME)

      socket.emit("set user", {
        name: userId,
        color: ``,
        url: DEFAULT_SERVER_URL,
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
  }, [])

  const isConnected = status === "Connected 👍"
  return (
    <Layout>
      <div className="full-page-view">
        {status}
        {isConnected ? (
          <React.Fragment>
            <a
              className="button"
              style={{ marginTop: 16 }}
              href="#"
              onClick={() => {
                var SpeechRecognition =
                  //@ts-ignore
                  window.SpeechRecognition || window.webkitSpeechRecognition

                var recognition = new SpeechRecognition()

                recognition.lang = "en-US"
                recognition.interimResults = false
                recognition.maxAlternatives = 1

                setIsSpeaking(true)

                recognition.start()

                recognition.onresult = function (event) {
                  setIsSpeaking(false)
                  var speechResult = event.results[0][0].transcript.toLowerCase()

                  console.log(speechResult)

                  mySocket &&
                    mySocket.emit("chat message", {
                      roomName: ROOM_NAME,
                      message: speechResult,
                    })
                }
              }}
            >
              {isSpeaking ? (
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <span>Start Speaking</span>
              )}
            </a>
            <div style={{ marginTop: 16 }}>
              <input
                type="checkbox"
                checked={isAutoAdd}
                id="auto-add"
                style={{ marginRight: 8 }}
                onChange={e => {
                  mySocket &&
                    mySocket.emit("chat message", {
                      roomName: ROOM_NAME,
                      message: `settings::autoadd-${e.target.checked ? 1 : 0}`,
                    })
                  setIsAutoAdd(e.target.checked)
                }}
              />
              <label htmlFor="auto-add">Auto add text to canvas</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={isAppend}
                id="append-text"
                style={{ marginRight: 8 }}
                onChange={e => {
                  mySocket &&
                    mySocket.emit("chat message", {
                      roomName: ROOM_NAME,
                      message: `settings::append-${e.target.checked ? 1 : 0}`,
                    })
                  setIsAppend(e.target.checked)
                }}
              />
              <label htmlFor="append-text">Append text to selection</label>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </Layout>
  )
}

export default Voice
