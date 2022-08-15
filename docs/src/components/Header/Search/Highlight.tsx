import { connectHighlight } from "react-instantsearch-dom";
import parse from "html-react-parser";

const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });
  console.log(parsedHit);

  return (
    <span className="h-10 overflow-hidden">
      {parsedHit.map((part, index: number) =>
        part.isHighlighted ? (
          //   <mark key={index}>{part.value}</mark>
          <span key={index} className="bg-yellow-200 text-slate-800">
            {parse(part.value)}
          </span>
        ) : parsedHit[index + 1] && parsedHit[index + 1].isHighlighted ? (
          <span key={index}>{parse(part.value)}</span>
        ) : (
          <span key={index}>{parse(part.value.substring(0, 10))}</span>
        ),
      )}
    </span>
  );
};

export const CustomHighlight = connectHighlight(Highlight);
