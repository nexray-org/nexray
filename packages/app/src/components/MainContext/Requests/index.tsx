import { useContext, useState } from "react"
import Table from "./Table";
import Insights from "./Insights";
import { MainContentContext } from "../../../context/MainContentContext";

export default function Request() {
    const { selectedRequestsTab } = useContext(MainContentContext);
    if (selectedRequestsTab === 'table') {
        return <Table />
    } else {
        return (<Insights />)
    }
}