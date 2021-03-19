import React from "react";

function DashboardCard({ title, SubTitle, faClass, background, ...props }) {
  return (
    <>
      <div
        className="m-3 rounded-lg text-light p-2 px-3"
        style={{ flex: "1", background: background }}
        onClick={props.onClick}
      >
        <div className="d-flex justify-content-between border-bottom">
          <div>
            <h2>{title}</h2>
            <p className="pb-2 mb-1">{SubTitle}</p>
          </div>
          <div>
            <i
              className={`${faClass} p-4`}
              style={{ fontSize: "44px", fontWeight: "600", color: "white" }}
            ></i>
          </div>
        </div>
        <span style={{ fontSize: "13px" }}>
          <i className={`far fa-clock mr-2`} style={{ color: "white" }} />
          Updated At :{" "}
          <b className="ml-2" style={{ textTransform: "uppercase" }}>
            {new Date().toLocaleString("en-IN", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </b>
        </span>
      </div>
    </>
  );
}

export default DashboardCard;
