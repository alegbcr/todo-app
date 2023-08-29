import React from "react";

const EmptySearchResults = (props) => {
  return (
    <p style={{ textAlign: "center", marginTop: 40 }}>
      No hay resultados para {props.searchText}
    </p>
  );
};

export { EmptySearchResults };
