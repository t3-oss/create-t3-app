import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <input
        className="text-slate-800 px-2 rounded ring-0 outline-none focus:outline-none"
        id="algolia_search"
        type="search"
        placeholder="Search.."
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
