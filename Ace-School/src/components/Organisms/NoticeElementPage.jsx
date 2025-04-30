import React from "react";
import { useParams } from "react-router";

const NoticeViewPage = () => {
  const param = useParams();
  console.log(param.id);

  return <div>NoticeViewPage</div>;
};

export default NoticeViewPage;
