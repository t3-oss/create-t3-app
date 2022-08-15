import { connectStateResults } from "react-instantsearch-dom";
import { Snippet, Highlight } from "react-instantsearch-dom";
import { CustomHighlight } from "./Highlight";
function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <ol className="border px-1 w-full rounded-b-lg pt-3 mt-1">
          {searchResults.hits.map((hit) => {
            const parser = new DOMParser();
            const document = parser.parseFromString(hit.content, "text/html");
            const content = document.querySelector("em");
            console.log(content);
            return (
              <li className="text-sm" key={hit.objectID}>
                <CustomHighlight hit={hit} attribute="content" />
                {/* <Snippet hit={hit} attribute="title" /> */}

                {/* <Highlight hit={hit} attribute="content" /> */}
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}

export default connectStateResults(Hits);
