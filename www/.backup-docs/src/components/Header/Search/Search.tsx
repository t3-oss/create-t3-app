import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/satellite.css";

const searchClient = algoliasearch(
  import.meta.env.PUBLIC_ALGOLIA_APP_ID,
  import.meta.env.PUBLIC_ALGOLIA_API_KEY,
);
export default function Search() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="create-t3-app-docs">
        <SearchBox />
        <Hits />
      </InstantSearch>
    </>
  );
}

// import algoliasearch from "algoliasearch/lite";
// import { InstantSearch, Hits } from "react-instantsearch-dom";
// import SearchBox from "./SearchBox";
// import CustomHits from "./CustomHits";

// const searchClient = algoliasearch(
//   import.meta.env.PUBLIC_ALGOLIA_APP_ID,
//   import.meta.env.PUBLIC_ALGOLIA_API_KEY
// );

// export default function Search() {
//   return (
//     <div className="relative">
//       <InstantSearch searchClient={searchClient} indexName="create-t3-app-docs">
//         <SearchBox />
//         <div className="absolute top-6 right-0 dark:bg-dark-background w-full">
//           <CustomHits />
//         </div>
//       </InstantSearch>
//     </div>
//   );
// }
