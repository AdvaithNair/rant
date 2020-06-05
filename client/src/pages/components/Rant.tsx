import React from "react";
import { RantData } from "../../types";
import { useHistory } from "react-router-dom";

// Components
import RantContent from './RantContent'

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const Rant: React.FC<Props> = ({ data }) => {
  // History for Page Traversal
  const history = useHistory();

  // Takes to Individual Rant Page
  const expandRant = (event: any) => {
    event.stopPropagation();
    history.push(`/home/rant/${data.rantID}`);
  };

  return (
    <div className="rant-body" onClick={expandRant}>
      <RantContent data = {data}/>
    </div>
  );
};

export default Rant;
