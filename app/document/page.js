"use client";

import React from "react";
import Header from "../Components/Header";
import DocumentList from "../Components/DocumentList";
// import { useRouter } from "next/router";

const Document = () => {
  // const router = useRouter();

  return (
    <>
      <Header />
      <DocumentList />
    </>
  );
};

export default Document;
