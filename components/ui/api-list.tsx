"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface IApiList {
  name: string;
  idName: string;
}

const ApiList = ({ idName, name }: IApiList) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert variant="public" desc={`${baseUrl}/${name}`} title="GET" />
      <ApiAlert
        variant="public"
        desc={`${baseUrl}/${name}/{${idName}}`}
        title="GET"
      />
      <ApiAlert variant="admin" desc={`${baseUrl}/${name}`} title="POST" />
      <ApiAlert
        variant="admin"
        desc={`${baseUrl}/${name}/{${idName}}`}
        title="PATCH"
      />
      <ApiAlert
        variant="admin"
        desc={`${baseUrl}/${name}/{${idName}}`}
        title="DELETE"
      />
    </>
  );
};

export default ApiList;
