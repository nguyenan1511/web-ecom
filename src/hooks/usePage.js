import { useSelector } from "react-redux"
import store from "../store"

export const usePage = () => useSelector(store => store.page)

export default usePage