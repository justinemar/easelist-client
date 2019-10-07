import React from "react";
export default function Loader(props) {
  return (
    <>
      {props.loading.isLoading ? (
        <span class="icon">
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      ) : (
        props.loading.text
      )}
    </>
  );
}
