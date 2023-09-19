import React from "react";

const Heading = ({ title, label }: { title: string; label: string }) => {
  return <div>
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>;
};

export default Heading;
