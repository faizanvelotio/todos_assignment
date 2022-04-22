import { useLocation } from "react-router-dom";

export default function useLocationId(): number {
    /* This function returns the id parameter from the URL */
    const location = useLocation();
    const url_parts = location.pathname.split("/");
    for (let part of url_parts) {
        if (part !== "" && !Number.isNaN(Number(part))) {
            return Number(part);
        }
    }
    return -1;
}
