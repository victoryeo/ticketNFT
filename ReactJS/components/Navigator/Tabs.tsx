import React from "react"
import Link from "next/link"
import { withRouter } from "next/router"
import { TabHead, TabContainer, TabBody, Tab } from "../../styles/Tab.module.css"
import NFT from "../NFT/NFT"
import Marketplace from "../Marketplace/Marketplace"

const Tabs = ({ router }) => {
  const {
    query: { tab }
  } = router

  const isTabOne = tab === "1" || tab == null
  const isTabTwo = tab === "2"
  return (
    <TabContainer>
      <TabHead>
        <Tab selected={isTabOne}>
          <Link href={{ pathname: "/", query: { tab: "1" } }}>
            <a>NFT</a>
          </Link>
        </Tab>
        <Tab selected={isTabTwo}>
          <Link href={{ pathname: "/", query: { tab: "2" } }}>
            <a>Marketplace</a>
          </Link>
        </Tab>
      </TabHead>
      <TabBody>
        {isTabOne && <React.Fragment><NFT/></React.Fragment>}
        {isTabTwo && <React.Fragment><Marketplace/></React.Fragment>}
      </TabBody>
    </TabContainer>
  )
}

export default withRouter(Tabs)