import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Hey Figma" />
    <div className="full-page">
      <h1>
        Hey Figma <span role="img">👋</span>
      </h1>
      <p>
        Lets you design without your hand.
        <br />
        Powered by <a href="https://beta.openai.com/">OpenAI</a> GPT-3
      </p>
      <a
        className="button"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeiojH2uDM_pv2YlAx-f54jJ2lub2WUsBT8ReZk2Ei7Mr2rzQ/viewform"
      >
        Request Early Access
      </a>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        padding: 16,
      }}
    >
      <blockquote className="twitter-tweet">
        <a href="https://twitter.com/sonnylazuardi/status/1282626069095280642?s=20">
          @sonnylazuardi
        </a>
      </blockquote>

      <blockquote className="twitter-tweet" data-conversation="none">
        <a href="https://twitter.com/sonnylazuardi/status/1284087107154108416?s=20">
          @sonnylazuardi
        </a>
      </blockquote>
    </div>
    <h2>What others are saying</h2>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 16,
      }}
    >
      <blockquote className="twitter-tweet" data-conversation="none">
        <a href="https://twitter.com/gdb/status/1282630214065905665?s=20">
          @gdb
        </a>
      </blockquote>

      <blockquote
        className="twitter-tweet"
        data-conversation="none"
        data-cards="hidden"
      >
        <a href="https://twitter.com/derlukasg/status/1283267300532146176?s=20">
          @derlukasg
        </a>
      </blockquote>

      <blockquote
        className="twitter-tweet"
        data-conversation="none"
        data-cards="hidden"
      >
        <a href="https://twitter.com/im_usamakhalid/status/1283247941872910343?s=20">
          @im_usamakhalid
        </a>
      </blockquote>

      <blockquote
        className="twitter-tweet"
        data-conversation="none"
        data-cards="hidden"
      >
        <a href="https://twitter.com/ivankrisdotcom/status/1282677100667736065?s=20">
          @ivankrisdotcom
        </a>
      </blockquote>

      <blockquote
        className="twitter-tweet"
        data-conversation="none"
        data-cards="hidden"
      >
        <a href="https://twitter.com/kilianvalkhof/status/1282626994451120132?s=20">
          @kilianvalkhof
        </a>
      </blockquote>
    </div>
  </Layout>
)

export default IndexPage
