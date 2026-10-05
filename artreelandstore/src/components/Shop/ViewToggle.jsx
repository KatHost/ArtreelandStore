import { Grid2X2, List } from "lucide-react";

export default function ViewToggle({ view, setView }) {
    return (
        <div className="view-toggle">

            <button
                type="button"
                className={view === "grid" ? "selected" : ""}
                onClick={() => setView("grid")}
                aria-label="Grid view"
                title="Grid view"
            >
                <Grid2X2 size={19} />
            </button>

            <button
                type="button"
                className={view === "list" ? "selected" : ""}
                onClick={() => setView("list")}
                aria-label="List view"
                title="List view"
            >
                <List size={19} />
            </button>

        </div>
    );
}