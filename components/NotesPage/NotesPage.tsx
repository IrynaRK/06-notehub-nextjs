"use client";

import { useEffect } from "react";
import { testAuth } from "@/lib/api";

const NotesPage = () => {
  useEffect(() => {
    testAuth();
  }, []);

  return <div>Сторінка нотаток</div>;
};

export default NotesPage;